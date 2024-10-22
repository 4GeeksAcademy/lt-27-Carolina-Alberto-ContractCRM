"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Role, Contract, User_Role, User_Contract
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from urllib.request import Request, urlopen
import json



api = Blueprint('api', __name__)
CORS(api)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {"message": 
    "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request",}

    return jsonify(response_body), 200

# ******************************************************************* Login *************************************************************
@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    user = User.query.filter_by(email=email).first()
    
    if not user or not user.password == password :
        return jsonify({"msg": "Bad username or password"}), 401
    else:
        user_roles = User_Role.query.filter_by(user_id=user.id).all()
        results = [user_role.role.name for user_role in user_roles]
        access_token = create_access_token(identity=email)
        user_data = user.serialize()
        user_data["roles"] = results
        return jsonify(jwt=access_token, user=user_data), 200

# ************************************************************** signup ******************************************************************

def newrole(user_id,role_id):
    user_role = User_Role(user_id=user_id, role_id=role_id)
    db.session.add(user_role)

    db.session.commit()

@api.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    name = data["name"]
    last_name = data["last_name"]

    roles= data["roles"]

    user = User.query.filter_by(email=email).first()
    
    if user:
        return jsonify({"msg": "User already exists"}), 400
    else:
        new_user = User(email=email, password=password, name=name, last_name=last_name)
        db.session.add(new_user)
        db.session.commit()

        for role in roles:
            newrole(new_user.id, data["role_id"])
        access_token = create_access_token(identity=email)
        return jsonify(jwt = access_token, user = new_user.serialize()), 200


        #         ), 2    # *********************************************************** ROUTES FOR USERS *************************************************************

# GET all users
@api.route('/users', methods=['GET'])

def getAllUsers():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    return jsonify(users), 200

# Create a new user
@api.route('/users', methods=['POST'])

