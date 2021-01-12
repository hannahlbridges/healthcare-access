from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///notepad.sqlite')

db = SQLAlchemy(app)

class regional(db.Model):
    state = db.Column(db.String(3), primary_key =True)
    region = db.Column(db.String(20))
    percent_uninsured_under_65 = db.Column(db.Integer)
    percent_poor_health = db.Column(db.Integer)

class state_data(db.Model):
    state_abbreviation = db.Column(db.String(3), primary_key =True)
    state_name = db.Column(db.String(50))
    expanded_medicaid = db.Column(db.Boolean)
    date_expanded = db.Column(db.DateTime)
    percent_insured = db.Column(db.Integer)
    percent_uninsured = db.Column(db.Integer)
    population_millions = db.Column(db.Integer)
    health_spending_2018_millions = db.Column(db.Integer)
    median_income = db.Column(db.Integer)

class insurance_cost(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    insurance_type = db.Column(db.String)
    avg = db.Column(db.Float)

class insurance_type_percent(db.Model):
    state_name = db.Column(db.String(3), primary_key = True)
    medicaid = db.Column(db.Integer)
    medicare = db.Column(db.Integer)
    marketplace = db.Column(db.Integer)
    employer = db.Column(db.Integer)
    private = db.Column(db.Integer)
    uninsured = db.Column(db.Integer)


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