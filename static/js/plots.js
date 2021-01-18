from flask import Flask
from flask_sqlalchemy import SQLAlchemy

var button = d3.select('#dropdown-menu')

button.on("click", createPlots)

function createPlots() {

    d3.event.preventDefault();

    var inputElement = d3.select()
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

// Cluster Bar Chart for Regional Uninsured and Poor Health
// chart.js

    var ctx = document.getElementById("myChart").getContext("2d");

    var data = {
        labels: ["Northeast", "Southeast", "Northwest", "Southwest"],
        datasets: [
            {
                label: "Percent Uninsured",
                backgroundColor: "blue",
                data: []
            //data pulled from regional table
            },
            {
                label: "Percent in Poor Health",
                backgroundColor: "green",
                data: []
            //data pulled from regional table
            },
        ]
    };

    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            }
        }
    })

};