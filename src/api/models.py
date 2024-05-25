from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship, declarative_base

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    isActive = db.Column(db.Boolean(), nullable=False)
    # user_role = relationship(User_Role)

    def __repr__(self):
        return f'<User: {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email
            # do not serialize the password, its a security breach
        }
    

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    

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
    status = db.Column(db.String(120), nullable=False)
    supplier_name = db.Column(db.String(120), nullable=False)
    software_name = db.Column(db.String(120), nullable=False)
    value = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(120), nullable=False)
    previous_contract_id = db.Column(db.Integer, db.ForeignKey('contract.id'))
    contract_type = db.Column(db.String(120), nullable=True)
    contract_description = db.Column(db.Text, nullable=True)
    effective_date = db.Column(db.Date, nullable=True)
    expiration_date = db.Column(db.Date, nullable=True)
    contract_term = db.Column(db.Integer, nullable=True)
    business_unit = db.Column(db.String(120), nullable=True)
    notice_period = db.Column(db.Integer, nullable=True)
    budget_owner = db.Column(db.String(120), nullable=True)
    finance_approver = db.Column(db.String(120), nullable=True)
    cost_centers = db.Column(db.String(120), nullable=True)
    supplier_poc = db.Column(db.String(120), nullable=True)
    business_unit_poc = db.Column(db.String(120), nullable=True)
    attachments = db.Column(db.String(120), nullable=True)

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
            "previous_contract_id": self.previous_contract_id,
            "contract_type": self.contract_type,
            "contract_description": self.contract_description,
            "effective_date": self.effective_date,
            "expiration_date": self.expiration_date,
            "contract_term": self.contract_term,
            "business_unit": self.business_unit,
            "notice_period": self.notice_period,
            "budget_owner": self.budget_owner,
            "finance_approver": self.finance_approver,
            "cost_centers": self.cost_centers,
            "supplier_poc": self.supplier_poc,
            "business_unit_poc": self.business_unit_poc,
            "attachments": self.attachments,
        }

class User_Contract(db.Model):

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)
    contract_id = Column(Integer, ForeignKey('contract.id'))
    contract = relationship(Contract)
    update_date = db.Column(db.Date, nullable=False)
    original_state = db.Column(db.String(120), nullable=False)
    new_state = db.Column(db.String(120), nullable=False)
    comments= db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<User_Contract {self.id}>'
      
    def serialize(self):
        return {
          "id": self.id,
          "user_id": self.user_id,
          "contract_id": self.contract_id,
          "update_date": self.update_date,
          "original_state": self.original_state,
          "new_state": self.new_state,
          "comments": self.comments,
          "name": self.user.name,
          "last_name": self.user.last_name,
        }