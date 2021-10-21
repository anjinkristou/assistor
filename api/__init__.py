from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

# Globally accessible libraries
db = SQLAlchemy()
migrate = Migrate(render_as_batch=True)
api = Api()
jwt = JWTManager()

def init_plugins(app):
    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    jwt.init_app(app)
    

def create_app(config):
    """Initialize the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(config)

    # Initialize Plugins
    init_plugins(app)

    with app.app_context():
        # Include our Routes
        from .blueprints import register_blueprints
        register_blueprints(app)

        return app