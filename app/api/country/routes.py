from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from .models import Country, country_schema, countries_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

class CountryList(ResourceList):
    model_cls = Country
    model_schema = country_schema
    models_schema = countries_schema


class CountryItem(ResourceItem):
    model_cls = Country
    model_schema = country_schema
    models_schema = countries_schema


class CountryItems(ResourceItems):
    model_cls = Country
    model_schema = country_schema
    models_schema = countries_schema
    

class CountryRefs(ResourceRefs):
    model_cls = Country
    model_schema = country_schema
    models_schema = countries_schema
    

def register_api(api, prefix="/"):
    api.add_resource(CountryList, f'{prefix}countries/list', endpoint = 'countries')
    api.add_resource(CountryItem, f'{prefix}countries/item', endpoint = 'country')
    api.add_resource(CountryItems, f'{prefix}countries/items')
    api.add_resource(CountryRefs, f'{prefix}countries/refs')