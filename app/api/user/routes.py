from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
import json

from .models import User, user_schema, users_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "sales"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)


class UserList(ResourceList):
    model_cls = User
    model_schema = user_schema
    models_schema = users_schema


class UserItem(ResourceItem):
    model_cls = User
    model_schema = user_schema
    models_schema = users_schema


class UserItems(ResourceItems):
    model_cls = User
    model_schema = user_schema
    models_schema = users_schema
    

class UserRefs(ResourceRefs):
    model_cls = User
    model_schema = user_schema
    models_schema = users_schema
    
api.add_resource(UserList, '/list')
api.add_resource(UserItem, '/item')
api.add_resource(UserItems, '/items')
api.add_resource(UserRefs, '/refs')

def register_api(api, prefix="/"):
    api.add_resource(UserList, f'{prefix}sales/list', endpoint = 'users')
    api.add_resource(UserItem, f'{prefix}sales/item', endpoint = 'user')
    api.add_resource(UserItems, f'{prefix}sales/items')
    api.add_resource(UserRefs, f'{prefix}sales/refs')