from flask import request, jsonify
import json
from . import blueprint
from api import db
from api.models import Contact, contact_schema, contacts_schema

@blueprint.route('/list', methods = ['GET'])
def contact_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    order =  getattr(Contact, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Contact, sort['field']).desc()
    
    records = Contact.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=contacts_schema.dump(records.items),
                   total=records.total)
    

@blueprint.route('/item', methods = ['POST', 'GET', 'PUT', 'DELETE'])
def contact_item():
    if request.method == 'POST':
        params = request.json['params']
        data = params['data']
        tags = data.pop('tags')
        print(data)
        print(tags)
        
        contact = Contact.create(**data)
        
        result = contact_schema.dump(contact)
    
    if request.method == 'PUT':
        params = request.json['params']
        data = params['data']
        id = params['id']
        
        contact = Contact.query.get(id)
        contact.update(**data)
        
        result = contact_schema.dump(contact)
        
    if request.method == 'GET':
        id = request.args['id']
        
        contact = Contact.query.get(id)
        
        result = contact_schema.dump(contact)
        
    if request.method == 'DELETE':
        id = request.args['id']
        
        contact = Contact.query.get(id)
        result = contact_schema.dump(contact)
        
        contact.delete()
        
    return jsonify(data=result)


@blueprint.route('/items', methods = ['GET'])
def contact_items():
    ids = request.args.getlist('ids[]')
    contact = Contact.query.filter(Contact.id.in_(ids))

    result = contacts_schema.dump(contact)
    return jsonify(data=result)

@blueprint.route('/refs', methods = ['GET'])
def contact_refs():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    target = request.args['target']
    id = request.args['id']
    filter[target] = id
    
    order =  getattr(Contact, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Contact, sort['field']).desc()
    
    records = Contact.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=contacts_schema.dump(records.items),
                   total=records.total)