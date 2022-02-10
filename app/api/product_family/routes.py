from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import ProductFamily, product_family_schema, product_families_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "productFamilies"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class ProductFamilyList(ResourceList):
    model_cls = ProductFamily
    model_schema = product_family_schema
    models_schema = product_families_schema


class ProductFamilyItem(ResourceItem):
    model_cls = ProductFamily
    model_schema = product_family_schema
    models_schema = product_families_schema


class ProductFamilyItems(ResourceItems):
    model_cls = ProductFamily
    model_schema = product_family_schema
    models_schema = product_families_schema
    

class ProductFamilyRefs(ResourceRefs):
    model_cls = ProductFamily
    model_schema = product_family_schema
    models_schema = product_families_schema
    
api.add_resource(ProductFamilyList, '/list')
api.add_resource(ProductFamilyItem, '/item')
api.add_resource(ProductFamilyItems, '/items')
api.add_resource(ProductFamilyRefs, '/refs')
    

def register_api(api, prefix="/"):
    api.add_resource(ProductFamilyList, f'{prefix}productFamilies/list', endpoint = 'productFamilies')
    api.add_resource(ProductFamilyItem, f'{prefix}productFamilies/item', endpoint = 'productFamily')
    api.add_resource(ProductFamilyItems, f'{prefix}productFamilies/items')
    api.add_resource(ProductFamilyRefs, f'{prefix}productFamilies/refs')