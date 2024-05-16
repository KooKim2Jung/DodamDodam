"""edit_photo_from_profiles”

Revision ID: a6b5e96957f0
Revises: 5a8d1a90f77a
Create Date: 2024-05-12 22:40:00.888761

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'a6b5e96957f0'
down_revision: Union[str, None] = '5a8d1a90f77a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 컬럼 타입 변경
    op.alter_column('profiles', 'photo',
                    existing_type=sa.VARCHAR(length=255),
                    type_=sa.VARCHAR(length=500),
                    existing_nullable=True)


def downgrade() -> None:
    # 컬럼 타입 변경을 되돌림
    op.alter_column('profiles', 'photo',
                    existing_type=sa.VARCHAR(length=500),
                    type_=sa.VARCHAR(length=255),
                    existing_nullable=True)