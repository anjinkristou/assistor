"""Initial migration

Revision ID: 2c6c39987357
Revises: 
Create Date: 2021-11-05 12:11:09.536290

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2c6c39987357'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('color', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('companies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('logo', sa.String(), nullable=True),
    sa.Column('sector', sa.String(), nullable=True),
    sa.Column('size', sa.Integer(), nullable=True),
    sa.Column('linkedIn', sa.String(), nullable=True),
    sa.Column('website', sa.String(), nullable=True),
    sa.Column('phone_number', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('zipcode', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('state_abbr', sa.String(), nullable=True),
    sa.Column('created_at', sa.String(), nullable=True),
    sa.Column('sales_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['sales_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('contacts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('gender', sa.String(), nullable=True),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('phone_number1', sa.String(), nullable=True),
    sa.Column('phone_number2', sa.String(), nullable=True),
    sa.Column('background', sa.String(), nullable=True),
    sa.Column('acquisition', sa.String(), nullable=True),
    sa.Column('avatar', sa.String(), nullable=True),
    sa.Column('first_seen', sa.String(), nullable=True),
    sa.Column('last_seen', sa.String(), nullable=True),
    sa.Column('has_newsletter', sa.Boolean(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.Column('sales_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.ForeignKeyConstraint(['sales_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('deals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('stage', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.String(), nullable=True),
    sa.Column('updated_at', sa.String(), nullable=True),
    sa.Column('start_at', sa.String(), nullable=True),
    sa.Column('index', sa.Integer(), nullable=True),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.Column('sales_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.ForeignKeyConstraint(['sales_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('contact_notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('text', sa.String(), nullable=True),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('contact_id', sa.Integer(), nullable=True),
    sa.Column('sales_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['contact_id'], ['contacts.id'], ),
    sa.ForeignKeyConstraint(['sales_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('contact_tags',
    sa.Column('contact_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['contact_id'], ['contacts.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ),
    sa.PrimaryKeyConstraint('contact_id', 'tag_id')
    )
    op.create_table('deal_contacts',
    sa.Column('deal_id', sa.Integer(), nullable=False),
    sa.Column('contact_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['contact_id'], ['contacts.id'], ),
    sa.ForeignKeyConstraint(['deal_id'], ['deals.id'], ),
    sa.PrimaryKeyConstraint('deal_id', 'contact_id')
    )
    op.create_table('deal_notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('text', sa.String(), nullable=True),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('deal_id', sa.Integer(), nullable=True),
    sa.Column('sales_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['deal_id'], ['deals.id'], ),
    sa.ForeignKeyConstraint(['sales_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('text', sa.String(), nullable=True),
    sa.Column('due_date', sa.String(), nullable=True),
    sa.Column('contact_id', sa.Integer(), nullable=True),
    sa.Column('sales_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['contact_id'], ['contacts.id'], ),
    sa.ForeignKeyConstraint(['sales_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    op.drop_table('deal_notes')
    op.drop_table('deal_contacts')
    op.drop_table('contact_tags')
    op.drop_table('contact_notes')
    op.drop_table('deals')
    op.drop_table('contacts')
    op.drop_table('companies')
    op.drop_table('users')
    op.drop_table('tags')
    # ### end Alembic commands ###
