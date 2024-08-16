from .auth import auth_bp
from .appointments import appointments_bp
from .hcp import hcp_bp
from .patients import patients_bp

def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(appointments_bp, url_prefix='/appointments')
    app.register_blueprint(hcp_bp, url_prefix='/healthcareprofessionals')
    app.register_blueprint(patients_bp, url_prefix='/patients')