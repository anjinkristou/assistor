import json
from flask import request, jsonify
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from http import HTTPStatus
from .connector.linkedin import Linkedin

from flask import Blueprint

blueprint = Blueprint('linkedin', __name__, url_prefix='/linkedin')
from app.api.company.models import Company
from app.api.user.models import User

linkedin_connectors = []

def find_driver(items, user_id):
    print(linkedin_connectors)
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
        account = User.query.get(user_id)
        if account:
            driver.login(account.linkedin_username, account.linkedin_password)
    return driver


@blueprint.route('/fetch-company', methods = ['GET'])
@jwt_required()
def fetch_company():
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
        

