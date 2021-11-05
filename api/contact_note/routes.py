from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from flask import Blueprint

blueprint = Blueprint('contactNotes', __name__, url_prefix='/contactNotes')
from .models import ContactNote, contact_note_schema, contact_notes_schema

@blueprint.route('/list', methods = ['GET'])
@jwt_required()
def contact_note_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    order =  getattr(ContactNote, sort['field']).asc() if sort['order'] == 'ASC' else getattr(ContactNote, sort['field']).desc()
    
    records = ContactNote.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=contact_notes_schema.dump(records.items),
                   total=records.total)
    

@blueprint.get('/item')
@jwt_required()
def get_contact_note():
    id = request.args['id']
        
    contact_note = ContactNote.query.get(id)
    
    result = contact_note_schema.dump(contact_note)
        
    return jsonify(data=result)


@blueprint.put('/item')
@jwt_required()
def update_contact_note():
    data = request.json['data']
    id = request.json['id']
    
    contact_note = ContactNote.query.get(id)
    contact_note.update(**data)
    
    result = contact_note_schema.dump(contact_note)
    
    return jsonify(data=result)


@blueprint.post('/item')
@jwt_required()
def add_contact_note():
    data = request.json['data']
    
    contact_note = ContactNote.create(**data)
    
    result = contact_note_schema.dump(contact_note)
    
    return jsonify(data=result)


@blueprint.delete('/item')
@jwt_required()
def delete_contact_note():
    id = request.args['id']
    
    contact_note = ContactNote.query.get(id)
    result = contact_note_schema.dump(contact_note)
    
    contact_note.delete()
        
    return jsonify(data=result)


@blueprint.get('/items')
@jwt_required()
def get_contact_notes():
    ids = request.args.getlist('ids[]')
    contact_notes = ContactNote.query.filter(ContactNote.id.in_(ids))

    result = contact_notes_schema.dump(contact_notes)
    return jsonify(data=result)


@blueprint.delete('/items')
@jwt_required()
def delete_contact_notes():
    ids = request.args.getlist('ids[]')
    contact_notes = ContactNote.query.filter(ContactNote.id.in_(ids))

    result = contact_notes_schema.dump(contact_notes)
    
    [contact_note.delete() for contact_note in contact_notes]
    
    return jsonify(data=result)

@blueprint.route('/refs', methods = ['GET'])
@jwt_required()
def contact_note_refs():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    target = request.args['target']
    id = request.args['id']
    filter[target] = id
    
    order =  getattr(ContactNote, sort['field']).asc() if sort['order'] == 'ASC' else getattr(ContactNote, sort['field']).desc()
    
    records = ContactNote.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=contact_notes_schema.dump(records.items),
                   total=records.total)