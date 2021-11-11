from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from .models import ProductNote, product_note_schema, product_notes_schema
from api.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(ProductNoteList, f'{prefix}productNotes/list', endpoint = 'productNotes')
    api.add_resource(ProductNoteItem, f'{prefix}productNotes/item', endpoint = 'productNote')
    api.add_resource(ProductNoteItems, f'{prefix}productNotes/items')
    api.add_resource(ProductNoteRefs, f'{prefix}productNotes/refs')