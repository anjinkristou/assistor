from app import db, ma
from app.mixins import CRUDMixin


class ProductFamily(db.Model, CRUDMixin):
    __tablename__ = 'product_families'
    __searchable__ = ['name']

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    website = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.Unicode)
    category = db.Column(db.String)

    # Foreign keys

    # Relationships
    
     
class ProductFamilySchema(ma.SQLAlchemySchema):
    class Meta:
        model = ProductFamily
    
    id = ma.auto_field()
    name = ma.auto_field()
    website = ma.auto_field()
    image = ma.auto_field()
    description = ma.auto_field()
    category = ma.auto_field()
    
    nb_products = ma.Function(lambda obj: len(obj.products))
        
        
product_family_schema = ProductFamilySchema()
product_families_schema = ProductFamilySchema(many=True)