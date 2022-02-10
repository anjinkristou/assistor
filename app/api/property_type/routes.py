from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import PropertyType, property_type_schema, property_types_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "propertyTypes"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class PropertyTypeList(ResourceList):
    model_cls = PropertyType
    model_schema = property_type_schema
    models_schema = property_types_schema


class PropertyTypeItem(ResourceItem):
    model_cls = PropertyType
    model_schema = property_type_schema
    models_schema = property_types_schema


class PropertyTypeItems(ResourceItems):
    model_cls = PropertyType
    model_schema = property_type_schema
    models_schema = property_types_schema
    

class PropertyTypeRefs(ResourceRefs):
    model_cls = PropertyType
    model_schema = property_type_schema
    models_schema = property_types_schema
    
api.add_resource(PropertyTypeList, '/list')
api.add_resource(PropertyTypeItem, '/item')
api.add_resource(PropertyTypeItems, '/items')
api.add_resource(PropertyTypeRefs, '/refs')
    

def register_api(api, prefix="/"):
    api.add_resource(PropertyTypeList, f'{prefix}propertyTypes/list', endpoint = 'propertyTypes')
    api.add_resource(PropertyTypeItem, f'{prefix}propertyTypes/item', endpoint = 'propertyType')
    api.add_resource(PropertyTypeItems, f'{prefix}propertyTypes/items')
    api.add_resource(PropertyTypeRefs, f'{prefix}propertyTypes/refs')