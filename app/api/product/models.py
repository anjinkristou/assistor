from app import db, ma
from app.mixins import CRUDMixin
from app.api.company.models import Company
from app.api.product_family.models import ProductFamily
from app.api.product_category.models import ProductCategory


company_products_table = db.Table('company_products',
    db.Column('company_id', db.ForeignKey('companies.id'), primary_key=True),
    db.Column('product_id', db.ForeignKey('products.id'), primary_key=True)
)


class Product(db.Model, CRUDMixin):
    __tablename__ = 'products'
    __searchable__ = ['model', 'code', 'description', 'company.name', 'family.name', 'family.category']

    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String)
    code = db.Column(db.String)
    website = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.Unicode)

    # Foreign keys
    company_id = db.Column(db.Integer, db.ForeignKey(Company.id))
    family_id = db.Column(db.Integer, db.ForeignKey(ProductFamily.id))
    category_id = db.Column(db.Integer, db.ForeignKey(ProductCategory.id))

    # Relationships
    company = db.relationship('Company', backref='products')
    family = db.relationship('ProductFamily', backref='products')
    catgeory = db.relationship('ProductCategory', backref='products')
    used_by_companies = db.relationship('Company', secondary=company_products_table, backref='use_products')



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
    
    # properties = ma.List(ma.Nested(ProductPropertySchema))
    # properties = ma.Function(lambda obj: [property.id for property in obj.properties])
    properties = ma.Method('get_properties')
    nb_properties = ma.Function(lambda obj: len(obj.properties))
    nb_notes = ma.Function(lambda obj: len(obj.notes))
    nb_used_by = ma.Function(lambda obj: len(obj.used_by_companies))
    used_by_companies = ma.Function(lambda obj: [product.id for product in obj.used_by_companies])
    
    
    def get_properties(self, obj):
        from app.api.product_property.models import product_properties_schema
        return product_properties_schema.dump(obj.properties)
        
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

