from api import db, ma
from api.mixins import CRUDMixin
from api.company.models import Company
from api.user.models import User

class CompanyNote(db.Model, CRUDMixin):

    __tablename__ = 'company_notes'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    text = db.Column(db.String)
    date = db.Column(db.String)
    
    # Foreign keys
    company_id = db.Column(db.Integer, db.ForeignKey(Company.id))
    sales_id = db.Column(db.Integer, db.ForeignKey(User.id))
    
    # Relationships
    company = db.relationship('Company', backref=db.backref("notes", cascade="all, delete-orphan"))
    sales = db.relationship('User', backref="company_notes")
    
    

class CompanyNoteSchema(ma.SQLAlchemySchema):
    class Meta:
        model = CompanyNote

    id = ma.auto_field()
    type = ma.auto_field()
    text = ma.auto_field()
    date = ma.auto_field()
    
    # Foreign keys
    company_id = ma.auto_field()
    sales_id = ma.auto_field()
        

company_note_schema = CompanyNoteSchema()
company_notes_schema = CompanyNoteSchema(many=True)