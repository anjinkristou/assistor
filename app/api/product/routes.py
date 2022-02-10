from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import Product, product_schema, products_schema
from app.api.product_property.models import ProductProperty
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "products"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class ProductList(ResourceList):
    model_cls = Product
    model_schema = product_schema
    models_schema = products_schema


class ProductItem(ResourceItem):
    model_cls = Product
    model_schema = product_schema
    models_schema = products_schema
    
    def post_data(self, data):
        data = super(ProductItem, self).post_data(data)
        
        if 'properties' in data:
            properties = data['properties']
            new_props = []
            for property in properties:
                if 'id' in property:
                    prop = ProductProperty.query.get(property['id'])
                    prop.update(**property)
                else:
                    prop = ProductProperty.create(**property)
                new_props.append(prop)
            data['properties'] = new_props
            
        return data


class ProductItems(ResourceItems):
    model_cls = Product
    model_schema = product_schema
    models_schema = products_schema
    

class ProductRefs(ResourceRefs):
    model_cls = Product
    model_schema = product_schema
    models_schema = products_schema
    
api.add_resource(ProductList, '/list')
api.add_resource(ProductItem, '/item')
api.add_resource(ProductItems, '/items')
api.add_resource(ProductRefs, '/refs')