from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import ProductNote, product_note_schema, product_notes_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "productNotes"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class ProductNoteList(ResourceList):
    model_cls = ProductNote
    model_schema = product_note_schema
    models_schema = product_notes_schema


class ProductNoteItem(ResourceItem):
    model_cls = ProductNote
    model_schema = product_note_schema
    models_schema = product_notes_schema


class ProductNoteItems(ResourceItems):
    model_cls = ProductNote
    model_schema = product_note_schema
    models_schema = product_notes_schema
    

class ProductNoteRefs(ResourceRefs):
    model_cls = ProductNote
    model_schema = product_note_schema
    models_schema = product_notes_schema
    
api.add_resource(ProductNoteList, '/list')
api.add_resource(ProductNoteItem, '/item')
api.add_resource(ProductNoteItems, '/items')
api.add_resource(ProductNoteRefs, '/refs')