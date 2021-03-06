"""Company distributor

Revision ID: 2720a71d8bbc
Revises: 7eff9321c6f9
Create Date: 2021-11-10 12:23:36.235277

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2720a71d8bbc'
down_revision = '7eff9321c6f9'
branch_labels = None
depends_on = None

naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('companies', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.add_column(sa.Column('distributor_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_companies_distributor_id_companies'), 'companies', ['distributor_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('companies', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_companies_distributor_id_companies'), type_='foreignkey')
        batch_op.drop_column('distributor_id')

    # ### end Alembic commands ###
