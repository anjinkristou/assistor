from flask import request, abort, jsonify, url_for
from flask_jwt_extended import create_access_token
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from . import auth_bp
from api.models import User
from api import db

@auth_bp.route('/register', methods = ['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    email = request.json.get('email', None)
    firstname = request.json.get('firstname', None)
    lastname = request.json.get('lastname', None)
    
    if username is None or password is None:
        abort(400) # missing arguments
    if User.query.filter_by(username = username).first() is not None:
        abort(400) # existing user
    user = User(
        username = username,
        email = email,
        firstname = firstname,
        lastname = lastname
    )
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registred successfuly"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(username=username).one_or_none()
    if not user or not user.verify_password(password):
        return jsonify(message="Wrong username or password"), 401

    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user)
    return jsonify(token=access_token)

@auth_bp.route("/user", methods=["GET"])
@jwt_required()
def user():
    # We can now access our sqlalchemy User object via `current_user`.
    return jsonify(
        id=current_user.id,
        fullName=current_user.fullname(),
        avatar=current_user.gravatar(),
    )