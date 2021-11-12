from app import db, ma
from app.mixins import CRUDMixin
from app.api.company.models import Company
from app.api.user.models import User
from app.api.tag.models import Tag

contact_tags_table = db.Table('contact_tags',
    db.Column('contact_id', db.ForeignKey('contacts.id'), primary_key=True),
    db.Column('tag_id', db.ForeignKey('tags.id'), primary_key=True)
)

class Contact(db.Model, CRUDMixin):

    __tablename__ = 'contacts'
    __searchable__ = ['first_name', 'last_name']

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
    tags = db.relationship('Tag', secondary=contact_tags_table, backref='contacts')
    

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
        
    tags = ma.Function(lambda obj: [tag.id for tag in obj.tags])
    nb_notes = ma.Function(lambda obj: len(obj.notes))


contact_schema = ContactSchema()
contacts_schema = ContactSchema(many=True)