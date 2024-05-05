from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .services import ProfileService
from .schemas import ProfileUpdate, ProfileRead
from mysql_connection import get_db
from jwt_utils import get_current_user

router = APIRouter(prefix="/api/v1")

@router.get("/profile", response_model=ProfileRead)
async def get_profile(current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        return ProfileService.read_profile(user=current_user_id, db=db)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/profile", response_model=str)
async def update_profile(
    profile_data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user)
):
    try:
        return await ProfileService.update_profile(user=current_user_id, profile_data=profile_data, db=db)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
