from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from flask import Blueprint

blueprint = Blueprint('products', __name__, url_prefix='/products')
from .models import Product, product_schema, products_schema

@blueprint.get('/list')
@jwt_required()
def product_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    query = Product.query
    
    if 'q' in filter:
        keyword = filter['q']
        del filter['q']
        query = query.msearch(keyword)
    
    query = query.filter_by(**filter)
    
    order =  getattr(Product, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Product, sort['field']).desc()
    query = query.order_by(order)
    
    records = query.paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=products_schema.dump(records.items),
                   total=records.total)
    

@blueprint.get('/item')
@jwt_required()
def get_product():
    id = request.args['id']
        
    product = Product.query.get(id)
    
    result = product_schema.dump(product)
        
    return jsonify(data=result)


@blueprint.put('/item')
@jwt_required()
def update_product():
    data = request.json['data']
    id = request.json['id']
    
    product = Product.query.get(id)
    product.update(**data)
    
    result = product_schema.dump(product)
    
    return jsonify(data=result)


@blueprint.post('/item')
@jwt_required()
def add_product():
    data = request.json['data']
    
    product = Product.create(**data)
    
    result = product_schema.dump(product)
    
    return jsonify(data=result)


@blueprint.delete('/item')
@jwt_required()
def delete_product():
    id = request.args['id']
    
    product = Product.query.get(id)
    result = product_schema.dump(product)
    
    product.delete()
        
    return jsonify(data=result)


@blueprint.get('/items')
@jwt_required()
def get_products():
    ids = request.args.getlist('ids[]')
    products = Product.query.filter(Product.id.in_(ids))

    result = products_schema.dump(products)
    return jsonify(data=result)


@blueprint.delete('/items')
@jwt_required()
def delete_products():
    ids = request.args.getlist('ids[]')
    products = Product.query.filter(Product.id.in_(ids))

    result = products_schema.dump(products)
    
    [product.delete() for product in products]
    
    return jsonify(data=result)