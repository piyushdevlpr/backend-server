var express     = require("express"),
    app         = express(),
    server= require("http").createServer(app),
    ob = require('./data');
//var obj = "hello";

app.get("/",function(req,res){
  var d = new Date();
  for(let i in ob){
   // console.log(ob[i]["id"]) ;
    if(ob[i]["id"] === d.getDate()+""+d.getMonth()){
      res.send("piyush") ;
    }
  }
 // ob[i]["events"]
});
var port = process.env.PORT || 3000;
server.listen(port,function(){ 
  console.log("server running!!!!");
});