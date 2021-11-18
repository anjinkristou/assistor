from app import db, ma
from app.mixins import CRUDMixin
from app.api.product.models import Product
from app.api.property_type.models import PropertyType


class ProductProperty(db.Model, CRUDMixin):
    __tablename__ = 'product_properties'

    id = db.Column(db.Integer, primary_key=True)
    property_value = db.Column(db.Unicode)
    condition = db.Column(db.Unicode)

    # Foreign keys
    product_id = db.Column(db.Integer, db.ForeignKey(Product.id))
    type_id = db.Column(db.Integer, db.ForeignKey(PropertyType.id))

    # Relationships
    product = db.relationship('Product', backref=db.backref("properties", cascade="all, delete-orphan"))
    type = db.relationship('PropertyType', backref='properties')
    
    

class ProductPropertySchema(ma.SQLAlchemySchema):
    class Meta:
        model = ProductProperty
    
    id = ma.auto_field()
    property_value = ma.auto_field()
    condition = ma.auto_field()
    
    product_id = ma.auto_field()
    type_id = ma.auto_field()
    
        
product_property_schema = ProductPropertySchema()
product_properties_schema = ProductPropertySchema(many=True)