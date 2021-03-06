"""Company use Product

Revision ID: 714079911f2e
Revises: 73444ac2fe72
Create Date: 2021-11-22 16:51:05.517478

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '714079911f2e'
down_revision = '73444ac2fe72'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('company_products',
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('company_id', 'product_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('company_products')
    # ### end Alembic commands ###
