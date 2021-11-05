from api import db, ma
from api.mixins import CRUDMixin
from api.contact.models import Contact
from api.company.models import Company
from api.user.models import User

deal_contacts_table = db.Table('deal_contacts',
    db.Column('deal_id', db.ForeignKey('deals.id'), primary_key=True),
    db.Column('contact_id', db.ForeignKey('contacts.id'), primary_key=True)
)

class Deal(db.Model, CRUDMixin):

    __tablename__ = 'deals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    stage = db.Column(db.String)
    description = db.Column(db.String)
    amount = db.Column(db.Integer)
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)
    start_at = db.Column(db.String)
    index = db.Column(db.Integer)
    
    
    # Foreign keys
    company_id = db.Column(db.Integer, db.ForeignKey(Company.id))
    sales_id = db.Column(db.Integer, db.ForeignKey(User.id))
    
    # Relationships
    company = db.relationship('Company', backref="deals")
    sales = db.relationship('User', backref="deals")
    contacts = db.relationship('Contact', secondary=deal_contacts_table, backref='deals')
    

class DealSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Deal

    id = ma.auto_field()
    name = ma.auto_field()
    type = ma.auto_field()
    stage = ma.auto_field()
    description = ma.auto_field()
    amount = ma.auto_field()
    created_at = ma.auto_field()
    updated_at = ma.auto_field()
    start_at = ma.auto_field()
    index = ma.auto_field()
    
    # Foreign keys
    company_id = ma.auto_field()
    sales_id = ma.auto_field()
    
    contact_ids = ma.Function(lambda obj: [contact.id for contact in obj.contacts])
    nb_notes = ma.Function(lambda obj: len(obj.notes))
        

deal_schema = DealSchema()
deals_schema = DealSchema(many=True)