# -*- encoding: utf-8 -*-
from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from hashlib import md5

from api import db, jwt, ma
from api.mixins import CRUDMixin

class User(db.Model, CRUDMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    password_hash = db.Column(db.String)
    
    # Relationships
    
    def __repr__(self):
        return str(self.username)
    
    def fullname(self):
        return f"{self.first_name} {self.last_name}"

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


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        
    id = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()

user_schema = UserSchema()
users_schema = UserSchema(many=True)