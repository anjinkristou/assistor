from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import ProductCategory, product_category_schema, product_categories_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "productCategories"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class ProductCategoryList(ResourceList):
    model_cls = ProductCategory
    model_schema = product_category_schema
    models_schema = product_categories_schema


class ProductCategoryItem(ResourceItem):
    model_cls = ProductCategory
    model_schema = product_category_schema
    models_schema = product_categories_schema


class ProductCategoryItems(ResourceItems):
    model_cls = ProductCategory
    model_schema = product_category_schema
    models_schema = product_categories_schema
    

class ProductCategoryRefs(ResourceRefs):
    model_cls = ProductCategory
    model_schema = product_category_schema
    models_schema = product_categories_schema
    
api.add_resource(ProductCategoryList, '/list')
api.add_resource(ProductCategoryItem, '/item')
api.add_resource(ProductCategoryItems, '/items')
api.add_resource(ProductCategoryRefs, '/refs')
    

def register_api(api, prefix="/"):
    api.add_resource(ProductCategoryList, f'{prefix}productCategories/list', endpoint = 'productCategories')
    api.add_resource(ProductCategoryItem, f'{prefix}productCategories/item', endpoint = 'productCategory')
    api.add_resource(ProductCategoryItems, f'{prefix}productCategories/items')
    api.add_resource(ProductCategoryRefs, f'{prefix}productCategories/refs')