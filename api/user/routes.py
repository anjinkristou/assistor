from flask import request, jsonify
import json

from .models import User, user_schema, users_schema
from api.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(UserList, f'{prefix}sales/list', endpoint = 'users')
    api.add_resource(UserItem, f'{prefix}sales/item', endpoint = 'user')
    api.add_resource(UserItems, f'{prefix}sales/items')
    api.add_resource(UserRefs, f'{prefix}sales/refs')