from app import db, ma
from app.mixins import CRUDMixin
from app.api.company.models import Company
from app.api.product_family.models import ProductFamily

class Product(db.Model, CRUDMixin):
    __tablename__ = 'products'
    __searchable__ = ['model']

    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String)
    code = db.Column(db.String)
    website = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.Unicode)

    # Foreign keys
    company_id = db.Column(db.Integer, db.ForeignKey(Company.id))
    family_id = db.Column(db.Integer, db.ForeignKey(ProductFamily.id))

    # Relationships
    company = db.relationship('Company', backref='products')
    family = db.relationship('ProductFamily', backref='products')



class ProductSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Product
    
    id = ma.auto_field()
    model = ma.auto_field()
    code = ma.auto_field()
    website = ma.auto_field()
    image = ma.auto_field()
    description = ma.auto_field()
    
    company_id = ma.auto_field()
    family_id = ma.auto_field()
    
    nb_properties = ma.Function(lambda obj: len(obj.properties))
    nb_notes = ma.Function(lambda obj: len(obj.notes))
        
        
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)