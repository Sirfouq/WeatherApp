//const { response } = require('express');
const { json } = require('body-parser');
const express = require('express');
const request = require('request');
const app = express();
const port = 3000;
const pug = require ('pug');
const path = require('path');

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{

var weather = 'Rainy'
res.render('index',{title: 'Weather App'});
    
});



app.get('/sendWeatherAPI',(req,res)=>{

var options ={
    'method':'GET',
    "url":'http://dataservice.accuweather.com/currentconditions/v1/locationKey?locationKey=182536&apikey=t4liH5hvlNbd5gt0MshQP2WkHU4IuuL7'
};

request(options,(err,response)=>{
    if(err) throw new Error(err);
    
    var weatherResponse = JSON.parse(response.body);
    var weather = weatherResponse[0].WeatherText;
    var temp = weatherResponse[0].Temperature.Metric.Value;
    var time = weatherResponse[0].LocalObservationDateTime;
    console.log(weatherResponse);
    res.render('weather', {title:'Weather Forecast',weather: weather, temp:temp, time:time})
})

})


app.listen(port,()=>{
    console.log(`Server listening at port ${port}...`);
})
