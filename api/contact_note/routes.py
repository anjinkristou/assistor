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
    

@blueprint.get('/item')
def get_contact_note():
    id = request.args['id']
        
    contact_note = ContactNote.query.get(id)
    
    result = contact_note_schema.dump(contact_note)
        
    return jsonify(data=result)


@blueprint.put('/item')
def update_contact_note():
    params = request.json['params']
    data = params['data']
    id = params['id']
    
    contact_note = ContactNote.query.get(id)
    contact_note.update(**data)
    
    result = contact_note_schema.dump(contact_note)
    
    return jsonify(data=result)


@blueprint.post('/item')
def add_contact_note():
    params = request.json['params']
    data = params['data']
    
    contact_note = ContactNote.create(**data)
    
    result = contact_note_schema.dump(contact_note)
    
    return jsonify(data=result)


@blueprint.delete('/item')
def delete_contact_note():
    id = request.args['id']
    
    contact_note = ContactNote.query.get(id)
    result = contact_note_schema.dump(contact_note)
    
    contact_note.delete()
        
    return jsonify(data=result)


@blueprint.get('/items')
def get_contact_notes():
    ids = request.args.getlist('ids[]')
    contact_notes = ContactNote.query.filter(ContactNote.id.in_(ids))

    result = contact_notes_schema.dump(contact_notes)
    return jsonify(data=result)


@blueprint.delete('/items')
def delete_contact_notes():
    ids = request.args.getlist('ids[]')
    contact_notes = ContactNote.query.filter(ContactNote.id.in_(ids))

    result = contact_notes_schema.dump(contact_notes)
    
    [contact_note.delete() for contact_note in contact_notes]
    
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