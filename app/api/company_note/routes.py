from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
import json

from .models import CompanyNote, company_note_schema, company_notes_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "companyNotes"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

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

api.add_resource(CompanyNoteList, '/list')
api.add_resource(CompanyNoteItem, '/item')
api.add_resource(CompanyNoteItems, '/items')
api.add_resource(CompanyNoteRefs, '/refs')

def register_api(api, prefix="/"):
    api.add_resource(CompanyNoteList, f'{prefix}companyNotes/list', endpoint = 'companyNotes')
    api.add_resource(CompanyNoteItem, f'{prefix}companyNotes/item', endpoint = 'companyNote')
    api.add_resource(CompanyNoteItems, f'{prefix}companyNotes/items')
    api.add_resource(CompanyNoteRefs, f'{prefix}companyNotes/refs')