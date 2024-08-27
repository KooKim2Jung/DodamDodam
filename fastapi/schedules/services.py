from sqlalchemy.orm import Session
from fastapi import HTTPException
from .models import Schedule
from .schemas import ScheduleCreate, ScheduleRead


# 스케줄 생성
def create_schedule(db: Session, schedule_data: ScheduleCreate, user_id: int):
    new_schedule = Schedule(
        user=user_id,
        date=schedule_data.date,
        repeat=schedule_data.repeat,
        content=schedule_data.content
    )
    db.add(new_schedule)
    db.commit()
    db.refresh(new_schedule)
    return new_schedule


# 모든 스케줄 조회
def get_schedules(db: Session, user_id: int):
    schedules = db.query(Schedule).filter(Schedule.user == user_id).all()
    if not schedules:
        raise HTTPException(status_code=404, detail="스케줄을 찾을 수 없습니다.")
    return schedules


# 스케줄 수정
def update_schedule(db: Session, schedule_id: int, schedule_data: ScheduleCreate, user_id: int):
    schedule = db.query(Schedule).filter(Schedule.id == schedule_id, Schedule.user == user_id).first()

    if not schedule:
        raise HTTPException(status_code=404, detail="스케줄을 찾을 수 없습니다.")

    schedule.date = schedule_data.date
    schedule.repeat = schedule_data.repeat
    schedule.content = schedule_data.content

    db.commit()
    db.refresh(schedule)
    return schedule


# 스케줄 삭제
def delete_schedule(db: Session, schedule_id: int, user_id: int):
    schedule = db.query(Schedule).filter(Schedule.id == schedule_id, Schedule.user == user_id).first()

    if not schedule:
        raise HTTPException(status_code=404, detail="스케줄을 찾을 수 없습니다.")

    db.delete(schedule)
    db.commit()
    return {"detail": "스케줄이 삭제되었습니다."}
