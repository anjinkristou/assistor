import json
from flask import request, jsonify
from flask import Blueprint
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from http import HTTPStatus
from .connector.linkedin import Linkedin

from app.api.company.models import Company
from app.api.user.models import User

endpoint = "linkedin"
blueprint = Blueprint(f'{endpoint}', __name__, url_prefix=f'/{endpoint}')

linkedin_connectors = []

def find_driver(items, user_id):
    result = None
    for item in items:
        if item["id"] == user_id:
            result = item["driver"]
    return result

def get_driver(user_id):
    driver = find_driver(linkedin_connectors, user_id)
    if driver is None:
        driver = Linkedin()
        linkedin_connectors.append({"id": user_id, "driver": driver})
    return driver


@blueprint.route('/company/fetch', methods = ['GET'])
@jwt_required()
def linkedin_company_fetch():
    id = request.args.get('id', None)
    if id is None:
        return jsonify({'msg': "id parameter is needed"}), HTTPStatus.BAD_REQUEST
    
    company = Company.query.get(id)
    if company is None:
        return jsonify({'msg': f"The company '{id}' does not exist"}), HTTPStatus.BAD_REQUEST
    
    if company.linkedIn is None:
        return jsonify({'msg': "The linkedin url is not set"}), HTTPStatus.BAD_REQUEST
    
    driver = get_driver(current_user.id)
    try:
        comp = driver.company(company.linkedIn)
        comp.scrape()
        return jsonify({'data': comp.to_dict()}), HTTPStatus.OK
    except:
        return jsonify({'msg': "Page parging error happened"}), HTTPStatus.UNPROCESSABLE_ENTITY
        

@blueprint.route('/login', methods = ['GET'])
@jwt_required()
def linkedin_login():
    driver = get_driver(current_user.id)
    if driver is None:
        return jsonify({'msg': "No possible to make driver for this user"}), HTTPStatus.BAD_REQUEST
    
    account = User.query.get(current_user.id)
    if account is None:
        return jsonify({'msg': "User does not have an account"}), HTTPStatus.BAD_REQUEST
    
    
    if len(account.linkedin_username) == 0 or len(account.linkedin_password) == 0:
        return jsonify({'msg': "Account information is missing"}), HTTPStatus.BAD_REQUEST
          
    try:
        driver.login(account.linkedin_username, account.linkedin_password)
        return jsonify({'data': "Login successful"}), HTTPStatus.OK
    except:
        return jsonify({'html': driver.pageSource()}), HTTPStatus.UNPROCESSABLE_ENTITY


@blueprint.route('/login/verify', methods = ['POST'])
@jwt_required()
def linkedin_login_verify():
    driver = get_driver(current_user.id)
    if driver is None:
        return jsonify({'msg': "No possible to make driver for this user"}), HTTPStatus.BAD_REQUEST
    
    pin = request.json.get('pin', None)
    if pin is None:
        return jsonify({'msg': "Pin not available"}), HTTPStatus.BAD_REQUEST
   
    try:
        driver.verify_login(pin)
        return jsonify({'data': "Login successful"}), HTTPStatus.OK
    except:
        return jsonify({'html': driver.pageSource()}), HTTPStatus.UNPROCESSABLE_ENTITY