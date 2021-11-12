from app import db, ma
from app.mixins import CRUDMixin

class Country(db.Model, CRUDMixin):

    __tablename__ = 'countries'
    __searchable__ = ['name', 'nicename']

    id = db.Column(db.Integer, primary_key=True)
    iso = db.Column(db.String(2))
    name = db.Column(db.String(80))
    nicename = db.Column(db.String(80))
    iso3 = db.Column(db.String(3))
    numcode = db.Column(db.Integer)
    phonecode = db.Column(db.Integer)
    
    # Foreign keys
    
    # Relationships
    

class Countrieschema(ma.SQLAlchemySchema):
    class Meta:
        model = Country
    
    id = ma.auto_field()
    iso = ma.auto_field()
    name = ma.auto_field()
    nicename = ma.auto_field()
    iso3 = ma.auto_field()
    numcode = ma.auto_field()
    phonecode = ma.auto_field()
    
    url = ma.Function(lambda obj: f"https://flagcdn.com/48x36/{obj.iso.lower()}.png")
    nb_companies = ma.Function(lambda obj: len(obj.companies))

country_schema = Countrieschema()
countries_schema = Countrieschema(many=True)