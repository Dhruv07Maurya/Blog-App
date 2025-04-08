from flask import Blueprint
from app.controllers.auth_controller import signup_user, login_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    return signup_user()  # No need to pass `request`

@auth_bp.route('/login', methods=['POST'])
def login():
    return login_user()  # No need to pass `request`
