from flask import request, jsonify
from flask_jwt_extended import jwt_required
import json

from .models import Company, company_schema, companies_schema, Tag
from app.api.product.models import Product
from app.masters import ResourceList, ResourceItem, ResourceItems, ResourceRefs

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
    

def register_api(api, prefix="/"):
    api.add_resource(CompanyList, f'{prefix}companies/list', endpoint = 'companies')
    api.add_resource(CompanyItem, f'{prefix}companies/item', endpoint = 'company')
    api.add_resource(CompanyItems, f'{prefix}companies/items')
    api.add_resource(CompanyRefs, f'{prefix}companies/refs')