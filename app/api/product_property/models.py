from app import db, ma
from app.mixins import CRUDMixin
from app.api.product.models import Product

class PropertyCategory(db.Model, CRUDMixin):
    __tablename__ = 'property_categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    order = db.Column(db.Integer, default=0)

    # Foreign keys


    # Relationships



class PropertyType(db.Model, CRUDMixin):
    __tablename__ = 'property_types'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    unit = db.Column(db.String)
    is_featured = db.Column(db.Boolean, default=False)
    synonyms = db.Column(db.Unicode)

    # Foreign keys
    category_id = db.Column(db.Integer, db.ForeignKey(PropertyCategory.id))

    # Relationships
    category = db.relationship('PropertyCategory', backref='types')


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
    


class PropertyCategorySchema(ma.SQLAlchemySchema):
    class Meta:
        model = PropertyCategory
    
    id = ma.auto_field()
    name = ma.auto_field()
    order = ma.auto_field()
    
    nb_types = ma.Function(lambda obj: len(obj.types))
    
        
property_category_schema = PropertyCategorySchema()
property_categories_schema = PropertyCategorySchema(many=True)


class PropertyTypeSchema(ma.SQLAlchemySchema):
    class Meta:
        model = PropertyType
    
    id = ma.auto_field()
    name = ma.auto_field()
    unit = ma.auto_field()
    is_featured = ma.auto_field()
    synonyms = ma.auto_field()
    
    category_id = ma.auto_field()
    
    nb_properties = ma.Function(lambda obj: len(obj.properties))
    
        
property_type_schema = PropertyTypeSchema()
property_types_schema = PropertyTypeSchema(many=True)

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