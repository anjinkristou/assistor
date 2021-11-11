from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from flask import Blueprint

blueprint = Blueprint('dealNotes', __name__, url_prefix='/dealNotes')
from .models import DealNote, deal_note_schema, deal_notes_schema
from api.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(DealNoteList, f'{prefix}dealNotes/list', endpoint = 'dealNotes')
    api.add_resource(DealNoteItem, f'{prefix}dealNotes/item', endpoint = 'dealNote')
    api.add_resource(DealNoteItems, f'{prefix}dealNotes/items')
    api.add_resource(DealNoteRefs, f'{prefix}dealNotes/refs')