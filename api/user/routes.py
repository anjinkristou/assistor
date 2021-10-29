from flask import request, jsonify
import json
from . import blueprint
from api import db
from api.models.user import User, user_schema, users_schema

@blueprint.route('/list', methods = ['GET'])
def user_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    order =  getattr(User, sort['field']).asc() if sort['order'] == 'ASC' else getattr(User, sort['field']).desc()
    
    records = User.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=users_schema.dump(records.items),
                   total=records.total)
    

@blueprint.route('/item', methods = ['POST', 'GET', 'PUT', 'DELETE'])
def user_item():
    if request.method == 'POST':
        print(request.json)
        params = request.json['params']
        data = params['data']
        print(params['data'])
        
        user = User.create(**data)
        
        result = user_schema.dump(user)
    
    if request.method == 'PUT':
        params = request.json['params']
        data = params['data']
        id = params['id']
        
        user = User.query.get(id)
        user.update(**data)
        
        result = user_schema.dump(user)
        
    if request.method == 'GET':
        id = request.args['id']
        
        user = User.query.get(id)
        
        result = user_schema.dump(user)
        
    if request.method == 'DELETE':
        id = request.args['id']
        
        user = User.query.get(id)
        result = user_schema.dump(user)
        
        user.delete()
        
    return jsonify(data=result)


@blueprint.route('/items', methods = ['GET'])
def user_items():
    ids = request.args.getlist('ids[]')
    users = User.query.filter(User.id.in_(ids))

    result = users_schema.dump(users)
    return jsonify(data=result)