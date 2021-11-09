from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from flask import Blueprint

blueprint = Blueprint('countries', __name__, url_prefix='/countries')
from .models import Country, country_schema, countries_schema

@blueprint.route('/list', methods = ['GET'])
@jwt_required()
def country_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    query = Country.query
    
    if 'q' in filter:
        keyword = filter['q']
        del filter['q']
        query = query.msearch(keyword)
    
    query = query.filter_by(**filter)
    
    order =  getattr(Country, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Country, sort['field']).desc()
    query = query.order_by(order)
    
    records = query.paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=countries_schema.dump(records.items),
                   total=records.total)
    

@blueprint.get('/item')
@jwt_required()
def get_country():
    id = request.args['id']
        
    country = Country.query.get(id)
    
    result = country_schema.dump(country)
        
    return jsonify(data=result)


@blueprint.put('/item')
@jwt_required()
def update_country():
    data = request.json['data']
    id = request.json['id']
    
    country = Country.query.get(id)
    country.update(**data)
    
    result = country_schema.dump(country)
    
    return jsonify(data=result)


@blueprint.post('/item')
@jwt_required()
def add_country():
    data = request.json['data']
    
    country = Country.create(**data)
    
    result = country_schema.dump(country)
    
    return jsonify(data=result)


@blueprint.delete('/item')
@jwt_required()
def delete_country():
    id = request.args['id']
    
    country = Country.query.get(id)
    result = country_schema.dump(country)
    
    country.delete()
        
    return jsonify(data=result)


@blueprint.get('/items')
@jwt_required()
def get_countries():
    ids = request.args.getlist('ids[]')
    countries = Country.query.filter(Country.id.in_(ids))

    result = countries_schema.dump(countries)
    return jsonify(data=result)


@blueprint.delete('/items')
@jwt_required()
def delete_countries():
    ids = request.args.getlist('ids[]')
    countries = Country.query.filter(Country.id.in_(ids))

    result = countries_schema.dump(countries)
    
    [country.delete() for country in countries]
    
    return jsonify(data=result)