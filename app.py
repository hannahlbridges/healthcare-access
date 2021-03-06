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


#medicareTB = base.classes.medicare
state_dataTB = base.classes.state_data
coverage_type_percentsTB = base.classes.coverage_type_percents
regionalTB = base.classes.regional
insurance_costTB = base.classes.insurance_cost
percent_employees_offTB = base.classes.percent_employees_off
percent_enrolled_eligibleTB = base.classes.percent_enrolled_eligible
percent_enrolled_offerTB = base.classes.percent_enrolled_offer
percent_self_insuredTB = base.classes.percent_self_insured
avg_single_contributionTB = base.classes.avg_single_contribution
avg_single_premiumTB = base.classes.avg_single_premium
avg_emp1_contributionTB = base.classes.avg_emp1_contribution
avg_emp1_premiumTB = base.classes.avg_emp1_premium
Avg_Family_Contribution = base.classes.avg_family_contribution
Avg_Family_Premium = base.classes.avg_family_premium

# ABC = base.classes.abc

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/HealthcareMaps')
def HealthcareMapsMaker():
    return render_template('HealthcareMaps.html')

@app.route('/choropleth')
def heat_maps():
    return render_template('choropleth.html')

@app.route('/collaborators')
def collaborators():
    return render_template('collaborators.html')

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching
session = Session(engine)
db = SQLAlchemy(app)

@app.route('/medicare')
def medicare():
    Medicare = session.query(medicareTB.state,medicareTB.avg_cost_stroke_2018,
    medicareTB.avg_cost_stroke_2013,medicareTB.avg_cost_ha_2018,
    medicareTB.avg_cost_ha_2013)
    data = []
    for a,b,c,d,e in Medicare:
        item = {
            'state': a,
            'stroke_2018': b,
            'stroke_2014': c,
            'ha_2018': d,
            'ha_2013': e
        }
        data.append(item)
    return jsonify(data)

@app.route('/state-data')
def state_data():
    State_Data = session.query(state_dataTB.state,state_dataTB.expansion_status,
    state_dataTB.date_added,state_dataTB.median_income,state_dataTB.state_spending,
    state_dataTB.local_spending,state_dataTB.state_and_local_spending,
    state_dataTB.population_millions,state_dataTB.uninsured_2010,
    state_dataTB.uninsured_2018,state_dataTB.uninsured_2019)
    data = []
    for a,b,c,d,e,f,g,h,i,j,k in State_Data:
        item = {
            'state': a,
            'expansion_status': b,
            'date_added': c,
            'median_income': d,
            'state_spending': e,
            'local_spending': f,
            'state_and_local_spending': g,
            'population_millions': h,
            'uninsured_2010': i,
            'uninsured_2018': j,
            'uninsured_2019': k
        }
        data.append(item)
    return jsonify(data)

@app.route('/coverage-type')
def coverage_type():
    Coverage_Type = session.query(coverage_type_percentsTB.employer,
    coverage_type_percentsTB.marketplace_private,coverage_type_percentsTB.medicaid,
    coverage_type_percentsTB.medicare,coverage_type_percentsTB.uninsured)
    data = []
    for a,b,c,d,e, in Coverage_Type:
        item = {
            'employer': a,
            'marketplace_private': b,
            'medicaid': c,
            'medicare': d,
            'uninsured': e
        }
        data.append(item)
    return jsonify(data)

@app.route('/regional')
def regional():
    Regional = session.query(regionalTB.state,regionalTB.region,
    regionalTB.percent_uninsured_under_65,regionalTB.percent_poor_health)
    data = []
    for a,b,c,d in Regional:
        item = {
            'state': a,
            'region': b,
            'uninsured': c,
            'poor_health': d
        }
        data.append(item)
    return jsonify(data)

@app.route('/insurance-cost')
def insurance_cost():
    icost = session.query(insurance_costTB.state_name,
    insurance_costTB.insurance_type,insurance_costTB.avg)
    data = []
    for a,b,c in icost:
        item = {
            'state': a,
            'type': b,
            'avg': c
        }
        data.append(item)
    return jsonify(data)

@app.route('/percent_employees_off')
def percent_employee_off():
    emp_off = session.query(percent_employees_offTB.state_name,
    percent_employees_offTB._2013,percent_employees_offTB._2014,
    percent_employees_offTB._2015,percent_employees_offTB._2016,
    percent_employees_offTB._2017,percent_employees_offTB._2018,
    percent_employees_offTB._2019)
    data = []
    for a,b,c,d,e,f,g,h in emp_off:
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

