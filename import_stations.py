# import_stations.py

import os

import requests

from flask_sqlalchemy import SQLAlchemy
from app import create_app
from app.models import Station

app = create_app(config_name=os.getenv('FLASK_CONFIG'))
db = SQLAlchemy(app)

response = requests.get('https://gbfs.capitalbikeshare.com/gbfs/en/station_information.json').json()
items = response['data']['stations']

for item in items:
    station = db.session.query(Station).filter_by(number=item['station_id']).first()
    if not station:
        station = Station(number=int(item['station_id']),
                          name=item['name'],
                          latitude=float(item['lat']),
                          longitude=float(item['lon']),
                          capacity=int(item['capacity']))
        db.session.add(station)
    else:
        station.name = item['name']
        station.latitude = float(item['lat'])
        station.longitude = float(item['lon'])
        station.capacity = int(item['capacity'])
    db.session.commit()
