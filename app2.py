from flask import Flask, jsonify
from os import environ
import pandas as pd
import numpy as np
from flask_sqlalchemy import SQLAlchemy

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///notepad.sqlite')

engine = create_engine(environ.get(
    'DATABASE_URL', 'sqlite:///notepad.sqlite'))
Base = automap_base()
Base.prepare(engine, reflect =True)
db = SQLAlchemy(app)


@app.route('/')
def index():
    render_template('index.html')

@app.route('/data')
def data():
    session = Session(engine)

if __name__ == '__main__':
    app.run(debug=True)