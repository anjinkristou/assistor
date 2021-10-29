from flask import request, jsonify
import json
from . import blueprint
from api import db
from api.models import ContactNote, contact_note_schema, contact_notes_schema

@blueprint.route('/list', methods = ['GET'])
def contact_note_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    order =  getattr(ContactNote, sort['field']).asc() if sort['order'] == 'ASC' else getattr(ContactNote, sort['field']).desc()
    
    records = ContactNote.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=contact_notes_schema.dump(records.items),
                   total=records.total)
    

@blueprint.route('/item', methods = ['POST', 'GET', 'PUT', 'DELETE'])
def contact_note_item():
    if request.method == 'POST':
        params = request.json['params']
        data = params['data']
        
        contact_note = ContactNote.create(**data)
        
        result = contact_note_schema.dump(contact_note)
    
    if request.method == 'PUT':
        params = request.json['params']
        data = params['data']
        id = params['id']
        
        contact_note = ContactNote.query.get(id)
        contact_note.update(**data)
        
        result = contact_note_schema.dump(contact_note)
        
    if request.method == 'GET':
        id = request.args['id']
        
        contact_note = ContactNote.query.get(id)
        
        result = contact_note_schema.dump(contact_note)
        
    if request.method == 'DELETE':
        id = request.args['id']
        
        contact_note = ContactNote.query.get(id)
        result = contact_note_schema.dump(contact_note)
        
        contact_note.delete()
        
    return jsonify(data=result)


@blueprint.route('/items', methods = ['GET'])
def contact_note_items():
    ids = request.args.getlist('ids[]')
    contact_note = ContactNote.query.filter(ContactNote.id.in_(ids))

    result = contact_notes_schema.dump(contact_note)
    return jsonify(data=result)

@blueprint.route('/refs', methods = ['GET'])
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