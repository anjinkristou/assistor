from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from .models import Task, task_schema, tasks_schema
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(TaskList, f'{prefix}tasks/list', endpoint = 'tasks')
    api.add_resource(TaskItem, f'{prefix}tasks/item', endpoint = 'task')
    api.add_resource(TaskItems, f'{prefix}tasks/items')
    api.add_resource(TaskRefs, f'{prefix}tasks/refs')