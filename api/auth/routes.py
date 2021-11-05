from flask import request, abort, jsonify, url_for
from flask_jwt_extended import create_access_token
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from http import HTTPStatus

from flask import Blueprint

blueprint = Blueprint('auth', __name__, url_prefix='/auth')
from api.user.models import User
from api import db

@blueprint.route('/register', methods = ['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    email = request.json.get('email', None)
    first_name = request.json.get('first_name', None)
    last_name = request.json.get('last_name', None)
    
    if username is None or password is None:
        jsonify({"message": "No user name or password"}), 400
    if User.query.filter_by(username = username).first() is not None:
        jsonify({"message": "User already exists"}), 400
        
    user = User(
        username = username,
        email = email,
        first_name = first_name,
        last_name = last_name
    )
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registred successfuly"}), HTTPStatus.CREATED


@blueprint.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(username=username).one_or_none()
    if not user or not user.verify_password(password):
        return jsonify(message="Wrong username or password"), 401

    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user)
    return jsonify(token=access_token), HTTPStatus.OK


@blueprint.route("/user", methods=["GET"])
@jwt_required()
def user():
    # We can now access our sqlalchemy User object via `current_user`.
    return jsonify(
        id=current_user.id,
        fullName=current_user.fullname(),
        avatar=current_user.gravatar(),
    ), HTTPStatus.OK