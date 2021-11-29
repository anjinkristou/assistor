"""Remove family category

Revision ID: c5f67bff770e
Revises: 2ff5aafa0f7f
Create Date: 2021-11-29 16:33:29.864106

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c5f67bff770e'
down_revision = '2ff5aafa0f7f'
branch_labels = None
depends_on = None



def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product_families', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category', sa.String(), nullable=True))
        batch_op.drop_constraint('product_families_category_id_fkey', type_='foreignkey')
        batch_op.drop_column('category_id')
    
    op.drop_table('family_categories')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('family_categories',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('website', sa.VARCHAR(), nullable=True),
    sa.Column('image', sa.VARCHAR(), nullable=True),
    sa.Column('description', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    
    with op.batch_alter_table('product_families', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('product_families_category_id_fkey', 'family_categories', ['category_id'], ['id'])
        batch_op.drop_column('category')
    # ### end Alembic commands ###
