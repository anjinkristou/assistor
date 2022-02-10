from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import Deal, deal_schema, deals_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "deals"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class DealList(ResourceList):
    model_cls = Deal
    model_schema = deal_schema
    models_schema = deals_schema


class DealItem(ResourceItem):
    model_cls = Deal
    model_schema = deal_schema
    models_schema = deals_schema


class DealItems(ResourceItems):
    model_cls = Deal
    model_schema = deal_schema
    models_schema = deals_schema
    

class DealRefs(ResourceRefs):
    model_cls = Deal
    model_schema = deal_schema
    models_schema = deals_schema
    
api.add_resource(DealList, '/list')
api.add_resource(DealItem, '/item')
api.add_resource(DealItems, '/items')
api.add_resource(DealRefs, '/refs')