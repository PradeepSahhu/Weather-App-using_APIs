
// necessary installed node packages
const express = require("express");
const https = require("https");
const bodyParser = require("body-Parser");


// executing the installed packages
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


// res to send data to the browser
// get request by server to request for data , res to send file to the server
app.get("/", function(req, res){

  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){

  // useful variables
  const query =  req.body.Cityname;
  const appKey = "5c22b28d466ed112d40056d9b8dedd2c";
  const unit = req.body.unit;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+ unit;

  // functions and data retrival from others server , here https is get requesting for data from the APIs/someone Else's server...
  https.get(url, function(response){  // response have the retrived data
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data); //javascript object notation file for easy transfer and less size...
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const location = weatherData.name;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

      // console.log(location+" temp is: "+temp + " Description: "+description);

      // writing the multiple lines in the browser response by the server...
      res.write(" <p> The weather is currently " + description + "</p>")
      res.write("<h1> The temperature in "+ location + " is " + temp + " Degrees celsius... "+" </h1>");
      res.write("<img src =" +imageUrl+">");
      res.send();
    });
  });
});






// express listening event at localhost : 3000
app.listen(3000, function(){
  console.log("server running at localhost: 3000");
});
