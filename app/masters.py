from typing import _SpecialForm
from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
import json
from http import HTTPStatus

class ResourceList(Resource):
    decorators = [jwt_required()]
    model_cls = None
    model_schema = None
    models_schema = None
    
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('pagination')
        self.parser.add_argument('sort')
        self.parser.add_argument('filter')
        
    def get(self):
        args = self.parser.parse_args()
        pagination = json.loads(args['pagination'])
        sort = json.loads(args['sort'])
        filter = json.loads(args['filter'])
        
        filter = self.post_filter(filter)
        
        query = self.model_cls.query
        
        query = self.post_query(query)
        
        query = query.filter_by(**filter)
        
        order =  getattr(self.model_cls, sort['field']).asc() if sort['order'] == 'ASC' else getattr(self.model_cls, sort['field']).desc()
        query = query.order_by(order)
    
        records = query.paginate(page=pagination['page'], per_page=pagination['perPage'])
        data = self.models_schema.dump(records.items)
        
        data = self.post_data(data)

        return {
            "data": data,
            "total": records.total,
        }, HTTPStatus.OK
    
    def post_filter(self, filter):
        self.keyword = None
        if 'q' in filter:
            self.keyword = filter['q']
            del filter['q']
        
        self.spcial_fields = []
        for key in filter:
            if key.endswith('_gte') or key.endswith('_lte') or key.endswith('_dif'):
                self.spcial_fields.append({
                    'key': key,
                    'field': key[:-4],
                    'operation': key[-3:],
                    'value': filter[key]
                })
        
        [filter.pop(field['key'], None) for field in self.spcial_fields]
        
        return filter
    
    def post_query(self, query):
        if self.keyword:
            query = query.msearch(f'*{self.keyword}*')
            
        for field in self.spcial_fields:
            if field['operation'] == 'gte':
                query = query.filter(getattr(self.model_cls, field['field']) >= field['value'])

            if field['operation'] == 'lte':
                query = query.filter(getattr(self.model_cls, field['field']) <= field['value'])
            
            if field['operation'] == 'dif':
                query = query.filter(getattr(self.model_cls, field['field']) != field['value'])

       
        return query
    
    def post_data(self, data):
        return data


class ResourceItem(Resource):
    decorators = [jwt_required()]
    model_cls = None
    model_schema = None
    models_schema = None
    
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('id', type=int)
        self.parser.add_argument('data', type=dict)
        
    def get(self):
        args = self.parser.parse_args()
        id = args['id']
            
        item = self.model_cls.query.get(id)
        
        result = self.model_schema.dump(item)
            
        return {"data": result}, HTTPStatus.OK
    
    def put(self):
        args = self.parser.parse_args()
        data = args['data']
        id = args['id']
        
        data = self.post_data(data)
        
        item = self.model_cls.query.get(id)
        if item is None:
            return {"msg": 'No record'}, HTTPStatus.NO_CONTENT
        
        item.update(**data)
        
        result = self.model_schema.dump(item)
        
        return {"data": result}, HTTPStatus.OK
        
    def post(self):
        args = self.parser.parse_args()
        data = args['data']
        
        data = self.post_data(data)
        
        item = self.model_cls.create(**data)
        
        result = self.model_schema.dump(item)

        return {"data": result}, HTTPStatus.CREATED


    def delete(self):
        args = self.parser.parse_args()
        id = args['id']
        
        item = self.model_cls.query.get(id)
        if item is None:
            return {"msg": 'No record'}, HTTPStatus.NO_CONTENT
        
        result = self.model_schema.dump(item)
        
        item.delete()

        return {"data": result}, HTTPStatus.OK
    
    def post_data(self, data):
        return data

class ResourceItems(Resource):
    decorators = [jwt_required()]
    model_cls = None
    model_schema = None
    models_schema = None
    
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('data', type=dict)
        self.parser.add_argument('ids[]', action='append')
        self.parser.add_argument('ids', action='append', type=int)
        
    def get(self):
        args = self.parser.parse_args()
        ids = args['ids[]']
        items = self.model_cls.query.filter(self.model_cls.id.in_(ids))

        result = self.models_schema.dump(items)
        
        return {"data": result}, HTTPStatus.OK

    def delete(self):
        args = self.parser.parse_args()
        ids = args['ids[]']
        
        items = self.model_cls.query.filter(self.model_cls.id.in_(ids)).all()
        if len(items) == 0:
            return {"msg": 'No records'}, HTTPStatus.NO_CONTENT

        result = self.models_schema.dump(items)
        
        [item.delete() for item in items]
        
        return {"data": result}, HTTPStatus.OK
    
    def put(self):
        args = self.parser.parse_args()
        data = args['data']
        ids = args['ids']
        
        items = self.model_cls.query.filter(self.model_cls.id.in_(ids)).all()
        if len(items) == 0:
            return {"msg": 'No records'}, HTTPStatus.NO_CONTENT
        
        [item.update(**data) for item in items]

        result = self.models_schema.dump(items)
        
        return {"data": result}, HTTPStatus.OK


class ResourceRefs(Resource):
    decorators = [jwt_required()]
    model_cls = None
    model_schema = None
    models_schema = None
    
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('id', type=int)
        self.parser.add_argument('pagination')
        self.parser.add_argument('sort')
        self.parser.add_argument('filter')
        self.parser.add_argument('target')
        
    def get(self):
        args = self.parser.parse_args()
        pagination = json.loads(args['pagination'])
        sort = json.loads(args['sort'])
        filter = json.loads(args['filter'])
        target = args['target']
        id = args['id']
        filter[target] = id
        
        order =  getattr(self.model_cls, sort['field']).asc() if sort['order'] == 'ASC' else getattr(self.model_cls, sort['field']).desc()
        
        records = self.model_cls.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

        return {
            "data": self.models_schema.dump(records.items),
            "total": records.total,
        }, HTTPStatus.OK

