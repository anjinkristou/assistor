from importlib import import_module

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
api = Api()
jwt = JWTManager()
search = Search()

def init_plugins(app):
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    search.init_app(app)
    
    for module_name in (
            'company', 
            'company_note', 
            'user', 
            'contact', 
            'tag', 
            'contact_note', 
            'task', 
            'deal', 
            'deal_note',
            'product',
            'product_note',
            'product_property',
            'country'
        ):
        module = import_module(f'api.{module_name}.routes')
        module.register_api(api)
    
    
    api.init_app(app)
    

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
            ):
            module = import_module(f'api.{module_name}.routes')
            app.register_blueprint(module.blueprint)
            
    return app