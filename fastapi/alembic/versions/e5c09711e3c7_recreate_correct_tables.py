"""recreate_correct_tables

Revision ID: e5c09711e3c7
Revises: f1179d00f04b
Create Date: 2024-08-30 16:39:53.493078

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'e5c09711e3c7'
down_revision: Union[str, None] = 'f1179d00f04b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # `emotions` 테이블 생성
    op.create_table(
        'emotions',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('message_id', sa.Integer, sa.ForeignKey('messages.id'), nullable=False),
        sa.Column('type', sa.String(255), nullable=False),
        sa.Column('date', sa.Date, nullable=False),
    )

    # `conversations` 테이블에 `total_emotion` 컬럼 추가
    op.add_column('conversations', sa.Column('total_emotion', sa.String(255), nullable=True))


def downgrade() -> None:
    # `conversations` 테이블에서 `total_emotion` 컬럼 제거
    op.drop_column('conversations', 'total_emotion')

    # `emotions` 테이블 삭제
    op.drop_table('emotions')
