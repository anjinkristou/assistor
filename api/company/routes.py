from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json
from http import HTTPStatus

from flask import Blueprint

blueprint = Blueprint('companies', __name__, url_prefix='/companies')
from .models import Company, company_schema, companies_schema, Tag

@blueprint.route('/list', methods = ['GET'])
@jwt_required()
def companylist():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    query = Company.query
    
    tags = None

    if 'tags' in filter:
        tags = filter['tags']
        del filter['tags']
    
    if 'q' in filter:
        keyword = filter['q']
        del filter['q']
        query = query.msearch(keyword)
    
    query = query.filter_by(**filter)
    
    if tags:
        query = query.join(Company.tags).filter(Tag.id.in_(tags))
    
    order =  getattr(Company, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Company, sort['field']).desc()
    query = query.order_by(order)
    
    records = query.paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=companies_schema.dump(records.items),
                   total=records.total), HTTPStatus.OK


@blueprint.get('/item')
@jwt_required()
def get_company():
    id = request.args['id']
        
    company = Company.query.get(id)
    
    result = company_schema.dump(company)
        
    return jsonify(data=result), HTTPStatus.OK


@blueprint.put('/item')
@jwt_required()
def update_company():
    data = request.json['data']
    id = request.json['id']
    
    if 'tags' in data:
        tags = data['tags']
        data['tags'] = Tag.query.filter(Tag.id.in_(tags)).all()
    
    company = Company.query.get(id)
    if company is None:
        return jsonify(message='No record'), HTTPStatus.NO_CONTENT
    
    company.update(**data)
    
    result = company_schema.dump(company)
    
    return jsonify(data=result), HTTPStatus.OK


@blueprint.post('/item')
@jwt_required()
def add_company():
    data = request.json['data']
    
    company = Company.create(**data)
    
    result = company_schema.dump(company)
    
    return jsonify(data=result), HTTPStatus.CREATED


@blueprint.delete('/item')
@jwt_required()
def delete_company():
    id = request.args['id']
    
    company = Company.query.get(id)
    if company is None:
        return jsonify(message='No record'), HTTPStatus.NO_CONTENT
        
    result = company_schema.dump(company)
    
    company.delete()
        
    return jsonify(data=result), HTTPStatus.OK

        
@blueprint.get('/items')
@jwt_required()
def get_companies():
    ids = request.args.getlist('ids[]')
    companies = Company.query.filter(Company.id.in_(ids))

    result = companies_schema.dump(companies)
    return jsonify(data=result), HTTPStatus.OK


@blueprint.delete('/items')
@jwt_required()
def delete_companies():
    ids = request.args.getlist('ids[]')
    companies = Company.query.filter(Company.id.in_(ids))
    if len(companies) == 0:
        return jsonify(message='No records'), HTTPStatus.NO_CONTENT

    result = companies_schema.dump(companies)
    
    [company.delete() for company in companies]
    
    return jsonify(data=result), HTTPStatus.OK