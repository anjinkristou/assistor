# -*- encoding: utf-8 -*-
from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from hashlib import md5

from api import db, jwt

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)
    password_hash = db.Column(db.String)
    
    def __repr__(self):
        return str(self.username)
    
    def fullname(self):
        return f"{self.firstname} {self.lastname}"

    def hash_password(self, password):
        self.password_hash = generate_password_hash(
            password,
            method='sha256'
        )

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def _gravatar_hash(self):
            return md5(self.email.lower().encode('utf-8')).hexdigest()

    def gravatar(self, size=32, default='wavatar', rating='g'):
        if request.is_secure:
            url = 'https://secure.gravatar.com/avatar'
        else:
            url = 'http://secure.gravatar.com/avatar'
        hash = self._gravatar_hash()
        return '{url}/{hash}?s={size}&d={default}&r={rating}'.format(
            url=url, hash=hash, size=size, default=default, rating=rating)


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()