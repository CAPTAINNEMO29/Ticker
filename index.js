const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    //var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

    var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

    //var finalURL = baseURL + crypto + fiat;

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount,
        }
    }

    request(options, function(error, response, body){
    //request(finalURL, function(error, response, body){

    //request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function(error, response, body){
    //console.log(body);

    var data = JSON.parse(body);
    var price = data.price;    
    //var price = data.last;
    //var price = data.averages.week;
    //console.log(price);

    var currentDate = data.time;

    //var currentDate = data.display_timestamp;

    res.write("<p>the current date if " + currentDate + "</p>");
    res.write("<h1> " + amount + " " + crypto + " is " + price + fiat + "</h1");
    //res.write("<h1>the current price of " + crypto + " is currently worth" + price + fiat + "</h1");

    res.send();
    });
});
/*
app.post(".../BTCUSD");{

}

app.post(".../ETHUSD");{
    
}

app.post(".../LTCUSD");{
    
}
*/

app.listen(3000, function(){
    console.log("server is runing on port 3000");
});