from api import db, ma
from api.mixins import CRUDMixin
from api.product.models import Product
from api.user.models import User

class ProductNote(db.Model, CRUDMixin):

    __tablename__ = 'product_notes'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    text = db.Column(db.String)
    date = db.Column(db.String)
    status = db.Column(db.String)
    
    # Foreign keys
    product_id = db.Column(db.Integer, db.ForeignKey(Product.id))
    sales_id = db.Column(db.Integer, db.ForeignKey(User.id))
    
    # Relationships
    product = db.relationship('Product', backref=db.backref("notes", cascade="all, delete-orphan"))
    sales = db.relationship('User', backref="product_notes")
    
    

class ProductNoteSchema(ma.SQLAlchemySchema):
    class Meta:
        model = ProductNote

    id = ma.auto_field()
    type = ma.auto_field()
    text = ma.auto_field()
    date = ma.auto_field()
    status = ma.auto_field()
    
    # Foreign keys
    product_id = ma.auto_field()
    sales_id = ma.auto_field()
        

product_note_schema = ProductNoteSchema()
product_notes_schema = ProductNoteSchema(many=True)