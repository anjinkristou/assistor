from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from .models import ContactNote, contact_note_schema, contact_notes_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(ContactNoteList, f'{prefix}contactNotes/list', endpoint = 'contactNotes')
    api.add_resource(ContactNoteItem, f'{prefix}contactNotes/item', endpoint = 'contactNote')
    api.add_resource(ContactNoteItems, f'{prefix}contactNotes/items')
    api.add_resource(ContactNoteRefs, f'{prefix}contactNotes/refs')