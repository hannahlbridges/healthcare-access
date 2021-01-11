from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello world!"
    
@app.route('/api/tasks-postgres')
def getTasksPostgres():
    tasks = db.session.query(Task)
    data = []
    for task in tasks:
        item = {
            'id': task.id,
            'description': task.description
        }
        data.append(item)
    return jsonify(data)






if __name__ == '__main__':
    app.run(debug=True)