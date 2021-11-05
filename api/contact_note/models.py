from api import db, ma
from api.mixins import CRUDMixin
from api.contact.models import Contact
from api.user.models import User

class ContactNote(db.Model, CRUDMixin):

    __tablename__ = 'contact_notes'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    text = db.Column(db.String)
    date = db.Column(db.String)
    status = db.Column(db.String)
    
    # Foreign keys
    contact_id = db.Column(db.Integer, db.ForeignKey(Contact.id))
    sales_id = db.Column(db.Integer, db.ForeignKey(User.id))
    
    # Relationships
    contact = db.relationship('Contact', backref=db.backref("notes", cascade="all, delete-orphan"))
    sales = db.relationship('User', backref="contact_notes")
    
    

class ContactNoteSchema(ma.SQLAlchemySchema):
    class Meta:
        model = ContactNote

    id = ma.auto_field()
    type = ma.auto_field()
    text = ma.auto_field()
    date = ma.auto_field()
    status = ma.auto_field()
    
    # Foreign keys
    contact_id = ma.auto_field()
    sales_id = ma.auto_field()
        

contact_note_schema = ContactNoteSchema()
contact_notes_schema = ContactNoteSchema(many=True)