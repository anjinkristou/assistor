from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from .models import Product, product_schema, products_schema
from app.api.product_property.models import ProductProperty
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(ProductList, f'{prefix}products/list', endpoint = 'products')
    api.add_resource(ProductItem, f'{prefix}products/item', endpoint = 'product')
    api.add_resource(ProductItems, f'{prefix}products/items')
    api.add_resource(ProductRefs, f'{prefix}products/refs')