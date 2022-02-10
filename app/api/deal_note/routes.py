from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import DealNote, deal_note_schema, deal_notes_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "dealNotes"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class DealNoteList(ResourceList):
    model_cls = DealNote
    model_schema = deal_note_schema
    models_schema = deal_notes_schema


class DealNoteItem(ResourceItem):
    model_cls = DealNote
    model_schema = deal_note_schema
    models_schema = deal_notes_schema


class DealNoteItems(ResourceItems):
    model_cls = DealNote
    model_schema = deal_note_schema
    models_schema = deal_notes_schema
    

class DealNoteRefs(ResourceRefs):
    model_cls = DealNote
    model_schema = deal_note_schema
    models_schema = deal_notes_schema
    
api.add_resource(DealNoteList, '/list')
api.add_resource(DealNoteItem, '/item')
api.add_resource(DealNoteItems, '/items')
api.add_resource(DealNoteRefs, '/refs')

def register_api(api, prefix="/"):
    api.add_resource(DealNoteList, f'{prefix}dealNotes/list', endpoint = 'dealNotes')
    api.add_resource(DealNoteItem, f'{prefix}dealNotes/item', endpoint = 'dealNote')
    api.add_resource(DealNoteItems, f'{prefix}dealNotes/items')
    api.add_resource(DealNoteRefs, f'{prefix}dealNotes/refs')