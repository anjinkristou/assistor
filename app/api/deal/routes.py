from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from .models import Deal, deal_schema, deals_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(DealList, f'{prefix}deals/list', endpoint = 'deals')
    api.add_resource(DealItem, f'{prefix}deals/item', endpoint = 'deal')
    api.add_resource(DealItems, f'{prefix}deals/items')
    api.add_resource(DealRefs, f'{prefix}deals/refs')