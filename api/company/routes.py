from flask import request, jsonify
import json
from http import HTTPStatus

from . import blueprint
from .models import Company, company_schema, companies_schema

@blueprint.route('/list', methods = ['GET'])
def companylist():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    query = Company.query
    
    if 'q' in filter:
        keyword = filter['q']
        del filter['q']
        query = query.msearch(keyword)
    
    query = query.filter_by(**filter)
    
    order =  getattr(Company, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Company, sort['field']).desc()
    query = query.order_by(order)
    
    records = query.paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=companies_schema.dump(records.items),
                   total=records.total), HTTPStatus.OK

@blueprint.get('/item')
def get_company():
    id = request.args['id']
        
    company = Company.query.get(id)
    
    result = company_schema.dump(company)
        
    return jsonify(data=result), HTTPStatus.OK


@blueprint.put('/item')
def update_company():
    params = request.json['params']
    data = params['data']
    id = params['id']
    
    company = Company.query.get(id)
    if company is None:
        return jsonify(message='No record'), HTTPStatus.NO_CONTENT
    
    company.update(**data)
    
    result = company_schema.dump(company)
    
    return jsonify(data=result), HTTPStatus.OK


@blueprint.post('/item')
def add_company():
    params = request.json['params']
    data = params['data']
    
    company = Company.create(**data)
    
    result = company_schema.dump(company)
    
    return jsonify(data=result), HTTPStatus.CREATED


@blueprint.delete('/item')
def delete_company():
    id = request.args['id']
    
    company = Company.query.get(id)
    if company is None:
        return jsonify(message='No record'), HTTPStatus.NO_CONTENT
        
    result = company_schema.dump(company)
    
    company.delete()
        
    return jsonify(data=result), HTTPStatus.OK

        
@blueprint.get('/items')
def get_companies():
    ids = request.args.getlist('ids[]')
    companies = Company.query.filter(Company.id.in_(ids))

    result = companies_schema.dump(companies)
    return jsonify(data=result), HTTPStatus.OK


@blueprint.delete('/items')
def delete_companies():
    ids = request.args.getlist('ids[]')
    companies = Company.query.filter(Company.id.in_(ids))
    if len(companies) == 0:
        return jsonify(message='No records'), HTTPStatus.NO_CONTENT

    result = companies_schema.dump(companies)
    
    [company.delete() for company in companies]
    
    return jsonify(data=result), HTTPStatus.OK