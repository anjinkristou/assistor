from .auth.routes import auth_bp
from .restful.routes import restful_bp

def register_blueprints(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(restful_bp)