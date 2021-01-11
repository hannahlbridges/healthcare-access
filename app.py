from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///notepad.sqlite')

db = SQLAlchemy(app)



@app.route('/')
def index():
    render_template('index.html')
    
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