from flask import request, jsonify
import json
from . import blueprint
from api import db
from api.models import Tag, tag_schema, tags_schema

@blueprint.route('/list', methods = ['GET'])
def tag_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    order =  getattr(Tag, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Tag, sort['field']).desc()
    
    records = Tag.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=tags_schema.dump(records.items),
                   total=records.total)
    

@blueprint.route('/item', methods = ['POST', 'GET', 'PUT', 'DELETE'])
def tag_item():
    if request.method == 'POST':
        params = request.json['params']
        data = params['data']
        tags = data.pop('tags')
        print(data)
        print(tags)
        
        tag = Tag.create(**data)
        
        result = tag_schema.dump(tag)
    
    if request.method == 'PUT':
        params = request.json['params']
        data = params['data']
        id = params['id']
        
        tag = Tag.query.get(id)
        tag.update(**data)
        
        result = tag_schema.dump(tag)
        
    if request.method == 'GET':
        id = request.args['id']
        
        tag = Tag.query.get(id)
        
        result = tag_schema.dump(tag)
        
    if request.method == 'DELETE':
        id = request.args['id']
        
        tag = Tag.query.get(id)
        result = tag_schema.dump(tag)
        
        tag.delete()
        
    return jsonify(data=result)


@blueprint.route('/items', methods = ['GET'])
def tag_itemss():
    ids = request.args.getlist('ids[]')
    users = Tag.query.filter(Tag.id.in_(ids))

    result = tags_schema.dump(users)
    return jsonify(data=result)