"""Company Notes

Revision ID: 153f720f966f
Revises: 2c6c39987357
Create Date: 2021-11-05 13:23:15.281248

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '153f720f966f'
down_revision = '2c6c39987357'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('company_notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('text', sa.String(), nullable=True),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.Column('sales_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.ForeignKeyConstraint(['sales_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('company_notes')
    # ### end Alembic commands ###
