from flask import request, jsonify
import json
from . import blueprint
from api import db
from api.models import Company, company_schema, companies_schema

@blueprint.route('/list', methods = ['GET'])
def companylist():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    order =  getattr(Company, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Company, sort['field']).desc()
    
    records = Company.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=companies_schema.dump(records.items),
                   total=records.total)
    

@blueprint.route('/item', methods = ['POST', 'GET', 'PUT', 'DELETE'])
def company_item():
    if request.method == 'POST':
        print(request.json)
        params = request.json['params']
        data = params['data']
        print(params['data'])
        
        company = Company.create(**data)
        
        result = company_schema.dump(company)
    
    if request.method == 'PUT':
        params = request.json['params']
        data = params['data']
        id = params['id']
        
        company = Company.query.get(id)
        company.update(**data)
        
        result = company_schema.dump(company)
        
    if request.method == 'GET':
        id = request.args['id']
        
        company = Company.query.get(id)
        
        result = company_schema.dump(company)
        
    if request.method == 'DELETE':
        id = request.args['id']
        
        company = Company.query.get(id)
        result = company_schema.dump(company)
        
        company.delete()
        
    return jsonify(data=result)

@blueprint.route('/items', methods = ['GET'])
def company_items():
    ids = request.args.getlist('ids[]')
    companies = Company.query.filter(Company.id.in_(ids))

    result = companies_schema.dump(companies)
    return jsonify(data=result)