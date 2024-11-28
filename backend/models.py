from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    due_date = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(10), default='Pending')  # 'Pending' or 'Completed'