@app.route('/percent_enrolled_eligible')
def percent_enrolled_eligible():
    enrolled_eligible = session.query(percent_enrolled_eligibleTB.state_name,
    percent_enrolled_eligibleTB._2013,percent_enrolled_eligibleTB._2014,
    percent_enrolled_eligibleTB._2015,percent_enrolled_eligibleTB._2016,
    percent_enrolled_eligibleTB._2017,percent_enrolled_eligibleTB._2018,
    percent_enrolled_eligibleTB._2019)
    data = []
    for a,b,c,d,e,f,g,h in enrolled_eligible:
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

@app.route('/percent_enrolled_offer')
def percent_enrolled_offer():
    enrolled_offer = session.query(percent_enrolled_offerTB.state_name,
    percent_enrolled_offerTB._2013,percent_enrolled_offerTB._2014,
    percent_enrolled_offerTB._2015,percent_enrolled_offerTB._2016,
    percent_enrolled_offerTB._2017,percent_enrolled_offerTB._2018,
    percent_enrolled_offerTB._2019)
    data = []
    for a,b,c,d,e,f,g,h in enrolled_offer:
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

@app.route('/percent_self_insured')
def percent_self_insured():
    self_insured = session.query(percent_self_insuredTB.state_name,
    percent_self_insuredTB._2013,percent_self_insuredTB._2014,
    percent_self_insuredTB._2015,percent_self_insuredTB._2016,
    percent_self_insuredTB._2017,percent_self_insuredTB._2018,
    percent_self_insuredTB._2019)
    data = []
    for a,b,c,d,e,f,g,h in self_insured:
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

@app.route('/avg_single_contribution')
def avg_single_contribution():
    single_contribution = session.query(avg_single_contributionTB.state_name,
    avg_single_contributionTB._2013,avg_single_contributionTB._2014,
    avg_single_contributionTB._2015,avg_single_contributionTB._2016,
    avg_single_contributionTB._2017,avg_single_contributionTB._2018,
    avg_single_contributionTB._2019)
    data = []
    for a,b,c,d,e,f,g,h in single_contribution:
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

@app.route('/avg_single_premium')
def avg_single_premium():
    single_premium = session.query(avg_single_premiumTB.state_name,
    avg_single_premiumTB._2013,avg_single_premiumTB._2014,
    avg_single_premiumTB._2015,avg_single_premiumTB._2016,
    avg_single_premiumTB._2017,avg_single_premiumTB._2018,
    avg_single_premiumTB._2019)
    data = []
    for a,b,c,d,e,f,g,h in single_premium:
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

@app.route('/avg_emp1_contribution')
def avg_emp1_contribution():
    emp1_contribution = session.query(avg_emp1_contributionTB.state_name,
    avg_emp1_contributionTB._2013,avg_emp1_contributionTB._2014,
    avg_emp1_contributionTB._2015,avg_emp1_contributionTB._2016,
    avg_emp1_contributionTB._2017,avg_emp1_contributionTB._2018,
    avg_emp1_contributionTB._2019)
    data = []
    for a,b,c,d,e,f,g,h in emp1_contribution:
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

@app.route("/avg_emp1_premium")
def avg_emp1_premium():
    emp1_premium = session.query(avg_emp1_premiumTB.state_name,
    avg_emp1_premiumTB._2013,avg_emp1_premiumTB._2014,
    avg_emp1_premiumTB._2015,avg_emp1_premiumTB._2016,
    avg_emp1_premiumTB._2017,avg_emp1_premiumTB._2018,
    avg_emp1_premiumTB._2019)
    data = []
    for a,b,c,d,e,f,g,h in emp1_premium:
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

@app.route("/avg-family-contribution")
def avg_family_contribution():
    family_contribution = session.query(Avg_Family_Contribution.state_name,
    Avg_Family_Contribution._2013,Avg_Family_Contribution._2014,
    Avg_Family_Contribution._2015,Avg_Family_Contribution._2016,
    Avg_Family_Contribution._2017,Avg_Family_Contribution._2018,
    Avg_Family_Contribution._2019)
    data = []
    for a,b,c,d,e,f,g,h in family_contribution:
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

@app.route("/avg-family-premium")
def avg_family_premium():
    family_premium = session.query(Avg_Family_Premium.state_name,
    Avg_Family_Premium._2013,Avg_Family_Premium._2014,
    Avg_Family_Premium._2015,Avg_Family_Premium._2016,
    Avg_Family_Premium._2017,Avg_Family_Premium._2018,
    Avg_Family_Premium._2019)
    data = []
    for a,b,c,d,e,f,g,h in family_premium:
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