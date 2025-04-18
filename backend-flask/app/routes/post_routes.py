from flask import Blueprint
from app.controllers.post_controller import create_post, get_posts, delete_post, update_post_description

post_bp = Blueprint('post', __name__)

@post_bp.route('/posts', methods=['POST'])
def add_post():
    return create_post()

@post_bp.route('/posts', methods=['GET'])
def fetch_posts():
    return get_posts()

@post_bp.route('/posts/<post_id>', methods=['DELETE'])
def remove_post(post_id):
    return delete_post(post_id)

@post_bp.route('/posts/<post_id>', methods=['PUT'])
def update_description(post_id):
    return update_post_description(post_id)
