from api import db, ma
from .mixins import CRUDMixin
from .company import Company
from .user import User

class Contact(db.Model, CRUDMixin):

    __tablename__ = 'contacts'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    gender = db.Column(db.String)
    title = db.Column(db.String)
    email = db.Column(db.String)
    phone_number1 = db.Column(db.String)
    phone_number2 = db.Column(db.String)
    background = db.Column(db.String)
    acquisition = db.Column(db.String)
    avatar = db.Column(db.String)
    first_seen = db.Column(db.String)
    last_seen = db.Column(db.String)
    has_newsletter = db.Column(db.Boolean)
    status = db.Column(db.String)
    
    # Foreign keys
    company_id = db.Column(db.Integer, db.ForeignKey(Company.id))    
    sales_id = db.Column(db.Integer, db.ForeignKey(User.id))
    
    # Relationships
    company = db.relationship('Company', backref="contacts")
    sales = db.relationship('User', backref="contacts")
    

class ContactSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Contact
        
    id = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    gender = ma.auto_field()
    title = ma.auto_field()
    email = ma.auto_field()
    phone_number1 = ma.auto_field()
    phone_number2 = ma.auto_field()
    background = ma.auto_field()
    acquisition = ma.auto_field()
    avatar = ma.auto_field()
    first_seen = ma.auto_field()
    last_seen = ma.auto_field()
    has_newsletter = ma.auto_field()
    status = ma.auto_field()
    
    company_id = ma.auto_field()
    sales_id = ma.auto_field()
        
    tags = ma.Method("gen_tags")
    nb_notes = ma.Method("gen_nb_notes")
    
    def gen_tags(self, obj):
        return [] #[tag.id for tag in obj.tags]
    
    def gen_nb_notes(self, obj):
        return len(obj.notes)


contact_schema = ContactSchema()
contacts_schema = ContactSchema(many=True)