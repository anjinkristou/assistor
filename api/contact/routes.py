from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from flask import Blueprint

blueprint = Blueprint('contacts', __name__, url_prefix='/contacts')
from .models import Contact, contact_schema, contacts_schema, Tag

@blueprint.route('/list', methods = ['GET'])
@jwt_required()
def contact_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    query = Contact.query
    
    tags = None

    if 'tags' in filter:
        tags = filter['tags']
        del filter['tags']
    
    keyword = None
    if 'q' in filter:
        keyword = filter['q']
        del filter['q']
        query = query.msearch(keyword)
    
    if keyword:
        query = query.msearch(keyword)
        
    query = query.filter_by(**filter)
    
    if tags:
        query = query.join(Contact.tags).filter(Tag.id.in_(tags))
    
    
    order =  getattr(Contact, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Contact, sort['field']).desc()
    records = query.order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=contacts_schema.dump(records.items),
                   total=records.total)
    

@blueprint.get('/item')
@jwt_required()
def get_contact():
    id = request.args['id']
        
    contact = Contact.query.get(id)
    
    result = contact_schema.dump(contact)
        
    return jsonify(data=result)


@blueprint.put('/item')
@jwt_required()
def update_contact():
    data = request.json['data']
    id = request.json['id']
    
    if 'tags' in data:
        tags = data['tags']
        data['tags'] = Tag.query.filter(Tag.id.in_(tags)).all()
    
    contact = Contact.query.get(id)
    contact.update(**data)
    
    result = contact_schema.dump(contact)
    
    return jsonify(data=result)


@blueprint.post('/item')
@jwt_required()
def add_contact():
    data = request.json['data']
    
    contact = Contact.create(**data)
    
    result = contact_schema.dump(contact)
    
    return jsonify(data=result)


@blueprint.delete('/item')
@jwt_required()
def delete_contact():
    id = request.args['id']
    
    contact = Contact.query.get(id)
    result = contact_schema.dump(contact)
    
    contact.delete()
        
    return jsonify(data=result)


@blueprint.get('/items')
@jwt_required()
def get_contacts():
    ids = request.args.getlist('ids[]')
    contacts = Contact.query.filter(Contact.id.in_(ids))

    result = contacts_schema.dump(contacts)
    return jsonify(data=result)


@blueprint.delete('/items')
@jwt_required()
def delete_contacts():
    ids = request.args.getlist('ids[]')
    contacts = Contact.query.filter(Contact.id.in_(ids))

    result = contacts_schema.dump(contacts)
    
    [contact.delete() for contact in contacts]
    
    return jsonify(data=result)


@blueprint.route('/refs', methods = ['GET'])
@jwt_required()
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