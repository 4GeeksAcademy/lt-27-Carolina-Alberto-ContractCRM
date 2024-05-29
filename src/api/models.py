from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship, declarative_base

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(80))
    # user_role = relationship(User_Role)

    def __repr__(self):
        return f'<User: {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name
            # do not serialize the password, its a security breach
        }
    

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True)
    

    def __repr__(self):
        return f'<Role {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class User_Role(db.Model):

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)
    role_id = Column(Integer, ForeignKey('role.id'))
    role = relationship(Role)

    def __repr__(self):
        return f'<User_Role {self.id}>'
      
    def serialize(self):
        return {
          "id": self.id,
          "user_id": self.user_id,
          "role_id": self.role_id,
          "email": self.user.email,
          "role": self.role.name,
        }

    
    
class Contract(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(120))
    supplier_name = db.Column(db.String(120))
    software_name = db.Column(db.String(120))
    value = db.Column(db.Float)
    currency = db.Column(db.String(120))
    value_eur = db.Column(db.Integer)
    value_jpy = db.Column(db.Integer)
    contract_type = db.Column(db.String(120))
    contract_description = db.Column(db.Text)
    effective_date = db.Column(db.Date)
    expiration_date = db.Column(db.Date)
    contract_term = db.Column(db.Integer)
    business_unit = db.Column(db.String(120))
    notice_period = db.Column(db.Integer)
    cost_centers = db.Column(db.Integer)
    supplier_poc = db.Column(db.String(120))
    business_unit_poc = db.Column(db.String(120))


    def __repr__(self):
        return f'<Contract {self.id}>'
      
    def serialize(self):
        return {
            "id": self.id,
            "status": self.status,
            "supplier_name": self.supplier_name,
            "software_name": self.software_name,
            "value": self.value,
            "currency": self.currency,
            "value_eur": self.value_eur,
            "value_jpy": self.value_jpy,
            "contract_type": self.contract_type,
            "contract_description": self.contract_description,
            "effective_date": self.effective_date,
            "expiration_date": self.expiration_date,
            "contract_term": self.contract_term,
            "business_unit": self.business_unit,
            "notice_period": self.notice_period,
            "cost_centers": self.cost_centers,
            "supplier_poc": self.supplier_poc,
            "business_unit_poc": self.business_unit_poc,
            
        }

class User_Contract(db.Model):

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)
    contract_id = Column(Integer, ForeignKey('contract.id'))
    contract = relationship(Contract)
    update_date = db.Column(db.Date)
    original_state = db.Column(db.Integer, nullable=True)
    new_state = db.Column(db.Integer, nullable=True)
    comments= db.Column(db.String)

    def __repr__(self):
        return f'<User_Contract {self.id}>'
      
    def serialize(self):
        return {
            "id": self.id,
            "approver_user_id": self.user_id,
            "contract_id": self.contract_id,
            "software_name": self.contract.software_name,
            "value": self.contract.value,
            "eur": self.contract.value_eur,
            "jpy": self.contract.value_jpy,
            "currency": self.contract.currency,
            "contract_description": self.contract.contract_description,
            "effective_date": self.contract.effective_date,
            "expiration_date": self.contract.expiration_date,
            "business_unit": self.contract.business_unit,
            "update_date": self.update_date,
            "approval_area": self.original_state,
            "next_": self.new_state,
            "comments": self.comments,
            "name": self.user.name + " " + self.user.last_name,
            "approver": self.user.email,
        }