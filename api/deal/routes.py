from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from flask import Blueprint

blueprint = Blueprint('deals', __name__, url_prefix='/deals')
from .models import Deal, deal_schema, deals_schema

@blueprint.route('/list', methods = ['GET'])
@jwt_required()
def deal_list():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    
    order =  getattr(Deal, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Deal, sort['field']).desc()
    
    records = Deal.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=deals_schema.dump(records.items),
                   total=records.total)
    

@blueprint.get('/item')
@jwt_required()
def get_deal():
    id = request.args['id']
        
    deal = Deal.query.get(id)
    
    result = deal_schema.dump(deal)
        
    return jsonify(data=result)


@blueprint.put('/item')
@jwt_required()
def update_deal():
    params = request.json['params']
    data = params['data']
    id = params['id']
    
    deal = Deal.query.get(id)
    deal.update(**data)
    
    result = deal_schema.dump(deal)
    
    return jsonify(data=result)


@blueprint.post('/item')
@jwt_required()
def add_deal():
    params = request.json['params']
    data = params['data']
    
    deal = Deal.create(**data)
    
    result = deal_schema.dump(deal)
    
    return jsonify(data=result)


@blueprint.delete('/item')
@jwt_required()
def delete_deal():
    id = request.args['id']
    
    deal = Deal.query.get(id)
    result = deal_schema.dump(deal)
    
    deal.delete()
        
    return jsonify(data=result)


@blueprint.get('/items')
@jwt_required()
def get_deals():
    ids = request.args.getlist('ids[]')
    deals = Deal.query.filter(Deal.id.in_(ids))

    result = deals_schema.dump(deals)
    return jsonify(data=result)


@blueprint.delete('/items')
@jwt_required()
def delete_deals():
    ids = request.args.getlist('ids[]')
    deals = Deal.query.filter(Deal.id.in_(ids))

    result = deals_schema.dump(deals)
    
    [deal.delete() for deal in deals]
    
    return jsonify(data=result)


@blueprint.route('/refs', methods = ['GET'])
@jwt_required()
def deal_refs():
    pagination = json.loads(request.args['pagination'])
    sort = json.loads(request.args['sort'])
    filter = json.loads(request.args['filter'])
    target = request.args['target']
    id = request.args['id']
    filter[target] = id
    
    order =  getattr(Deal, sort['field']).asc() if sort['order'] == 'ASC' else getattr(Deal, sort['field']).desc()
    
    records = Deal.query.filter_by(**filter).order_by(order).paginate(page=pagination['page'], per_page=pagination['perPage'])

    return jsonify(data=deals_schema.dump(records.items),
                   total=records.total)