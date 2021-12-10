from importlib import import_module
import os

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_msearch import Search

# Globally accessible libraries
db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate(render_as_batch=True)
resutful_api = Api()
jwt = JWTManager()
search = Search()

def init_plugins(app):
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    search.init_app(app)
    
    api_folder = './app/api'
    directory_contents = [ name for name in os.listdir(api_folder) if not name.startswith('__') and os.path.isdir(os.path.join(api_folder, name)) ]
    for module_name in directory_contents:
        module = import_module(f'app.api.{module_name}.routes')
        module.register_api(resutful_api)
    
    
    resutful_api.init_app(app)
    

def create_app(config):
    """Initialize the core application."""
    app = Flask(__name__, instance_relative_config=False, static_url_path='', static_folder='../build')
    app.config.from_object(config)
    
    @app.route("/", defaults={'path':''})
    def serve(path):
        return send_from_directory(app.static_folder,'index.html')

    # Initialize Plugins
    init_plugins(app)

    with app.app_context():
        # Include our Routes
        for module_name in (
                'auth', 
                'linkedin',
            ):
            module = import_module(f'app.{module_name}.routes')
            app.register_blueprint(module.blueprint)
            
    return app