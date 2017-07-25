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
