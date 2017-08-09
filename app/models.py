from app import db


class Station(db.Model):
    __tablename__ = 'stations'

    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(100))
    latitude = db.Column(db.Numeric(10, 6))
    longitude = db.Column(db.Numeric(10, 6))
    capacity = db.Column(db.SmallInteger)

    def __repr__(self):
        return '<Station: {}>'.format(self.name)


class Trip(db.Model):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    start_station_id = db.Column(db.Integer, db.ForeignKey('stations.id'), nullable=False, index=True)
    end_station_id = db.Column(db.Integer, db.ForeignKey('stations.id'), nullable=False, index=True)
    start_date = db.Column(db.DateTime, index=True, nullable=False)
    end_date = db.Column(db.DateTime, index=True, nullable=False)
    bike_nr = db.Column(db.String(20))
    membership_type = db.Column(db.String(50))
    start_station = db.relationship('Station', foreign_keys=[start_station_id])
    end_station = db.relationship('Station', foreign_keys=[end_station_id])
