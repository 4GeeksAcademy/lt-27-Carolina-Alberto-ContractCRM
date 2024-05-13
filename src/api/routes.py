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

    return jsonify(response_body), 200


@api.route('/users', methods=['GET'])
def getAllUsers():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    return jsonify(users), 200


@api.route('/users', methods=['POST'])
def createUser():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

@api.route('/users/<int:user_id>', methods=['GET'])
def getUser(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    return jsonify(user.serialize()), 200

@api.route('/users/<int:user_id>', methods=['PUT'])
def updateUser(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)

    data = request.get_json()
    user.name = data['name']
    user.last_name = data['last_name']
    user.email = data['email']
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/users/<int:user_id>', methods=['DELETE'])
def deleteUser(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200


@api.route('/roles', methods=['GET'])
def get_roles():
    all_roles = Role.query.all()
    results = list(map(lambda elemento: elemento.serialize(), all_roles))
    return jsonify(results), 200



@api.route('/roles/<int:role_id>', methods=['PUT'])
def update_role(role_id):

    get_role_to_update = Role.query.get(role_id)
    print (get_role_to_update)

    if get_role_to_update is None:
        return jsonify({"message": "The role doesn't exist"}), 400
        
    else:  
        role_data = request.get_json()
        get_role_to_update.name = role_data ["name"]
        db.session.commit()
        return jsonify(get_role_to_update.serialize()), 200
    



@api.route('/roles', methods=['POST'])
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


        
@api.route('/roles/<int:role_id>', methods=['DELETE'])
def delete_one_role(role_id):
    role_to_delete = Role.query.get(role_id)
    
    if role_to_delete:
        db.session.delete(role_to_delete)
        db.session.commit()
        return jsonify({"msg": "role deleted succesfull"}), 200
    else:
        return jsonify({"msg": "role doesn't exist"}), 400
    
    
@api.route('/roles/<int:role_id>', methods=['GET'])
def get_one_role(role_id):
    one_role = Role.query.get(role_id)
    if one_role:
        return jsonify(one_role.serialize()), 200
    else:
        return jsonify({"msg": "ROLE doesn't exist"}), 400




