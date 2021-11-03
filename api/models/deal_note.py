from api import db, ma
from .mixins import CRUDMixin
from .deal import Deal
from .user import User

class DealNote(db.Model, CRUDMixin):

    __tablename__ = 'deal_notes'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    text = db.Column(db.String)
    date = db.Column(db.String)
    
    # Foreign keys
    deal_id = db.Column(db.Integer, db.ForeignKey(Deal.id))
    sales_id = db.Column(db.Integer, db.ForeignKey(User.id))
    
    # Relationships
    deal = db.relationship('Deal', backref="notes")
    sales = db.relationship('User', backref="deal_notes")
    
    

class DealNoteSchema(ma.SQLAlchemySchema):
    class Meta:
        model = DealNote

    id = ma.auto_field()
    type = ma.auto_field()
    text = ma.auto_field()
    date = ma.auto_field()
    
    # Foreign keys
    deal_id = ma.auto_field()
    sales_id = ma.auto_field()
        

deal_note_schema = DealNoteSchema()
deal_notes_schema = DealNoteSchema(many=True)