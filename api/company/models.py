from api import db, ma
from api.mixins import CRUDMixin
from api.user.models import User
from api.country.models import Country

class Company(db.Model, CRUDMixin):

    __tablename__ = 'companies'
    __searchable__ = ['name']

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    logo = db.Column(db.String)
    sector = db.Column(db.String)
    size = db.Column(db.Integer)
    linkedIn = db.Column(db.String)
    website = db.Column(db.String)
    phone_number = db.Column(db.String)
    address = db.Column(db.String)
    zipcode = db.Column(db.String)
    city = db.Column(db.String)
    state_abbr = db.Column(db.String)
    created_at = db.Column(db.String)
    
    # Foreign keys
    sales_id = db.Column(db.Integer, db.ForeignKey(User.id))
    country_id = db.Column(db.Integer, db.ForeignKey(Country.id))
    
    # Relationships
    sales = db.relationship('User', backref="companies")
    country = db.relationship('Country', backref="companies")
    
    

class CompanySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Company
        
    id = ma.auto_field()
    name = ma.auto_field()
    logo = ma.auto_field()
    sector = ma.auto_field()
    size = ma.auto_field()
    linkedIn = ma.auto_field()
    website = ma.auto_field()
    phone_number = ma.auto_field()
    address = ma.auto_field()
    zipcode = ma.auto_field()
    city = ma.auto_field()
    state_abbr = ma.auto_field()
    created_at = ma.auto_field()
    
    sales_id  = ma.auto_field()
    country_id  = ma.auto_field()
        
    nb_contacts = ma.Function(lambda obj: len(obj.contacts))
    nb_deals = ma.Function(lambda obj: len(obj.deals))
    nb_notes = ma.Function(lambda obj: len(obj.notes))

company_schema = CompanySchema()
companies_schema = CompanySchema(many=True)