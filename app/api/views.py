# app/api/api.py
from flask import jsonify
from sqlalchemy import func

from app import db
from . import api
from ..models import Station, Trip


@api.route('/stations', methods=['GET'])
def get_stations():
    results = []
    for row in Station.query.all():
        results.append(
            {
                'station_id': int(row.number),
                'name': row.name,
                'latitude': float(row.latitude),
                'longitude': float(row.longitude)
            }
        )
    response = jsonify(results)
    response.status_code = 200
    return response


@api.route('/trips/<year>/<month>', methods=['GET'])
def get_trips(year, month):
    rows = db.session.query(Trip, Station) \
        .join(Trip.start_station) \
        .filter(func.year(Trip.start_date) == year) \
        .filter(func.month(Trip.start_date) == month) \
        .all()

    results = []
    for row in rows:
        results.append(
            {
                'time': row.Trip.start_date.isoformat(),
                'id': row.Trip.id,
                'longitude': float(row.Station.longitude),
                'latitude': float(row.Station.latitude)
            }
        )
    response = jsonify(results)
    response.status_code = 200
    return response
