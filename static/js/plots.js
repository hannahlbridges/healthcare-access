from flask import Flask
from flask_sqlalchemy import SQLAlchemy

// Pie Chart of type of coverage

var trace1 = {
    labels: ['Employer', 'Marketplace/Private', 'Medicaid', 'Medicare', 'Uninsured'],
    //need to add code selecting row based on selection in dropdown menu
    // state = 
    // values calls the data in the row of the selected state
    values: [],
    type: 'pie'
     };
    
var data = [trace1];
    
var layout = {
    title: "Type of Insurance Coverage",
     };
//need to add code to insert plot in designated container    
Plotly.newPlot("plot", data, layout);

// Medicare Avg Costs Bar Chart

var trace1 = {
    x: ['Heart Attack 2013', 'Stroke 2013', 'Heart Attack 2018', 'Stroke 2018'],
    // need code to select row based on state 
    y: [medicare_avg_costs.avg_cost_ha_2013, medicare_avg_costs.avg_cost_stroke_2013, medicare_avg_costs.avg_cost_stroke_2018, medicare_avg_costs.avg_cost_ha_2018],
    type: "bar"
     };
    
var data = [trace1];
    
var layout = {
   title: "Average Cost of Hospital Treatment in 2013 and 2018 - Medicare Recipients",
   xaxis: { title: "Condition and Year"},
   yaxis: { title: "Average Cost of Treatment"}
    };
    
Plotly.newPlot("plot", data, layout);