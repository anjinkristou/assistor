from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import ProductProperty, product_property_schema, product_properties_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "productProperties"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class ProductPropertyList(ResourceList):
    model_cls = ProductProperty
    model_schema = product_property_schema
    models_schema = product_properties_schema


class ProductPropertyItem(ResourceItem):
    model_cls = ProductProperty
    model_schema = product_property_schema
    models_schema = product_properties_schema


class ProductPropertyItems(ResourceItems):
    model_cls = ProductProperty
    model_schema = product_property_schema
    models_schema = product_properties_schema
    

class ProductPropertyRefs(ResourceRefs):
    model_cls = ProductProperty
    model_schema = product_property_schema
    models_schema = product_properties_schema
    
api.add_resource(ProductPropertyList, '/list')
api.add_resource(ProductPropertyItem, '/item')
api.add_resource(ProductPropertyItems, '/items')
api.add_resource(ProductPropertyRefs, '/refs')
    

def register_api(api, prefix="/"):
    api.add_resource(ProductPropertyList, f'{prefix}productProperties/list', endpoint = 'productProperties')
    api.add_resource(ProductPropertyItem, f'{prefix}productProperties/item', endpoint = 'productProperty')
    api.add_resource(ProductPropertyItems, f'{prefix}productProperties/items')
    api.add_resource(ProductPropertyRefs, f'{prefix}productProperties/refs')