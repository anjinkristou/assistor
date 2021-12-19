from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from .models import ProductCategory, product_category_schema, product_categories_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(ProductCategoryList, f'{prefix}productCategories/list', endpoint = 'productCategories')
    api.add_resource(ProductCategoryItem, f'{prefix}productCategories/item', endpoint = 'productCategory')
    api.add_resource(ProductCategoryItems, f'{prefix}productCategories/items')
    api.add_resource(ProductCategoryRefs, f'{prefix}productCategories/refs')