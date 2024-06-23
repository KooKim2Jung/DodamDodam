from sqlalchemy.orm import Session
from fastapi import HTTPException, UploadFile
from . import models
from .schemas import ProfileRead, Setting
from s3_connection import upload_file_to_s3
import tempfile
import uuid

class ProfileService:
    async def photo_upload(photo: UploadFile):
        # UploadFile 객체를 tempfile.SpooledTemporaryFile로 변환
        with tempfile.SpooledTemporaryFile() as temp_file:
            content = await photo.read()  # photo의 파일 내용을 읽어와서 content 변수에 저장
            temp_file.write(content)  # 읽어온 파일 내용을 temp_file 임시 파일에 저장
            temp_file.seek(0)  # 파일 포인터를 처음으로 이동

            # 이미지 확장자 추출
            filename_parts = photo.filename.split('.')
            if len(filename_parts) > 1:
                extension = filename_parts[-1]
            else:
                extension = ''  # 확장자가 없는 경우 빈 문자열 처리

            unique_filename = f"{uuid.uuid4()}.{extension}"
            upload_result = upload_file_to_s3(temp_file, unique_filename)

            if upload_result.get("message") == "File uploaded successfully":
                photo_data = upload_result.get('url')
            else:
                error_message = upload_result.get("message", "An unexpected error occurred during file upload.")
                raise HTTPException(status_code=500, detail=error_message)

        return photo_data

    def read_profile(user: int, db: Session) -> ProfileRead:
        # 데이터베이스에서 프로필 정보를 가져옵니다.
        profile = db.query(models.Profile).filter(models.Profile.user == user).first()
        if profile is None:
            return "피보호자 정보를 찾을 수 없습니다."
        return ProfileRead.from_orm(profile)

    def create_profile(user: int, name: str, gender: str, age: str, photo: str, remark: str, db: Session) -> str:
        new_profile = models.Profile(
            user=user,
            name=name,
            gender=gender,
            age=age,
            photo=photo,
            remark=remark
        )
        db.add(new_profile)
        db.commit()

        return "피보호자 정보가 생성되었습니다."

    def update_profile(user: int, name: str, gender: str, age: str, photo: str, remark: str, db: Session) -> str:
        profile = db.query(models.Profile).filter(models.Profile.user == user).first()
        if not profile:
            return "피보호자 정보를 찾을 수 없습니다."

            # 입력 값이 있는 경우에만 업데이트
        if name is not None:
            profile.name = name
        if gender is not None:
            profile.gender = gender
        if age is not None:
            profile.age = age
        if photo is not None:
            profile.photo = photo
        if remark is not None:
            profile.remark = remark

        db.commit()
        db.refresh(profile)

        return "피보호자 정보가 수정되었습니다."

class SettingService:

    def read_setting(user: int, db: Session) -> Setting:
        # 데이터베이스에서 setting 정보를 가져옵니다.
        setting = db.query(models.Setting).filter(models.Setting.user == user).first()
        return Setting.from_orm(setting)

    def update_setting(user: int, setting: Setting, db: Session) -> str:
        # 데이터베이스에서 setting 정보를 가져옵니다.
        db_setting = db.query(models.Setting).filter(models.Setting.user == user).first()

        # setting이 없다면 새로 생성
        if db_setting is None:
            db_setting = models.Setting(user=user)
            db.add(db_setting)

        # 입력된 voice 값에 따라 clova_voice 설정
        voice_to_clova_voice = {
            "다정": "nhajun", #하준
            "씩씩": "ndain", #다인
            "활발": "nmeow", #야옹
            "명랑": "ngaram", #가람
        }

        clova_voice = voice_to_clova_voice.get(setting.voice)
        if not clova_voice:
            raise HTTPException(status_code=400, detail="Unsupported voice type")

        # setting 정보를 업데이트합니다.
        db_setting.voice = setting.voice
        db_setting.clova_voice = clova_voice

        db.commit()
        db.refresh(db_setting)

        return "도담이 정보 수정을 완료했습니다."