def createUser():
    data = request.get_json()
    new_user = User(name = data['name'], last_name = data['last_name'], email = data['email'], password = data['password'], isActive = True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

# GET a single user
@api.route('/users/<int:user_id>', methods=['GET'])
def getUser(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    return jsonify(user.serialize()), 200

# Update a user
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

# Delete a user
@api.route('/users/<int:user_id>', methods=['DELETE'])
def deleteUser(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200

# **************************************************************** ROUTES FOR ROLES ********************************************************

# GET all roles
@api.route('/roles', methods=['GET'])
def get_roles():
    all_roles = Role.query.all()
    results = list(map(lambda elemento: elemento.serialize(), all_roles))
    return jsonify(results), 200


# Update a role
@api.route('/roles/<int:role_id>', methods=['PUT'])
def update_role(role_id):

    get_role_to_update = Role.query.get(role_id)
    print (get_role_to_update)

    if get_role_to_update is None:
        return jsonify({"message": "The role doesn't exist"}), 400
        
    else:  
        role_data = request.get_json()
        print (role_data)
        get_role_to_update.name = role_data ["name"]
        db.session.commit()
        return jsonify(get_role_to_update.serialize()), 200
    


# Create a new role
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


# Delete a role
@api.route('/roles/<int:role_id>', methods=['DELETE'])
def delete_one_role(role_id):
    role_to_delete = Role.query.get(role_id)
    
    if role_to_delete:
        db.session.delete(role_to_delete)
        db.session.commit()
        return jsonify({"msg": "role deleted succesfull"}), 200
    else:
        return jsonify({"msg": "role doesn't exist"}), 400
    
    
# GET one role
@api.route('/roles/<int:role_id>', methods=['GET'])
def get_one_role(role_id):
    one_role = Role.query.get(role_id)
    if one_role:
        return jsonify(one_role.serialize()), 200
    else:
        return jsonify({"msg": "ROLE doesn't exist"}), 400
    
# ********************************************************* ROUTES FOR CONTRACTS **********************************************************

# GET all contracts

# @api.route('/contracts', methods=['GET'])
# def get_contracts():
#     all_contracts = Contract.query.all()
#     print(all_contracts)
#     results = [contract.serialize() for contract in all_contracts]
#     return jsonify(results), 200

@api.route('/contracts', methods=['GET'])
def get_contracts():
    all_contracts = Contract.query.all()
    print(all_contracts)
    for contract in all_contracts:
        if contract.currency == "USD":
            exchange_rates = get_exchange_rates("USD")
            contract.value_usd = contract.value
            contract.value_eur = contract.value * exchange_rates.get("EUR", 1.0)
            contract.value_jpy = contract.value * exchange_rates.get("JPY", 1.0)
        elif contract.currency == "EUR":
            exchange_rates = get_exchange_rates("EUR")
            contract.value_eur = contract.value
            contract.value_jpy = contract.value * exchange_rates.get("JPY", 1.0)
            contract.value_usd = contract.value * exchange_rates.get("USD", 1.0)
        elif contract.currency == "JPY":
            exchange_rates = get_exchange_rates("JPY")
            contract.value_jpy = contract.value
            contract.value_eur = contract.value * exchange_rates.get("EUR", 1.0)
            contract.value_usd = contract.value * exchange_rates.get("USD", 1.0)

    results = [contract.serialize() for contract in all_contracts]
    return results


def get_exchange_rates(base_currency = "USD"):
    url = f"https://api.currencyapi.com/v3/latest?apikey=fca_live_k94eblhrGQeSI6DYyNJxooCT2n94CxHfBWPQeuHd&base_currency={base_currency}"
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urlopen(req).read()
        data = json.loads(response)
        return data.get("data", {}).get("rates", {})
    except Exception as e:
        print(f"Error fetching exchange rates: {e}")
        return {}



@api.route('/contracts_by_bu', methods=['GET'])
def get_contracts_by_bu():
    all_contracts_by_bu = Contract.query.all()
   
    bus = {
        "Accounting":0, "HR":0, "IT":0, "Marketing":0, "Sales":0, "Supply_Chain":0
    }

    for contract in all_contracts_by_bu:
        if contract.business_unit == "Accounting":
            bus ["Accounting"] += 1
        if contract.business_unit == "HR":
            bus ["HR"] += 1
        if contract.business_unit == "IT":
            bus ["IT"] += 1
        if contract.business_unit == "Marketing":
            bus ["Marketing"] += 1
        if contract.business_unit == "Sales":
            bus ["Sales"] += 1
        if contract.business_unit == "Supply_Chain":
            bus ["Supply_Chain"] += 1   

    return jsonify(bus)



@api.route('/contracts_by_type', methods=['GET'])
def get_contracts_by_type():
    all_contracts_by_type = Contract.query.all()
   
    type = {
        "Software":0, "Professional_Services":0, "Storage":0, "Non_disclosure_agreement":0, "Leases":0, "Networking":0,
    }

    for contract in all_contracts_by_type:
        if contract.contract_type == "Software":
            type ["Software"] += 1
        if contract.contract_type == "Professional_Services":
            type ["Professional_Services"] += 1
        if contract.contract_type == "Storage":
            type ["Storage"] += 1
        if contract.contract_type == "Non_disclosure_agreement":
            type ["Non_disclosure_agreement"] += 1
        if contract.contract_type == "Leases":
            type ["Leases"] += 1
        if contract.contract_type == "Networking":
            type ["Networking"] += 1
            

    return jsonify(type)


# @api.route('/contracts_by_status', methods=['GET'])
# def get_contracts_by_status():
#     all_contracts_by_status = Contract.query.all()
   
#     status = {
#         "Approvals_workflow_not_started":0, "Pending_Manager_approval":0, "Pending_Finanace_approval":0, "Pending_Budget_Owner_approval":0, "Pending_Security_approval":0, "Pending_Legal_approval":0, "Active":0,
#     }

#     for contract in all_contracts_by_status:
#         if contract.status == "Approvals_workflow_not_started":
#             type ["Approvals_workflow_not_started"] += 1
#         if contract.status == "Pending_Manager_approval":
#             type ["Pending_Manager_approval"] += 1
#         if contract.status == "Pending_Finanace_approval":
#             type ["Pending_Finanace_approval"] += 1
#         if contract.status == "Pending_Budget_Owner_approval":
#             type ["Pending_Budget_Owner_approval"] += 1
#         if contract.status == "Pending_Security_approval":
#             type ["Pending_Security_approval"] += 1
#         if contract.status == "Pending_Legal_approval":
#             type ["Pending_Legal_approval"] += 1
#         if contract.status == "Active":
#             type ["Active"] += 1
            

#     return jsonify(status)



# GET one contract
# @api.route('/contracts/<int:contract_id>', methods=['GET'])
# def get_one_contract(contract_id):
#     contract = Contract.query.get(contract_id)
#     if contract:
#         return jsonify(contract.serialize()), 200
#     else:
#         return jsonify({"msg": "Contract doesn't exist"}), 400
    
@api.route('/contracts/<int:contract_id>', methods=['GET'])
def get_one_contract(contract_id):
    exchange_rates = get_exchange_rates()
    contract = Contract.query.get(contract_id)
    if contract:
        contract.value_eur = contract.value * exchange_rates.get("EUR", 1.0)
        contract.value_jpy = contract.value * exchange_rates.get("JPY", 1.0)
        return jsonify(contract.serialize()), 200
    else:
        return jsonify({"msg": "Contract doesn't exist"}), 400




# Create a new contract:
@api.route('/contracts', methods=['POST'])
def create_contract():
    data = request.get_json()
    new_contract = Contract(**data)
    db.session.add(new_contract)
    db.session.commit()
    return jsonify(new_contract.serialize()), 200



# Update a contract
@api.route('/contracts/<int:contract_id>', methods=['PUT'])
def update_contract(contract_id):
    data = request.get_json()
    contract = Contract.query.get(contract_id)
    if contract:
        for key, value in data.items():
            setattr(contract, key, value)
        db.session.commit()
        return jsonify(contract.serialize()), 200
    else:
        return jsonify({"msg": "Contract doesn't exist"}), 400
    
@api.route('/contracts/<int:contract_id>', methods=['DELETE'])
def delete_contract(contract_id):
    contract = Contract.query.get(contract_id)
    if contract:
        db.session.delete(contract)
        db.session.commit()
        return jsonify({"msg": "Contract deleted successfully"}), 200
    else:
        return jsonify({"msg": "Contract doesn't exist"}), 400



  # ********************************************************* ROUTES FOR USER_ROLE ****************************************************************


#@api.route('/user_role/<int:user_role_id>', methods=['GET'])
def get_all_roles_by_user(user_role_id):
    user_roles = User_Role.query.filter_by(id=user_role_id).all()
    
    if user_roles:
        return jsonify([user_role.serialize() for user_role in user_roles]), 200
        
    else:
        return jsonify({"msg": "User & Role do not exist"}), 400

@api.route('/user_role', methods=['GET'])
def get_users_roles():
    all_users_roles = User_Role.query.all()
    results = list(map(lambda elemento: elemento.serialize(), all_users_roles))
    return jsonify(results), 200



@api.route('/user_role', methods=['POST'])
def create_user_role():
    data = request.get_json()
    add_user_role = User_Role(user_id=data["user_id"], role_id=data["role_id"])
    db.session.add(add_user_role)
    db.session.commit()
    return jsonify(add_user_role.serialize()), 200


@api.route('/user_role/<int:user_role_id>', methods=['DELETE'])
def delete_user_role(user_role_id):
    
    user_role_to_delete = User_Role.query.get(user_role_id)
    
    if user_role_to_delete:
        db.session.delete(user_role_to_delete)
        db.session.commit()
        return jsonify({"msg": "User and Role deleted succesfull"}), 200
    else:
        return jsonify({"msg": "User and Role do not exist"}), 400


@api.route('/user_role/<int:user_role_id>', methods=['PUT'])
def update_user_role(user_role_id):

    get_user_role_to_update = User_Role.query.get(user_role_id)
    print (get_user_role_to_update)

    if get_user_role_to_update is None:
        return jsonify({"message": "The User_Role doesn't exist"}), 400
        
    else:  
        user_role_data = request.get_json()
        print (user_role_data)
        get_user_role_to_update.user_id = user_role_data ["user_id"]
        get_user_role_to_update.role_id = user_role_data ["role_id"]
        db.session.commit()
    return jsonify(get_user_role_to_update.serialize()), 200



# ************************************************************ ROUTES FOR USER_CONTRACT **********************************************************

  
@api.route('/user_contract', methods=['GET'])
def get_users_contracts():
    all_users_contracts = User_Contract.query.order_by(User_Contract.contract_id).all()
    results = list(map(lambda elemento: elemento.serialize(), all_users_contracts))
    return jsonify(results), 200

@api.route('/workflow', methods=['GET'])
def last_status():
    results=list(get_contracts())
    #print(results)
    statusList = []
    for contract in results:
        last_status = User_Contract.query.filter_by(contract_id=contract['id']).order_by(User_Contract.id.desc()).first()
        if last_status:
            statusList.append({"contract": contract, "data": last_status.serialize()})
        else:
            statusList.append({"contract": contract, "404": contract['id']})
    
    return jsonify(statusList), 200

@api.route('/workflow/<int:contract_id>', methods=['GET'])
def workflow(contract_id):

    contracts = User_Contract.query.filter_by(contract_id=contract_id).order_by(User_Contract.id.desc()).all()
    results = list(map(lambda elemento: elemento.serialize(), contracts))
    if contracts:
        return jsonify(results), 200
    else:
        return jsonify({"msg": "Contract status hasn't been modified by the user"}), 400
    
@api.route('/user_contract/<int:user_contract_id>', methods=['GET'])
def get_one_user_contract(user_contract_id):
    one_user_contract = User_Contract.query.filter_by(id=user_contract_id).first()
    if one_user_contract:
        return jsonify(one_user_contract.serialize()), 200
    else:
        return jsonify({"msg": "Contract status hasn't been modified by the user"}), 400


@api.route('/user_contracts/<int:contract_id>', methods=['GET'])
def to_approve(contract_id):
    contracts_state = User_Contract.query.filter_by(contract_id=contract_id).order_by(User_Contract.id.desc()).first()

    if contracts_state:
        return jsonify(contracts_state.serialize()["next_"]), 200
    else:
        return False


def approvalHandler( approver , contract):
    response, status_code = get_all_roles_by_user(approver)
    permissions = response.json if status_code == 200 else []
    area_to_approve = to_approve(contract)
    
    if area_to_approve:
        print ("true1")
        if permissions.__contains__(area_to_approve) or any(permission['role'] == "operation" for permission in permissions):
            print ("true2")
            return True
        else:
            print ("false")
            return False
    elif any(permission['role'] == "operation" for permission in permissions):
        print ("true3")
        return "new"
    else:
        print ("error")
        return False
        

@api.route('/user_contract', methods=['POST'])
def create_user_contract():
    data = request.get_json()
    print(data)
    message = approvalHandler(data["user_id"], data["contract_id"])
    if message == True  :
        add_user_contract = User_Contract(
            user_id=data["user_id"], 
            contract_id=data["contract_id"], 
            update_date=data["update_date"], 
            original_state=data["original_state"],
            new_state=data["new_state"],
            comments=data["comments"]
            )
        db.session.add(add_user_contract)
        db.session.commit()

        return jsonify(add_user_contract.serialize()), 200
    elif message == "new":
        add_user_contract = User_Contract(
            user_id=data["user_id"], 
            contract_id=data["contract_id"], 
            update_date=data["update_date"], 
            original_state=1,
            new_state=2,
            comments=data["comments"]
            )
        db.session.add(add_user_contract)
        db.session.commit()

        return jsonify(add_user_contract.serialize()), 200
    else:
        return jsonify({"msg": "User doesn't have the permissions to approve this contract"}), 400
    return jsonify({"msg": message}), 200
    


@api.route('/user_contract/<int:user_contract_id>', methods=['DELETE'])
def delete_user_contract(user_contract_id):
    
    user_contract_to_delete = User_Contract.query.get(user_contract_id)
    
    if user_contract_to_delete:
        db.session.delete(user_contract_to_delete)
        db.session.commit()
        return jsonify({"msg": "Contract has been deleted succesfull by user"}), 200
    else:
        return jsonify({"msg": "User_Contract does not exist"}), 400


@api.route('/user_contract/<int:user_contract_id>', methods=['PUT'])
def update_user_contract(user_contract_id):

    get_user_contract_to_update = User_Contract.query.get(user_contract_id)
    print (get_user_contract_to_update)

    if get_user_contract_to_update is None:
        return jsonify({"message": "The User_Contract doesn't exist"}), 400
        
    else:  
        user_contract_data = request.get_json()
        print (user_contract_data)
        get_user_contract_to_update.user_id = user_contract_data ["user_id"]
        get_user_contract_to_update.contract_id = user_contract_data ["contract_id"]
        get_user_contract_to_update.update_date = user_contract_data ["update_date"]
        get_user_contract_to_update.original_state = user_contract_data ["original_state"]
        get_user_contract_to_update.new_state = user_contract_data ["new_state"]
        get_user_contract_to_update.comments = user_contract_data ["comments"]
        db.session.commit()
    return jsonify(get_user_contract_to_update.serialize()), 200