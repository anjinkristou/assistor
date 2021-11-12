from app import db, ma
from app.mixins import CRUDMixin
from app.api.company.models import Company


class FamilyCategory(db.Model, CRUDMixin):
    __tablename__ = 'family_categories'
    __searchable__ = ['name']

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    website = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.Unicode)

    # Foreign keys
    
    
    # Relationships


class FamilyCategorySchema(ma.SQLAlchemySchema):
    class Meta:
        model = FamilyCategory
    
    id = ma.auto_field()
    name = ma.auto_field()
    website = ma.auto_field()
    image = ma.auto_field()
    description = ma.auto_field()
    
    nb_families = ma.Function(lambda obj: len(obj.families))
        
        
family_category_schema = FamilyCategorySchema()
family_categories_schema = FamilyCategorySchema(many=True)