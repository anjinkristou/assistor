from app import db, ma
from app.mixins import CRUDMixin


class PropertyType(db.Model, CRUDMixin):
    __tablename__ = 'property_types'
    __searchable__ = ['name']

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    unit = db.Column(db.String)
    is_featured = db.Column(db.Boolean, default=False)
    synonyms = db.Column(db.Unicode)
    category = db.Column(db.String)

    # Foreign keys

    # Relationships
    


class PropertyTypeSchema(ma.SQLAlchemySchema):
    class Meta:
        model = PropertyType
    
    id = ma.auto_field()
    name = ma.auto_field()
    unit = ma.auto_field()
    is_featured = ma.auto_field()
    synonyms = ma.auto_field()
    category = ma.auto_field()
    
    nb_properties = ma.Function(lambda obj: len(obj.properties))
    
        
property_type_schema = PropertyTypeSchema()
property_types_schema = PropertyTypeSchema(many=True)