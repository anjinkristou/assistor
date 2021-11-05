from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from flask import Blueprint

blueprint = Blueprint('companyNotes', __name__, url_prefix='/companyNotes')
from .models import CompanyNote, company_note_schema, company_notes_schema

@blueprint.route('/list', methods = ['GET'])
@jwt_required()
def company_note_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    order =  getattr(CompanyNote, sort['field']).asc() if sort['order'] == 'ASC' else getattr(CompanyNote, sort['field']).desc()
    
    records = CompanyNote.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=company_notes_schema.dump(records.items),
                   total=records.total)
    

@blueprint.get('/item')
@jwt_required()
def get_company_note():
    id = request.args['id']
        
    company_note = CompanyNote.query.get(id)
    
    result = company_note_schema.dump(company_note)
        
    return jsonify(data=result)


@blueprint.put('/item')
@jwt_required()
def update_company_note():
    params = request.json['params']
    data = params['data']
    id = params['id']
    
    company_note = CompanyNote.query.get(id)
    company_note.update(**data)
    
    result = company_note_schema.dump(company_note)
    
    return jsonify(data=result)


@blueprint.post('/item')
@jwt_required()
def add_company_note():
    params = request.json['params']
    data = params['data']
    
    company_note = CompanyNote.create(**data)
    
    result = company_note_schema.dump(company_note)
    
    return jsonify(data=result)


@blueprint.delete('/item')
@jwt_required()
def delete_company_note():
    id = request.args['id']
    
    company_note = CompanyNote.query.get(id)
    result = company_note_schema.dump(company_note)
    
    company_note.delete()
        
    return jsonify(data=result)


@blueprint.get('/items')
@jwt_required()
def get_company_notes():
    ids = request.args.getlist('ids[]')
    company_notes = CompanyNote.query.filter(CompanyNote.id.in_(ids))

    result = company_notes_schema.dump(company_notes)
    return jsonify(data=result)


@blueprint.delete('/items')
@jwt_required()
def delete_company_notes():
    ids = request.args.getlist('ids[]')
    company_notes = CompanyNote.query.filter(CompanyNote.id.in_(ids))

    result = company_notes_schema.dump(company_notes)
    
    [company_note.delete() for company_note in company_notes]
    
    return jsonify(data=result)

@blueprint.route('/refs', methods = ['GET'])
@jwt_required()
def company_note_refs():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    target = request.args['target']
    id = request.args['id']
    filter[target] = id
    
    order =  getattr(CompanyNote, sort['field']).asc() if sort['order'] == 'ASC' else getattr(CompanyNote, sort['field']).desc()
    
    records = CompanyNote.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=company_notes_schema.dump(records.items),
                   total=records.total)