from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import Country, country_schema, countries_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "countries"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

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
    
api.add_resource(CountryList, '/list')
api.add_resource(CountryItem, '/item')
api.add_resource(CountryItems, '/items')
api.add_resource(CountryRefs, '/refs')
    

def register_api(api, prefix="/"):
    api.add_resource(CountryList, f'{prefix}countries/list', endpoint = 'countries')
    api.add_resource(CountryItem, f'{prefix}countries/item', endpoint = 'country')
    api.add_resource(CountryItems, f'{prefix}countries/items')
    api.add_resource(CountryRefs, f'{prefix}countries/refs')