from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, Task

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Function to initialize the database
def initialize_database():
    with app.app_context():
        db.create_all()

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    if not data.get('title') or not data.get('due_date'):
        return jsonify({"error": "Title and due date are required"}), 400
    new_task = Task(
        title=data['title'],
        description=data.get('description'),
        due_date=data['due_date'],
        status=data.get('status', 'Pending')
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully", "task": new_task.id}), 201

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    result = [{"id": t.id, "title": t.title, "description": t.description, "due_date": t.due_date, "status": t.status} for t in tasks]
    return jsonify(result), 200

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.json
    task = Task.query.get(id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.due_date = data.get('due_date', task.due_date)
    task.status = data.get('status', task.status)
    db.session.commit()
    return jsonify({"message": "Task updated successfully"}), 200

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"}), 200

if __name__ == '__main__':
    initialize_database()  # Ensure the database is initialized before running the app
    app.run(debug=True)
