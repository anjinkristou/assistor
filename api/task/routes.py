from flask import request, jsonify
import json
from . import blueprint
from api import db
from api.models import Task, task_schema, tasks_schema

@blueprint.route('/list', methods = ['GET'])
def task_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    order =  getattr(Task, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Task, sort['field']).desc()
    
    records = Task.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=tasks_schema.dump(records.items),
                   total=records.total)
    

@blueprint.get('/item')
def get_task():
    id = request.args['id']
        
    task = Task.query.get(id)
    
    result = task_schema.dump(task)
        
    return jsonify(data=result)


@blueprint.put('/item')
def update_task():
    params = request.json['params']
    data = params['data']
    id = params['id']
    
    task = Task.query.get(id)
    task.update(**data)
    
    result = task_schema.dump(task)
    
    return jsonify(data=result)


@blueprint.post('/item')
def add_task():
    params = request.json['params']
    data = params['data']
    
    task = Task.create(**data)
    
    result = task_schema.dump(task)
    
    return jsonify(data=result)


@blueprint.delete('/item')
def delete_task():
    id = request.args['id']
    
    task = Task.query.get(id)
    result = task_schema.dump(task)
    
    task.delete()
        
    return jsonify(data=result)


@blueprint.get('/items')
def get_tasks():
    ids = request.args.getlist('ids[]')
    tasks = Task.query.filter(Task.id.in_(ids))

    result = tasks_schema.dump(tasks)
    return jsonify(data=result)


@blueprint.delete('/items')
def delete_tasks():
    ids = request.args.getlist('ids[]')
    tasks = Task.query.filter(Task.id.in_(ids))

    result = tasks_schema.dump(tasks)
    
    [task.delete() for task in tasks]
    
    return jsonify(data=result)


@blueprint.route('/refs', methods = ['GET'])
def task_refs():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    target = request.args['target']
    id = request.args['id']
    filter[target] = id
    
    order =  getattr(Task, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Task, sort['field']).desc()
    
    records = Task.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=tasks_schema.dump(records.items),
                   total=records.total)