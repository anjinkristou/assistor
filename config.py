# -*- encoding: utf-8 -*-
import os
from dotenv import load_dotenv

load_dotenv()

class Config(object):

    CSRF_ENABLED = True
    
    # Set up the App SECRET_KEY
    SECRET_KEY = os.environ.get("SECRET_KEY")

    # This will create a file in <app> FOLDER
    uri = os.environ.get("DATABASE_URL")  # or other relevant config var
    if uri.startswith("postgres://"):
        uri = uri.replace("postgres://", "postgresql://", 1)
    SQLALCHEMY_DATABASE_URI = uri
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    
    MSEARCH_INDEX_NAME = 'msearch'
    # # simple,whoosh,elaticsearch, default is simple
    # MSEARCH_BACKEND = 'whoosh'
    # # table's primary key if you don't like to use id, or set __msearch_primary_key__ for special model
    MSEARCH_PRIMARY_KEY = 'id'
    # # auto create or update index
    MSEARCH_ENABLE = True

class ProductionConfig(Config):
    DEBUG = False

    # Security
    SESSION_COOKIE_HTTPONLY  = True
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_DURATION = 3600

class DebugConfig(Config):
    DEBUG = True

# Load all possible configurations
config_dict = {
    'Production': ProductionConfig,
    'Debug'     : DebugConfig
}
