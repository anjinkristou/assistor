from flask import request, jsonify
from flask import Blueprint
from flask_restful import Api
from flask_jwt_extended import jwt_required
import json

from .models import Company, company_schema, companies_schema, Tag
from app.api.product.models import Product
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

endpoint = "companies"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')
api = Api(blueprint)

class CompanyList(ResourceList):
    model_cls = Company
    model_schema = company_schema
    models_schema = companies_schema
    
    def post_filter(self, filter):
        filter = super(CompanyList, self).post_filter(filter)
        
        self.tags = None
        if 'tags' in filter:
            self.tags = filter['tags']
            del filter['tags']
            
        self.use_products = None
        if 'use_products' in filter:
            self.tags = filter['use_products']
            del filter['use_products']
        
        return filter
    
    def post_query(self, query):
        query = super(CompanyList, self).post_query(query)
        
        if self.tags:
            query = query.join(Company.tags).filter(Tag.id.in_(self.tags))
        
        return query



class CompanyItem(ResourceItem):
    model_cls = Company
    model_schema = company_schema
    models_schema = companies_schema
    
    def post_data(self, data):
        data = super(CompanyItem, self).post_data(data)
        
        if 'nb_contacts' in data:
            del data['nb_contacts']
        if 'nb_deals' in data:
            del data['nb_deals']
        if 'nb_notes' in data:
            del data['nb_notes']
        if 'nb_customers' in data:
            del data['nb_customers']
        if 'country_iso' in data:
            del data['country_iso']
        if 'nb_products' in data:
            del data['nb_products']
        
        if 'tags' in data:
            tags = data['tags']
            data['tags'] = Tag.query.filter(Tag.id.in_(tags)).all()
            
        if 'use_products' in data:
            tags = data['use_products']
            data['use_products'] = Product.query.filter(Product.id.in_(tags)).all()
            
        return data


        
class CompanyItems(ResourceItems):
    model_cls = Company
    model_schema = company_schema
    models_schema = companies_schema
    

class CompanyRefs(ResourceRefs):
    model_cls = Company
    model_schema = company_schema
    models_schema = companies_schema
    
api.add_resource(CompanyList, '/list')
api.add_resource(CompanyItem, '/item')
api.add_resource(CompanyItems, '/items')
api.add_resource(CompanyRefs, '/refs')