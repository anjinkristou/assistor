from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from .models import ProductFamily, product_family_schema, product_families_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(ProductFamilyList, f'{prefix}productFamilies/list', endpoint = 'productFamilies')
    api.add_resource(ProductFamilyItem, f'{prefix}productFamilies/item', endpoint = 'productFamily')
    api.add_resource(ProductFamilyItems, f'{prefix}productFamilies/items')
    api.add_resource(ProductFamilyRefs, f'{prefix}productFamilies/refs')