from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///notepad.sqlite')

db = SQLAlchemy(app)

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

class insurance_type_percent(db.Model):
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

class percent_eligible(db.Model):
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


#@app.route('/')
#def index():
#    render_template('index.html')
    
@app.route('/api/state-data-postgres')
def getstate_dataPostgres():
    State_Data = db.session.query(state_data)
    data = []
    for state in State_Data:
        item = {
            'state': state_data.State,
            'expansion_status': state_data.Expansion_Status,
            'date_expanded': state_data.Date_Added,
            'median_income': state_data.Median_Income,
            'state_spending': state_data.State_Spending,
            'local_spending': state_data.Local_Spending,
            'state_local_spending':state_data.State_and_Local_spending,
            'population': state_data.Population_Millions,
            'uninsured_2010': state_data.Uninsured_2010,
            'uninsured_2018': state_data.Uninsured_2018,
            'uninsured_2019': state_data.Uninsured_2019
        }
        data.append(item)
    return jsonify(data)






if __name__ == '__main__':
    app.run(debug=True)