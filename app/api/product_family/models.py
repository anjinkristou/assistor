from app import db, ma
from app.mixins import CRUDMixin
from app.api.family_category.models import FamilyCategory


class ProductFamily(db.Model, CRUDMixin):
    __tablename__ = 'product_family'
    __searchable__ = ['name']

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    website = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.Unicode)

    # Foreign keys
    category_id = db.Column(db.Integer, db.ForeignKey(FamilyCategory.id))

    # Relationships
    category = db.relationship('FamilyCategory', backref='families')
    
    
    
class ProductFamilySchema(ma.SQLAlchemySchema):
    class Meta:
        model = ProductFamily
    
    id = ma.auto_field()
    name = ma.auto_field()
    website = ma.auto_field()
    image = ma.auto_field()
    description = ma.auto_field()
    
    category_id = ma.auto_field()
    
    nb_products = ma.Function(lambda obj: len(obj.products))
        
        
product_family_schema = ProductFamilySchema()
product_families_schema = ProductFamilySchema(many=True)