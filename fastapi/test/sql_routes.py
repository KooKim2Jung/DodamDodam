from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import sql_models
from mysql_connection import get_db

router = APIRouter()

@router.post("/create_example/")
async def create_example(example_name: str, db: Session = Depends(get_db)):
    db_example = sql_models.Example(name=example_name)
    db.add(db_example)
    db.commit()
    db.refresh(db_example)
    return {"message": "Example created successfully"}
