# -*- encoding: utf-8 -*-

from flask import Blueprint
from flask_restful import Api

restful_bp = Blueprint('restful', __name__, url_prefix='/api')

api = Api(restful_bp)
# api.add_resource(UserApi, '/user')
# api.add_resource(CompanyApi, '/company')
# api.add_resource(AuthApi, '/auth')