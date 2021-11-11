from flask import request, jsonify
from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
import json

from .models import CompanyNote, company_note_schema, company_notes_schema
from api.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

class CompanyNoteList(ResourceList):
    model_cls = CompanyNote
    model_schema = company_note_schema
    models_schema = company_notes_schema


class CompanyNoteItem(ResourceItem):
    model_cls = CompanyNote
    model_schema = company_note_schema
    models_schema = company_notes_schema


class CompanyNoteItems(ResourceItems):
    model_cls = CompanyNote
    model_schema = company_note_schema
    models_schema = company_notes_schema
    

class CompanyNoteRefs(ResourceRefs):
    model_cls = CompanyNote
    model_schema = company_note_schema
    models_schema = company_notes_schema
    

def register_api(api, prefix="/"):
    api.add_resource(CompanyNoteList, f'{prefix}companyNotes/list', endpoint = 'companyNotes')
    api.add_resource(CompanyNoteItem, f'{prefix}companyNotes/item', endpoint = 'companyNote')
    api.add_resource(CompanyNoteItems, f'{prefix}companyNotes/items')
    api.add_resource(CompanyNoteRefs, f'{prefix}companyNotes/refs')