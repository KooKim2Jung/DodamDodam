from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models
from .schemas import ProfileRead #, ProfileUpdate
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