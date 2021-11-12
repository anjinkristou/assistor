from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from .models import FamilyCategory, family_category_schema, family_categories_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

class FamilyCategoryList(ResourceList):
    model_cls = FamilyCategory
    model_schema = family_category_schema
    models_schema = family_categories_schema


class FamilyCategoryItem(ResourceItem):
    model_cls = FamilyCategory
    model_schema = family_category_schema
    models_schema = family_categories_schema


class FamilyCategoryItems(ResourceItems):
    model_cls = FamilyCategory
    model_schema = family_category_schema
    models_schema = family_categories_schema
    

class FamilyCategoryRefs(ResourceRefs):
    model_cls = FamilyCategory
    model_schema = family_category_schema
    models_schema = family_categories_schema
    

def register_api(api, prefix="/"):
    api.add_resource(FamilyCategoryList, f'{prefix}familyCategories/list', endpoint = 'familyCategories')
    api.add_resource(FamilyCategoryItem, f'{prefix}familyCategories/item', endpoint = 'familyCategory')
    api.add_resource(FamilyCategoryItems, f'{prefix}familyCategories/items')
    api.add_resource(FamilyCategoryRefs, f'{prefix}familyCategories/refs')