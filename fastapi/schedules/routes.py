from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .schemas import ScheduleCreate, ScheduleRead
from mysql_connection import get_db
from jwt_utils import get_current_user
from .services import create_schedule, get_schedules, update_schedule, delete_schedule
from .scheduler import get_schedules as get_scheduler

router = APIRouter(prefix="/api/v1/schedule", tags=["Schedule"])

# 스케줄 생성
@router.post("", response_model=ScheduleRead)
async def create_schedule_route(schedule_data: ScheduleCreate, current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return create_schedule(db=db, schedule_data=schedule_data, user_id=current_user_id)


# 모든 스케줄 조회
@router.get("", response_model=List[ScheduleRead])
async def read_schedules_route(current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_schedules(db=db, user_id=current_user_id)


# 스케줄 수정
@router.put("/{schedule_id}", response_model=ScheduleRead)
async def update_schedule_route(schedule_id: int, schedule_data: ScheduleCreate, current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return update_schedule(db=db, schedule_id=schedule_id, schedule_data=schedule_data, user_id=current_user_id)


# 스케줄 삭제
@router.delete("/{schedule_id}")
async def delete_schedule_route(schedule_id: int, current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return delete_schedule(db=db, schedule_id=schedule_id, user_id=current_user_id)

@router.get("/jobs")
async def get_registered_jobs():
    get_scheduler()