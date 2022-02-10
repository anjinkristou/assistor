from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import ContactNote, contact_note_schema, contact_notes_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "contactNotes"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class ContactNoteList(ResourceList):
    model_cls = ContactNote
    model_schema = contact_note_schema
    models_schema = contact_notes_schema


class ContactNoteItem(ResourceItem):
    model_cls = ContactNote
    model_schema = contact_note_schema
    models_schema = contact_notes_schema


class ContactNoteItems(ResourceItems):
    model_cls = ContactNote
    model_schema = contact_note_schema
    models_schema = contact_notes_schema
    

class ContactNoteRefs(ResourceRefs):
    model_cls = ContactNote
    model_schema = contact_note_schema
    models_schema = contact_notes_schema
    
api.add_resource(ContactNoteList, '/list')
api.add_resource(ContactNoteItem, '/item')
api.add_resource(ContactNoteItems, '/items')
api.add_resource(ContactNoteRefs, '/refs')