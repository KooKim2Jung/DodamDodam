"""edit_age_from_profiles”

Revision ID: 5a8d1a90f77a
Revises: 22a288c3f78a
Create Date: 2024-05-12 20:07:34.216336

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '5a8d1a90f77a'
down_revision: Union[str, None] = '22a288c3f78a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 컬럼 타입 변경
    op.alter_column('profiles', 'age',
                    existing_type=sa.Integer(),
                    type_=sa.String(length=255),
                    existing_nullable=False)


def downgrade() -> None:
    # 컬럼 타입 변경
    op.alter_column('profiles', 'age',
                    existing_type=sa.String(length=255),
                    type_=sa.Integer(),
                    existing_nullable=False)