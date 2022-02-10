from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import Task, task_schema, tasks_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "tasks"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class TaskList(ResourceList):
    model_cls = Task
    model_schema = task_schema
    models_schema = tasks_schema


class TaskItem(ResourceItem):
    model_cls = Task
    model_schema = task_schema
    models_schema = tasks_schema


class TaskItems(ResourceItems):
    model_cls = Task
    model_schema = task_schema
    models_schema = tasks_schema
    

class TaskRefs(ResourceRefs):
    model_cls = Task
    model_schema = task_schema
    models_schema = tasks_schema
    
api.add_resource(TaskList, '/list')
api.add_resource(TaskItem, '/item')
api.add_resource(TaskItems, '/items')
api.add_resource(TaskRefs, '/refs')
    

def register_api(api, prefix="/"):
    api.add_resource(TaskList, f'{prefix}tasks/list', endpoint = 'tasks')
    api.add_resource(TaskItem, f'{prefix}tasks/item', endpoint = 'task')
    api.add_resource(TaskItems, f'{prefix}tasks/items')
    api.add_resource(TaskRefs, f'{prefix}tasks/refs')