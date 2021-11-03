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
    

@blueprint.get('/item')
def get_tag():
    id = request.args['id']
        
    tag = Tag.query.get(id)
    
    result = tag_schema.dump(tag)
        
    return jsonify(data=result)


@blueprint.put('/item')
def update_tag():
    params = request.json['params']
    data = params['data']
    id = params['id']
    
    tag = Tag.query.get(id)
    tag.update(**data)
    
    result = tag_schema.dump(tag)
    
    return jsonify(data=result)


@blueprint.post('/item')
def add_tag():
    params = request.json['params']
    data = params['data']
    
    tag = Tag.create(**data)
    
    result = tag_schema.dump(tag)
    
    return jsonify(data=result)


@blueprint.delete('/item')
def delete_tag():
    id = request.args['id']
    
    tag = Tag.query.get(id)
    result = tag_schema.dump(tag)
    
    tag.delete()
        
    return jsonify(data=result)


@blueprint.get('/items')
def get_tags():
    ids = request.args.getlist('ids[]')
    tags = Tag.query.filter(Tag.id.in_(ids))

    result = tags_schema.dump(tags)
    return jsonify(data=result)


@blueprint.delete('/items')
def delete_tags():
    ids = request.args.getlist('ids[]')
    tags = Tag.query.filter(Tag.id.in_(ids))

    result = tags_schema.dump(tags)
    
    [tag.delete() for tag in tags]
    
    return jsonify(data=result)