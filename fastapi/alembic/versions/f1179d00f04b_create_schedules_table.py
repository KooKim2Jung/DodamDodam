"""create_schedules_table

Revision ID: f1179d00f04b
Revises: 7f98a209bf86
Create Date: 2024-08-25 22:01:27.138817

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'f1179d00f04b'
down_revision: Union[str, None] = '7f98a209bf86'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 테이블 생성
    op.create_table(
        'schedules',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user', sa.Integer, nullable=False),
        sa.Column('date', sa.DateTime, nullable=False),
        sa.Column('repeat', sa.JSON, nullable=True),
        sa.Column('content', sa.String(length=255), nullable=False)
    )


def downgrade() -> None:
    # 테이블 삭제
    op.drop_table('schedules')