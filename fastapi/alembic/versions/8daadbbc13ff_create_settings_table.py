"""create_settings_table

Revision ID: 8daadbbc13ff
Revises: a6b5e96957f0
Create Date: 2024-05-14 11:29:42.930243

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '8daadbbc13ff'
down_revision: Union[str, None] = 'a6b5e96957f0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # settings 테이블 생성
    op.create_table('settings',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('user', sa.Integer(), nullable=False, unique=True),
        sa.Column('voice', sa.String(length=255), nullable=False),
        sa.Column('clova_voice', sa.String(length=255), nullable=False),
        sa.Column('speech', sa.String(length=255), nullable=False),
    )

def downgrade() -> None:
    # settings 테이블 삭제 코드
    op.drop_table('settings')