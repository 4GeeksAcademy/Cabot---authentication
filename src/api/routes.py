"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        return jsonify({"msg": "Bad email or password"}), 400
    user = User.query.filter_by(email = email, password = password).first()
    if user is None:
        return jsonify({"msg": "User doesn't exist"}), 404
    if user.password != password:
        return jsonify({"msg": "Incorrect Password"}), 401
    

    access_token = create_access_token(identity=email)
    response_body = {
        "message": "Here is your token, welcome!", "token":access_token
    }
    return jsonify(response_body), 200

#this route requires a token from the user
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    response_body = {
        "message": "You have access!", "logged_in_as":current_user
    }
    return jsonify(response_body), 200


@api.route('/signup', methods = ['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        return jsonify({"msg": "Bad email or password"}), 400
    user = User.query.filter_by(email = email).first()
    if user:
        return jsonify({"msg": "Account with that email already exists"}), 409
    user = User(email = email, password = password, is_active = True)
    db.session.add(user)
    db.session.commit()
    response_body = {
        "alert": "Congrats, new account - words."
    }
    return jsonify(response_body), 201

#@api.route()