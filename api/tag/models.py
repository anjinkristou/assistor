from api import db, ma
from api.mixins import CRUDMixin

class Tag(db.Model, CRUDMixin):

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    color = db.Column(db.String)
    
    # Foreign keys
    
    
    # Relationships
    


class TagSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Tag
    
    id = ma.auto_field()
    name = ma.auto_field()
    color = ma.auto_field()
    
    nb_contacts = ma.Function(lambda obj: len(obj.contacts))
    nb_companies = ma.Function(lambda obj: len(obj.companies))
        
        
tag_schema = TagSchema()
tags_schema = TagSchema(many=True)