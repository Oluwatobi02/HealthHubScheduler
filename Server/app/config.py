import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    REDIS_CONFIG = {
        'host': os.getenv('REDIS_HOST', 'localhost'),
        'port': 6379,
        'decode_responses': True,
    }
    MONGODB_SETTINGS = {
        'db': 'test',
        'host': os.getenv('MONGODB_URI', 'your_mongodb_cluster_uri'),
        'port': 27017,
    }
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')
