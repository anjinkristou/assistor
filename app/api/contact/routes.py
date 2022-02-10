from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import Contact, contact_schema, contacts_schema, Tag
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "contacts"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class ContactList(ResourceList):
    model_cls = Contact
    model_schema = contact_schema
    models_schema = contacts_schema
    
    def post_filter(self, filter):
        filter = super(ContactList, self).post_filter(filter)
        
        self.tags = None
        if 'tags' in filter:
            self.tags = filter['tags']
            del filter['tags']
        
        return filter
    
    def post_query(self, query):
        query = super(ContactList, self).post_query(query)
        
        if self.tags:
            query = query.join(Contact.tags).filter(Tag.id.in_(self.tags))
        
        return query



class ContactItem(ResourceItem):
    model_cls = Contact
    model_schema = contact_schema
    models_schema = contacts_schema
    
    def post_data(self, data):
        data = super(ContactItem, self).post_data(data)
        
        if 'nb_notes' in data:
            del data['nb_notes']
            
        if 'has_newsletter' in data:
            data['has_newsletter'] = data['has_newsletter'] == '1'
        
        if 'tags' in data:
            tags = data['tags']
            data['tags'] = Tag.query.filter(Tag.id.in_(tags)).all()
            
        return data


        
class ContactItems(ResourceItems):
    model_cls = Contact
    model_schema = contact_schema
    models_schema = contacts_schema
    

class ContactRefs(ResourceRefs):
    model_cls = Contact
    model_schema = contact_schema
    models_schema = contacts_schema
    
api.add_resource(ContactList, '/list')
api.add_resource(ContactItem, '/item')
api.add_resource(ContactItems, '/items')
api.add_resource(ContactRefs, '/refs')