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
        

tag_schema = TagSchema()
tags_schema = TagSchema(many=True)