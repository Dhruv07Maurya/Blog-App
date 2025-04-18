from flask import jsonify, request, current_app
from bson.objectid import ObjectId
import cloudinary.uploader  # ✅ Cloudinary upload
import cloudinary.exceptions

def create_post():
    db = current_app.mongo

    # Get form fields
    title = request.form.get("title")
    description = request.form.get("description")
    image_file = request.files.get("image")

    # ✅ Validate fields
    if not title or not description or not image_file:
        return jsonify({"error": "Missing fields"}), 400

    try:
        # ✅ Upload image to Cloudinary
        upload_result = cloudinary.uploader.upload(image_file, folder="webx_posts")

        # ✅ Extract secure URL from Cloudinary response
        image_url = upload_result.get("secure_url")

        if not image_url:
            raise ValueError("Image upload failed")

    except cloudinary.exceptions.Error as e:
        return jsonify({"error": f"Cloudinary upload failed: {str(e)}"}), 500

    # ✅ Create the post with image URL
    post = {
        "title": title,
        "description": description,
        "image": image_url  # Store the Cloudinary URL
    }

    result = db.posts.insert_one(post)
    return jsonify({"message": "Post created", "id": str(result.inserted_id)}), 201


def get_posts():
    db = current_app.mongo
    posts = list(db.posts.find({}, {"title": 1, "description": 1, "image": 1}))

    for post in posts:
        post["_id"] = str(post["_id"])

    return jsonify(posts), 200


def delete_post(post_id):
    db = current_app.mongo
    try:
        result = db.posts.delete_one({"_id": ObjectId(post_id)})
    except:
        return jsonify({"error": "Invalid post ID format"}), 400

    if result.deleted_count:
        return jsonify({"message": "Post deleted"}), 200
    return jsonify({"error": "Post not found"}), 404


def update_post_description(post_id):
    db = current_app.mongo
    data = request.get_json()

    new_description = data.get("description")

    if not new_description:
        return jsonify({"error": "Description is required"}), 400

    try:
        result = db.posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$set": {"description": new_description}}
        )
    except:
        return jsonify({"error": "Invalid post ID format"}), 400

    if result.matched_count == 0:
        return jsonify({"error": "Post not found"}), 404

    return jsonify({"message": "Description updated"}), 200