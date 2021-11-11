from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from flask import Blueprint

blueprint = Blueprint('tags', __name__, url_prefix='/tags')
from .models import Tag, tag_schema, tags_schema
from api.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(TagList, f'{prefix}tags/list', endpoint = 'tags')
    api.add_resource(TagItem, f'{prefix}tags/item', endpoint = 'tag')
    api.add_resource(TagItems, f'{prefix}tags/items')
    api.add_resource(TagRefs, f'{prefix}tags/refs')