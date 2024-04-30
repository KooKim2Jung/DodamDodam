from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from mysql_connection import engine

Base = declarative_base()

class Example(Base):
    __tablename__ = "examples"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)


Base.metadata.create_all(engine)
