from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///notepad.sqlite')

db = SQLAlchemy(app)

app = Flask(__name__)

@app.route('/')
def index():
    render_template('index.html')

@app.route('/data')
def data():
    session = Session(engine)

if __name__ == '__main__':
    app.run(debug=True)