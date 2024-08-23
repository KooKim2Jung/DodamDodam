from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '7f98a209bf86'
down_revision = '7293e5f1834d'
branch_labels = None
depends_on = None


def upgrade():
    # HomeInfo 테이블 생성
    op.create_table(
        'home_info',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('pinecone_vector_id', sa.String(length=255), nullable=False),  # 길이 255 설정
        sa.Column('info', sa.String(length=512), nullable=False),  # info 필드도 적절한 길이 설정
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.func.now(), onupdate=sa.func.now()),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    # HomeInfo 테이블 삭제
    op.drop_table('home_info')
