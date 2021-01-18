from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask import Flask
from flask import render_template 
from flask import jsonify
# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

connection_string = f'postgresql://utlwaavyjuxofx:2a4c69f3bd75609ebd38e1baa22d0c7401379461eeb4ccd1eb50ab45b9abe361@ec2-54-156-73-147.compute-1.amazonaws.com:5432/d6n2aueo5t3uht'

engine = create_engine(connection_string)

base = automap_base()
base.prepare(engine, reflect=True)
Avg_Family_Contribution = base.classes.avg_family_contribution

# ABC = base.classes.abc

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/choropleths')
def heat_maps():
    return render_template('choropleth.html')

@app.route('/collaborators')
def collaborators():
    return render_template('collaborators.html')

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching
session = Session(engine)
db = SQLAlchemy(app)

@app.route("/avg-family-contribution")
def mainpage():
    avg_c = session.query(Avg_Family_Contribution.state_name,Avg_Family_Contribution._2013,Avg_Family_Contribution._2014,Avg_Family_Contribution._2015,Avg_Family_Contribution._2016,Avg_Family_Contribution._2017,Avg_Family_Contribution._2018,Avg_Family_Contribution._2019)
    data = []
    for a,b,c,d,e,f,g,h in avg_c:
        item = {
            'state_name': a,
            '_2013': b,
            '_2014': c,
            '_2015': d,
            '_2016': e,
            '_2017': f,
            '_2018': g,
            '_2019': h
        }
        data.append(item)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
#     'DATABASE_URL', 'sqlite:///d6n2aueo5t3uht.sqlite')

# db = SQLAlchemy(app)



