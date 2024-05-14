from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models
from .schemas import ProfileRead, Setting
from s3_connection import upload_file
from fastapi import UploadFile
import asyncio

class ProfileService:

    def read_profile(user: int, db: Session) -> ProfileRead:
        # 데이터베이스에서 프로필 정보를 가져옵니다.
        profile = db.query(models.Profile).filter(models.Profile.user == user).first()
        if profile is None:
            # 데이터베이스에 프로필 정보가 없으면 기본 메시지를 반환합니다.
            return ProfileRead(
                name="이름을 입력해 주세요",
                gender="성별을 입력해 주세요",
                age="나이를 입력해 주세요",
                photo="사진을 넣어 주세요",
                remark="추가 정보 및 특이 사항을 입력해 주세요"
            )
        return ProfileRead.from_orm(profile)


    async def update_profile(user: int, name: str, gender: str, age: str, photo: str, remark: str, db: Session) -> str:
        # 데이터베이스에서 프로필 정보를 가져옵니다.
        profile = db.query(models.Profile).filter(models.Profile.user == user).first()

        # 프로필이 없다면 새로 생성
        if profile is None:
            profile = models.Profile(user=user)
            db.add(profile)

        # 이름, 성별, 나이가 제공되지 않았거나 기본 안내 메시지가 입력된 경우 예외 처리
        if not name or name == "이름을 입력해 주세요":
            raise HTTPException(status_code=400, detail="이름을 입력해 주세요")
        if not gender or gender == "성별을 입력해 주세요":
            raise HTTPException(status_code=400, detail="성별을 입력해 주세요")
        if not age or age == "나이를 입력해 주세요":
            raise HTTPException(status_code=400, detail="나이를 입력해 주세요")

        # 프로필 정보를 업데이트합니다.
        profile.name = name
        profile.gender = gender
        profile.age = age
        profile.photo = photo
        profile.remark = remark

        db.commit()
        db.refresh(profile)

        return "정보 수정을 완료했습니다."

class SettingService:

    def read_setting(user: int, db: Session) -> Setting:
        # 데이터베이스에서 setting 정보를 가져옵니다.
        setting = db.query(models.Setting).filter(models.Setting.user == user).first()
        if setting is None:
            # 데이터베이스에 Setting 정보가 없으면 기본 메시지를 반환합니다.
            return Setting(
                voice="혜리",
                speech="반말"
            )
        return Setting.from_orm(setting)


    async def update_setting(user: int, setting: Setting, db: Session) -> str:
        # 데이터베이스에서 setting 정보를 가져옵니다.
        db_setting = db.query(models.Setting).filter(models.Setting.user == user).first()

        # setting이 없다면 새로 생성
        if db_setting is None:
            db_setting = models.Setting(user=user)
            db.add(db_setting)

        # 입력된 voice 값에 따라 clova_voice 설정
        voice_to_clova_voice = {
            "혜리": "vhyeri",
            "아라": "vara",
            "다인": "ndain",
            "소현": "nes_c_sohyun",
            "이안": "vian"
        }

        clova_voice = voice_to_clova_voice.get(setting.voice)
        if not clova_voice:
            raise HTTPException(status_code=400, detail="Unsupported voice type")

        # setting 정보를 업데이트합니다.
        db_setting.voice = setting.voice
        db_setting.speech = setting.speech
        db_setting.clova_voice = clova_voice

        db.commit()
        db.refresh(db_setting)

        return "도담이 정보 수정을 완료했습니다."