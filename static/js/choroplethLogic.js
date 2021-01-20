

// function init(){
//   //Draw initial choropleth with initial data
// };


var select = d3.select("#HealthcareDataSelect");
select.on('change', function(event,d){
  
  console.log(this.value);
  //case statement to assign the users selected data
  //clear old data from choropleth
  //render new data to map
})
//Clear old map to render new user input
//map.clearLayers();

var geoData = "static/data/USA.json";

// Creating map object
var myMap = L.map("map2", {
    center: [39.8283, -98.5795],
    zoom: 4
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// // Load in geojson data
// var geoData = "static/data/USA.json";

 var geojson;

d3.json(geoData).then((data) =>{
  console.log(data)
  geojson = L.choropleth(data, {
    // Define what  property in the features to use
    //valueProperty: "CENSUSAREA",  
    valueProperty: function (features) {
      return features.properties.CENSUSAREA
    },
     // Set color scale
     scale: ["white", "red"],

     // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "e",
    style: {
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
         },
  });
  geojson.addTo(myMap)
});


