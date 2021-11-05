from flask import request, jsonify
import json

from flask import Blueprint

blueprint = Blueprint('dealNotes', __name__, url_prefix='/dealNotes')
from .models import DealNote, deal_note_schema, deal_notes_schema

@blueprint.route('/list', methods = ['GET'])
def deal_note_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    order =  getattr(DealNote, sort['field']).asc() if sort['order'] == 'ASC' else getattr(DealNote, sort['field']).desc()
    
    records = DealNote.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=deal_notes_schema.dump(records.items),
                   total=records.total)
    

@blueprint.get('/item')
def get_deal_note():
    id = request.args['id']
        
    deal_note = DealNote.query.get(id)
    
    result = deal_note_schema.dump(deal_note)
        
    return jsonify(data=result)


@blueprint.put('/item')
def update_deal_note():
    params = request.json['params']
    data = params['data']
    id = params['id']
    
    deal_note = DealNote.query.get(id)
    deal_note.update(**data)
    
    result = deal_note_schema.dump(deal_note)
    
    return jsonify(data=result)


@blueprint.post('/item')
def add_deal_note():
    params = request.json['params']
    data = params['data']
    
    deal_note = DealNote.create(**data)
    
    result = deal_note_schema.dump(deal_note)
    
    return jsonify(data=result)


@blueprint.delete('/item')
def delete_deal_note():
    id = request.args['id']
    
    deal_note = DealNote.query.get(id)
    result = deal_note_schema.dump(deal_note)
    
    deal_note.delete()
        
    return jsonify(data=result)


@blueprint.get('/items')
def get_deal_notes():
    ids = request.args.getlist('ids[]')
    deal_notes = DealNote.query.filter(DealNote.id.in_(ids))

    result = deal_notes_schema.dump(deal_notes)
    return jsonify(data=result)


@blueprint.delete('/items')
def delete_deal_notes():
    ids = request.args.getlist('ids[]')
    deal_notes = DealNote.query.filter(DealNote.id.in_(ids))

    result = deal_notes_schema.dump(deal_notes)
    
    [deal_note.delete() for deal_note in deal_notes]
    
    return jsonify(data=result)


@blueprint.route('/refs', methods = ['GET'])
def deal_note_refs():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    target = request.args['target']
    id = request.args['id']
    filter[target] = id
    
    order =  getattr(DealNote, sort['field']).asc() if sort['order'] == 'ASC' else getattr(DealNote, sort['field']).desc()
    
    records = DealNote.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=deal_notes_schema.dump(records.items),
                   total=records.total)