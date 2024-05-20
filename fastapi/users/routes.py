import uuid

from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile
from sqlalchemy.orm import Session
from typing import Optional
from .services import ProfileService, SettingService
from .schemas import ProfileRead, Setting
from mysql_connection import get_db
from jwt_utils import get_current_user
from s3_connection import upload_file_to_s3

router = APIRouter(prefix="/api/v1")

@router.get("/profile", response_model=ProfileRead)
async def get_profile(current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        return ProfileService.read_profile(user=current_user_id, db=db)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/update_profile", response_model=str)
def update_profile(
        name: str = Form(...),
        gender: str = Form(...),
        age: str = Form(...),
        #photo: Optional[UploadFile] = File(None),
        photo: UploadFile = File(...),
        photo_url: Optional[str] = Form(None),  # 문자열 형태로 URL을 받는 필드 추가
        remark: str = Form(...),
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user)
):
    print("000")
    photo_data = None
    if photo:
        # 파일이 제공된 경우
        print("111")
        #이미지 확장자 추출
        filename_parts = photo.filename.split('.')
        if len(filename_parts) > 1:
            extension = filename_parts[-1]
        else:
            extension = ''  # 확장자가 없는 경우 빈 문자열 처리
        unique_filename = f"{uuid.uuid4()}.{extension}"
        print("unique_filename: "+unique_filename)
        upload_result = upload_file_to_s3(photo, unique_filename)
        print("333")
        if upload_result.get("message") == "File uploaded successfully":
            photo_data = upload_result.get('url')
        else:
            error_message = upload_result.get("message", "An unexpected error occurred during file upload.")
            raise HTTPException(status_code=500, detail=error_message)
    elif photo_url:
        # URL이 제공된 경우, 기존 URL을 사용
        photo_data = photo_url

    try:
        return ProfileService.update_profile(user=current_user_id, name=name, gender=gender, age=age, photo=photo_data, remark=remark, db=db)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/setting", response_model=Setting)
def read_dodam_setting(current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        return SettingService.read_setting(current_user_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/setting", response_model=str)
async def update_dodam_setting(setting: Setting, current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        return await SettingService.update_setting(current_user_id, setting, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))