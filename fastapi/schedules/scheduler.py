from apscheduler.schedulers.asyncio import AsyncIOScheduler
from sqlalchemy.orm import Session
from .models import Schedule
from datetime import datetime, timezone
from conversations.tts_connection import text_to_speech
from fastapi import HTTPException
from s3_connection import upload_file_to_s3
import logging
import sys
import pytz
import uuid


logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logger = logging.getLogger("uvicorn")

# 한국 시간대 설정
KST = pytz.timezone('Asia/Seoul')

scheduler = AsyncIOScheduler(timezone=KST)

# 스케줄 작업 실행 함수
async def job_function(schedule_id: int, content: str, date: datetime, user_id: int, db: Session):
    current_time = datetime.now(KST)  # 한국 시간으로 현재 시간 출력
    logger.info(f"스케줄 ID: {schedule_id}, 내용: {content}, 저장된 스케줄 시간: {date}, 현재 시간: {current_time}")

    try:
        speech_stream = text_to_speech(gpt_message=content, user=user_id, db=db)
        logger.info(f"Generated speech stream: {speech_stream}")  # 추가된 로그
        if not speech_stream:
            raise HTTPException(status_code=500, detail="Failed to generate speech")

        unique_filename = f"{uuid.uuid4()}.mp3"
        upload_result = upload_file_to_s3(speech_stream, unique_filename)
        logger.info(f"Upload result: {upload_result}")  # 추가된 로그
        return upload_result
    except Exception as e:
        logger.error(f"Error in job_function: {str(e)}")  # 추가된 로그
        raise HTTPException(status_code=500, detail=str(e))


# 스케줄 추가/수정 시 APScheduler에 작업 추가 또는 갱신
def add_or_update_job(schedule: Schedule, db: Session):
    job_id = f"schedule_{schedule.id}"

    # 현재 시간과 스케줄 시간을 비교하여 실행 시간이 지났다면 무시
    current_time = datetime.now(KST)

    # schedule.date가 offset-naive datetime이면, KST로 변환
    if schedule.date.tzinfo is None:
        schedule_time = KST.localize(schedule.date)
    else:
        schedule_time = schedule.date.astimezone(KST)

    if schedule_time < current_time:
        logger.info(f"스케줄 ID: {schedule.id} - 이미 실행 시간이 지났습니다. 작업을 추가하지 않습니다.")
        return

    # 기존 작업이 있으면 수정 (remove 후 다시 추가)
    if scheduler.get_job(job_id):
        scheduler.remove_job(job_id)

    scheduler.add_job(
        job_function,
        trigger='date',
        run_date=schedule_time,  # 스케줄 시간을 한국 시간대로 변환
        args=[schedule.id, schedule.content, schedule.date, schedule.user, db],
        id=job_id,
        replace_existing=True
    )
    logger.info(f"스케줄 {schedule.id} 등록 또는 수정: {schedule.date}")


# 스케줄 삭제 시 APScheduler에서 작업 제거
def remove_job(schedule_id: int):
    job_id = f"schedule_{schedule_id}"
    if scheduler.get_job(job_id):
        scheduler.remove_job(job_id)
        logger.info(f"스케줄 {schedule_id} 삭제")


# 모든 스케줄을 APScheduler에 등록하는 함수
def schedule_jobs(db: Session):
    logger.info("스케줄 등록을 시작합니다.")
    # 데이터베이스에서 모든 스케줄을 가져옴
    schedules = db.query(Schedule).all()
    logger.info(f"가져온 스케줄 수: {len(schedules)}")
    for schedule in schedules:
        add_or_update_job(schedule, db)  # 각 스케줄을 APScheduler에 등록
    logger.info("모든 스케줄이 APScheduler에 등록되었습니다.")


# APScheduler 스케줄러 시작
def start_scheduler():
    logger.info("APScheduler 시작 중...")
    scheduler.start()
    logger.info("APScheduler가 성공적으로 시작되었습니다.")


# 스케줄러 종료 처리
def shutdown_scheduler():
    scheduler.shutdown()


# 스케줄러 등록 확인 테스트
def get_schedules():
    # 등록된 모든 작업을 출력
    jobs = scheduler.get_jobs()
    if jobs:
        logger.info(f"총 {len(jobs)}개의 스케줄이 APScheduler에 등록되었습니다:")
        for job in jobs:
            logger.info(f"작업 ID: {job.id}, 다음 실행 시간: {job.next_run_time}")
    else:
        logger.info("등록된 스케줄이 없습니다.")

