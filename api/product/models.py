from api import db, ma
from api.mixins import CRUDMixin
from api.company.models import Company


class FamilyCategory(db.Model, CRUDMixin):
    __tablename__ = 'family_category'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    website = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.Unicode)

    # Foreign keys
    
    
    # Relationships

    

class ProductFamily(db.Model, CRUDMixin):
    __tablename__ = 'product_family'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    website = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.Unicode)

    # Foreign keys
    category_id = db.Column(db.Integer, db.ForeignKey(FamilyCategory.id))

    # Relationships
    category = db.relationship('FamilyCategory', backref='families')



class Product(db.Model, CRUDMixin):
    __tablename__ = 'product'
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
        
        
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)