"""empty message

Revision ID: 70ce6497bdbb
Revises: dd569cc6573d
Create Date: 2017-07-28 20:54:51.236862

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '70ce6497bdbb'
down_revision = 'dd569cc6573d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('trips',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('start_station_id', sa.Integer(), nullable=False),
    sa.Column('end_station_id', sa.Integer(), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=False),
    sa.Column('bike_nr', sa.String(length=20), nullable=True),
    sa.Column('membership_type', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['end_station_id'], ['stations.id'], ),
    sa.ForeignKeyConstraint(['start_station_id'], ['stations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_trips_end_date'), 'trips', ['end_date'], unique=False)
    op.create_index(op.f('ix_trips_end_station_id'), 'trips', ['end_station_id'], unique=False)
    op.create_index(op.f('ix_trips_start_date'), 'trips', ['start_date'], unique=False)
    op.create_index(op.f('ix_trips_start_station_id'), 'trips', ['start_station_id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('import',
    sa.Column('id', mysql.INTEGER(display_width=10, unsigned=True), nullable=False),
    sa.Column('duration', mysql.VARCHAR(length=50), nullable=True),
    sa.Column('start_date', mysql.DATETIME(), nullable=True),
    sa.Column('end_date', mysql.DATETIME(), nullable=True),
    sa.Column('start_station', mysql.VARCHAR(length=200), nullable=True),
    sa.Column('end_station', mysql.VARCHAR(length=200), nullable=True),
    sa.Column('bike_nr', mysql.VARCHAR(length=50), nullable=True),
    sa.Column('member_type', mysql.VARCHAR(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.drop_index(op.f('ix_trips_start_station_id'), table_name='trips')
    op.drop_index(op.f('ix_trips_start_date'), table_name='trips')
    op.drop_index(op.f('ix_trips_end_station_id'), table_name='trips')
    op.drop_index(op.f('ix_trips_end_date'), table_name='trips')
    op.drop_table('trips')
    # ### end Alembic commands ###
