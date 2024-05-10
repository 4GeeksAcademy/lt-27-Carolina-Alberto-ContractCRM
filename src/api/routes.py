"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Role
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    print (request.json.get("message"))
    print (response_body)
    return jsonify(response_body), 200





@api.route('/role', methods=['GET'])
def get_roles():
    all_roles = Role.query.all()
    results = list(map(lambda elemento: elemento.serialize(), all_roles))
    return jsonify(results), 200





@api.route('/role', methods=['POST'])
def add_role():
    
    new_role_name = request.json.get('name')
    existing_role = Role.query.filter_by(name=new_role_name).first()
    print (existing_role)
    if existing_role:
        return jsonify({"message": "The role already exists"}), 400
    else:
        new_role = Role(name=new_role_name)
        db.session.add(new_role)
        db.session.commit()
        print (new_role)
        return jsonify({"message": "Role created"}), 200



        
@api.route('/role/<int:role_id>', methods=['DELETE'])
def delete_one_role(role_id):
    role_to_delete = Role.query.get(role_id)
    
    if role_to_delete:
        db.session.delete(role_to_delete)
        db.session.commit()
        return jsonify({"msg": "role deleted succesfull"}), 200
    else:
        return jsonify({"msg": "role doesn't exist"}), 400


    