from app import db, ma
from app.mixins import CRUDMixin


class ProductCategory(db.Model, CRUDMixin):
    __tablename__ = 'product_categories'
    __searchable__ = ['name']

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    website = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.Unicode)

    # Foreign keys

    # Relationships
    
     
class ProductCategorySchema(ma.SQLAlchemySchema):
    class Meta:
        model = ProductCategory
    
    id = ma.auto_field()
    name = ma.auto_field()
    website = ma.auto_field()
    image = ma.auto_field()
    description = ma.auto_field()
    
    nb_products = ma.Function(lambda obj: len(obj.products))
        
        
product_category_schema = ProductCategorySchema()
product_categories_schema = ProductCategorySchema(many=True)