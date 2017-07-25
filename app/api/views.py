# app/api/api.py
from flask import jsonify
from . import api
from ..models import Station


@api.route('/stations', methods=['GET'])
def stations():
    results = []
    for row in Station.query.all():
        results.append(
            {
                'station_id': row.number,
                'name': row.name,
                'latitude': row.latitude,
                'longitude': row.longitude
            }
        )
    response = jsonify(results)
    response.status_code = 200
    return response

