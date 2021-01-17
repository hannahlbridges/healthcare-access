from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///d6n2aueo5t3uht.sqlite')

db = SQLAlchemy(app)

class medicare(db.Model):
    state_name = db.Column(db.String(3), primary_key=True)
    avg_cost_stroke_2018 = db.Column(db.Float)
    avg_cost_stroke_2013 = db.Column(db.Float)
    avg_cost_ha_2018 = db.Column(db.Float)
    avg_cost_ha_2013 = db.Column(db.Float)

class regional(db.Model):
    state = db.Column(db.String(3), primary_key =True)
    region = db.Column(db.String(20))
    percent_uninsured_under_65 = db.Column(db.Float)
    percent_poor_health = db.Column(db.Float)

class state_data(db.Model):
    State = db.Column(db.String(50), primary_key =True)
    Expansion_Status = db.Column(db.Boolean)
    Date_Added = db.Column(db.DateTime)
    Median_Income = db.Column(db.Float)
    State_Spending = db.Column(db.Float)
    Local_Spending = db.Column(db.Float)
    State_and_Local_spending = db.Column(db.Float)
    Population_Millions = db.Column(db.Float)
    Uninsured_2010 = db.Column(db.Float)
    Uninsured_2018 = db.Column(db.Float)
    Uninsured_2019 = db.Column(db.Float)
    

class insurance_cost(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    insurance_type = db.Column(db.String)
    avg = db.Column(db.Float)

class coverage_type_percents(db.Model):
    State = db.Column(db.String(50), primary_key = True)
    Employer = db.Column(db.Float)
    Marketplace_Private = db.Column(db.Float)
    Medicaid = db.Column(db.Float)
    Medicare = db.Column(db.Float)
    Uninsured = db.Column(db.Float)

class medicare_avg_costs(db.Model):
    State = db.Column(db.String(50), primary_key = True)
    avg_cost_stroke_2018 = db.Column(db.Float)
    avg_cost_stroke_2013 = db.Column(db.Float)
    avg_cost_ha_2018 = db.Column(db.Float)
    avg_cost_ha_2013 = db.Column(db.Float)

class percent_employees_off(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    _2013 = db.Column(db.Float)
    _2014 = db.Column(db.Float)
    _2015 = db.Column(db.Float)
    _2016 = db.Column(db.Float)
    _2017 = db.Column(db.Float)
    _2018 = db.Column(db.Float)
    _2019 = db.Column(db.Float)

class percent_enrolled_eligible(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    _2013 = db.Column(db.Float)
    _2014 = db.Column(db.Float)
    _2015 = db.Column(db.Float)
    _2016 = db.Column(db.Float)
    _2017 = db.Column(db.Float)
    _2018 = db.Column(db.Float)
    _2019 = db.Column(db.Float)

class percent_enrolled_offer(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    _2013 = db.Column(db.Float)
    _2014 = db.Column(db.Float)
    _2015 = db.Column(db.Float)
    _2016 = db.Column(db.Float)
    _2017 = db.Column(db.Float)
    _2018 = db.Column(db.Float)
    _2019 = db.Column(db.Float)

class percent_self_insured(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    _2013 = db.Column(db.Float)
    _2014 = db.Column(db.Float)
    _2015 = db.Column(db.Float)
    _2016 = db.Column(db.Float)
    _2017 = db.Column(db.Float)
    _2018 = db.Column(db.Float)
    _2019 = db.Column(db.Float)

class avg_single_contribution(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    _2013 = db.Column(db.Float)
    _2014 = db.Column(db.Float)
    _2015 = db.Column(db.Float)
    _2016 = db.Column(db.Float)
    _2017 = db.Column(db.Float)
    _2018 = db.Column(db.Float)
    _2019 = db.Column(db.Float)

class avg_single_premium(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    _2013 = db.Column(db.Float)
    _2014 = db.Column(db.Float)
    _2015 = db.Column(db.Float)
    _2016 = db.Column(db.Float)
    _2017 = db.Column(db.Float)
    _2018 = db.Column(db.Float)
    _2019 = db.Column(db.Float)

class avg_emp1_contribution(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    _2013 = db.Column(db.Float)
    _2014 = db.Column(db.Float)
    _2015 = db.Column(db.Float)
    _2016 = db.Column(db.Float)
    _2017 = db.Column(db.Float)
    _2018 = db.Column(db.Float)
    _2019 = db.Column(db.Float)

class avg_emp1_premium(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    _2013 = db.Column(db.Float)
    _2014 = db.Column(db.Float)
    _2015 = db.Column(db.Float)
    _2016 = db.Column(db.Float)
    _2017 = db.Column(db.Float)
    _2018 = db.Column(db.Float)
    _2019 = db.Column(db.Float)

class avg_family_contribution(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    _2013 = db.Column(db.Float)
    _2014 = db.Column(db.Float)
    _2015 = db.Column(db.Float)
    _2016 = db.Column(db.Float)
    _2017 = db.Column(db.Float)
    _2018 = db.Column(db.Float)
    _2019 = db.Column(db.Float)

class avg_family_premium(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    _2013 = db.Column(db.Float)
    _2014 = db.Column(db.Float)
    _2015 = db.Column(db.Float)
    _2016 = db.Column(db.Float)
    _2017 = db.Column(db.Float)
    _2018 = db.Column(db.Float)
    _2019 = db.Column(db.Float)
   


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/choropleths')
def heat_maps():
    return render_template('choropleth.html')
    
@app.route('/api/state-data-postgres')
def getstate_dataPostgres():
    State_Data = db.session.query(state_data)
    data = []
    for state in State_Data:
        item = {
            'state': State_Data.State,
            'expansion_status': State_Data.Expansion_Status,
            'date_added': State_Data.Date_Added,
            'median_income': State_Data.Median_Income,
            'state_spending': State_Data.State_Spending,
            'local_spending': State_Data.Local_Spending,
            'state_and_local_spending':State_Data.State_and_Local_spending,
            'population_millions': State_Data.Population_Millions,
            'uninsured_2010': State_Data.Uninsured_2010,
            'uninsured_2018': State_Data.Uninsured_2018,
            'uninsured_2019': State_Data.Uninsured_2019
        }
        data.append(item)
    return jsonify(data)

@app.route('/api/coverage-type-postgres')
def getcoverage_typePostgres():
    Coverage_Type = db.session.query(coverage_type_percents)
    data = []
    for state in Coverage_Type:
        item = {
            'employer': Coverage_Type.Employer,
            'marketplace_private': Coverage_Type.Marketplace_Private,
            'medicaid': Coverage_Type.Medicaid,
            'medicare': Coverage_Type.Medicare,
            'uninsured': Coverage_Type.Uninsured
        }
        data.append(item)
    return jsonify(data)

@app.route('/State')
def dashboard():
    return render_template('webapp.html')

@app.route('State/<state_name>')
def dashboard(state_name):
     





if __name__ == '__main__':
    app.run(debug=True)