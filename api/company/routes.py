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

@blueprint.get('/item')
def get_company():
    id = request.args['id']
        
    company = Company.query.get(id)
    
    result = company_schema.dump(company)
        
    return jsonify(data=result)


@blueprint.put('/item')
def update_company():
    params = request.json['params']
    data = params['data']
    id = params['id']
    
    company = Company.query.get(id)
    company.update(**data)
    
    result = company_schema.dump(company)
    
    return jsonify(data=result)


@blueprint.post('/item')
def add_company():
    params = request.json['params']
    data = params['data']
    
    company = Company.create(**data)
    
    result = company_schema.dump(company)
    
    return jsonify(data=result)


@blueprint.delete('/item')
def delete_company():
    id = request.args['id']
    
    company = Company.query.get(id)
    result = company_schema.dump(company)
    
    company.delete()
        
    return jsonify(data=result)
        
@blueprint.get('/items')
def get_companys():
    ids = request.args.getlist('ids[]')
    companys = Company.query.filter(Company.id.in_(ids))

    result = companies_schema.dump(companys)
    return jsonify(data=result)


@blueprint.delete('/items')
def delete_companys():
    ids = request.args.getlist('ids[]')
    companys = Company.query.filter(Company.id.in_(ids))

    result = companies_schema.dump(companys)
    
    [company.delete() for company in companys]
    
    return jsonify(data=result)