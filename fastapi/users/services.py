from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models
from .schemas import ProfileRead, ProfileUpdate


class ProfileService:

    def read_profile(profile_id: int, db: Session) -> ProfileRead:
        # 데이터베이스에서 프로필 정보를 가져옵니다.
        profile = db.query(models.Profile).filter(models.Profile.id == profile_id).first()
        if profile is None:
            raise HTTPException(status_code=404, detail="Profile not found")
        return ProfileRead.from_orm(profile)

    def update_profile(profile_id: int, profile_data: ProfileUpdate, db: Session) -> ProfileRead:
        # 데이터베이스에서 프로필 정보를 가져옵니다.
        profile = db.query(models.Profile).filter(models.Profile.id == profile_id).first()
        if profile is None:
            raise HTTPException(status_code=404, detail="Profile not found")

        # 프로필 정보를 업데이트합니다.
        profile.name = profile_data.name
        profile.gender = profile_data.gender
        # 파일 처리가 필요한 경우 파일 저장 로직을 추가해야 합니다.
        profile.photo = profile_data.photo.filename if profile_data.photo else profile.photo
        profile.remark = profile_data.remark
        db.commit()
        db.refresh(profile)

        return ProfileRead.from_orm(profile)