"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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
