from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models
from .schemas import ProfileRead, Setting

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
                #기본 프로필사진 이미지
                photo="https://dodambuket.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.png",
                remark="추가 정보 및 특이 사항을 입력해 주세요"
            )
        return ProfileRead.from_orm(profile)


    def update_profile(user: int, name: str, gender: str, age: str, photo: str, remark: str, db: Session) -> str:
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
            # 데이터베이스에 Setting 정보가 없으면 기본값을 반환합니다.
            return Setting(
                voice="다정"
            )
        return Setting.from_orm(setting)

    def create_setting(user: int, db: Session) -> str:
        # 기본 값 설정
        default_voice = "다정"
        default_clova_voice = "nhajun"

        new_setting = models.Setting(user=user, voice=default_voice, clova_voice=default_clova_voice)
        db.add(new_setting)
        db.commit()

        return "도담이 정보가 생성되었습니다."

    def update_setting(user: int, setting: Setting, db: Session) -> str:
        db_setting = db.query(models.Setting).filter(models.Setting.user == user).first()

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

        db_setting.voice = setting.voice
        db_setting.clova_voice = clova_voice

        db.commit()
        db.refresh(db_setting)

        return "도담이 정보가 수정되었습니다."