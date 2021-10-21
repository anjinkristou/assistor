# -*- encoding: utf-8 -*-

from flask import Blueprint

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')