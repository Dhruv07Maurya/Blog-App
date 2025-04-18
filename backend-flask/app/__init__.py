from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import cloudinary

# Load environment variables
load_dotenv()

# ✅ MongoDB Setup
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "WEBX_MINIPROJECT")

if not MONGO_URI:
    raise ValueError("❌ MONGO_URI not found in environment variables!")

client = MongoClient(MONGO_URI)
mongo = client[DB_NAME]

# ✅ Cloudinary Setup
CLOUDINARY_URL = os.getenv("CLOUDINARY_URL")

if CLOUDINARY_URL:
    try:
        cloudinary.config(cloudinary_url=CLOUDINARY_URL)
    except Exception as e:
        print(f"❌ Cloudinary configuration error: {e}")
else:
    print("❌ CLOUDINARY_URL not found in environment variables!")

def create_app():
    app = Flask(__name__)

    # ✅ Secret Key Setup
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "default_secret_key")

    # ✅ CORS Configuration (Allow frontend requests)
    CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})

    # Attach MongoDB to app
    app.mongo = mongo

    # ✅ Import and Register Routes
    from app.routes.auth_routes import auth_bp
    from app.routes.post_routes import post_bp

    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(post_bp, url_prefix='/api')

    return app
