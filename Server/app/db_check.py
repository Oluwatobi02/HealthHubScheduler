# app/db_check.py
from app import create_app
from app.extensions import db

app = create_app()

with app.app_context():
    print("Database name:", db.connection.get_database().name)
