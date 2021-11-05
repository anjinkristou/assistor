from api import db, ma
from api.mixins import CRUDMixin
from api.contact.models import Contact
from api.user.models import User

class Task(db.Model, CRUDMixin):

    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    text = db.Column(db.String)
    due_date = db.Column(db.String)
    
    # Foreign keys
    contact_id = db.Column(db.Integer, db.ForeignKey(Contact.id))
    sales_id = db.Column(db.Integer, db.ForeignKey(User.id))
    
    # Relationships
    contact = db.relationship('Contact', backref="tasks")
    sales = db.relationship('User', backref="tasks")
    

class TaskSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Task

    id = ma.auto_field()
    type = ma.auto_field()
    text = ma.auto_field()
    due_date = ma.auto_field()
    
    # Foreign keys
    contact_id = ma.auto_field()
    sales_id = ma.auto_field()
        

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)