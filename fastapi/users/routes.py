import uuid
import tempfile
from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile
from sqlalchemy.orm import Session
from typing import Optional
from .services import ProfileService, SettingService
from .schemas import ProfileRead, Setting, ProfileCheckResponse
from mysql_connection import get_db
from jwt_utils import get_current_user
from s3_connection import upload_file_to_s3

router = APIRouter(prefix="/api/v1")

# 피보호자 프로필 설정

@router.get("/profile", response_model=ProfileRead)
async def get_profile(current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        return ProfileService.read_profile(user=current_user_id, db=db)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/profile", response_model=str)
async def create_profile(
        name: str = Form(...),
        gender: str = Form(...),
        age: str = Form(...),
        photo: Optional[UploadFile] = File(None),
        remark: str = Form(...),
        db: Session = Depends(get_db),
        current_user_id: int = Depends(get_current_user)
):
    if photo:
        # 사진이 제공된 경우
        photo_data = await ProfileService.photo_upload(photo)
    else:
        # 사진이 제공되지 않은 경우 기본 이미지 사용
        photo_data = "https://dodambuket.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.png"

    try:
        return ProfileService.create_profile(user=current_user_id, name=name, gender=gender, age=age, photo=photo_data, remark=remark, db=db)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/profile", response_model=str)
async def update_profile(
        name: Optional[str] = Form(None),
        gender: Optional[str] = Form(None),
        age: Optional[str] = Form(None),
        photo: Optional[UploadFile] = File(None),
        remark: Optional[str] = Form(None),
        db: Session = Depends(get_db),
        current_user_id: int = Depends(get_current_user)
):
    if photo:
        # 사진이 제공된 경우
        photo = await ProfileService.photo_upload(photo)

    try:
        return ProfileService.update_profile(user=current_user_id, name=name, gender=gender, age=age, photo=photo, remark=remark, db=db)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/profile/check", response_model=ProfileCheckResponse)
async def check_profile(current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = ProfileService.check_profile(user=current_user_id, db=db)
        return {"check": result}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 도담이 설정

@router.get("/setting", response_model=Setting)
def read_dodam_setting(current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        return SettingService.read_setting(current_user_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/setting", response_model=str)
async def create_dodam_setting(current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        return SettingService.create_setting(current_user_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/setting", response_model=str)
async def update_dodam_setting(setting: Setting, current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        return SettingService.update_setting(current_user_id, setting, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))