from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import Tag, tag_schema, tags_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "tags"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class TagList(ResourceList):
    model_cls = Tag
    model_schema = tag_schema
    models_schema = tags_schema


class TagItem(ResourceItem):
    model_cls = Tag
    model_schema = tag_schema
    models_schema = tags_schema


class TagItems(ResourceItems):
    model_cls = Tag
    model_schema = tag_schema
    models_schema = tags_schema
    

class TagRefs(ResourceRefs):
    model_cls = Tag
    model_schema = tag_schema
    models_schema = tags_schema
    
api.add_resource(TagList, '/list')
api.add_resource(TagItem, '/item')
api.add_resource(TagItems, '/items')
api.add_resource(TagRefs, '/refs')
    

def register_api(api, prefix="/"):
    api.add_resource(TagList, f'{prefix}tags/list', endpoint = 'tags')
    api.add_resource(TagItem, f'{prefix}tags/item', endpoint = 'tag')
    api.add_resource(TagItems, f'{prefix}tags/items')
    api.add_resource(TagRefs, f'{prefix}tags/refs')