var express     = require("express"),
    app         = express(),
    server = require("http").createServer(app),
    ob = require('./data');

app.get("/",function(req,res){
  var d = new Date();
  for(let i in ob){
    if(ob[i]["id"] === d.getDate()+""+d.getMonth()){
      var obj = {
        'cont':ob[i]["events"],
        'day': d.toLocaleDateString(),
        'time':d.toLocaleTimeString()
      }
      res.json(obj) ;
    }
  }
 // ob[i]["events"]
});
var port = process.env.PORT || 3000;
server.listen(port,function(){ 
  console.log("server running!!!!");
});