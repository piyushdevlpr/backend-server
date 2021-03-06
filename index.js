var express     = require("express"),
    app         = express(),
    server = require("http").createServer(app),
    request = require('request'),
    ob = require('./data');

var text = "" ;
var events = [] ;
var d = new Date() ;
function downloadPage(){
  //return new Promise((resolve, reject) => {
     d = new Date();
    var da = d.getMonth() ;
    var day = "";
    if(da == 0){
      day = "Januray" ;
    }else if(da == 1){
      day = "February" ;
    }else if(da == 2){
      day = "March" ;
    } else if(da == 3){
      day = "April" ;
    } else if(da == 4){
      day = "May" ;
    } else if(da == 5){
      day = "June" ;
    } else if(da == 6){
      day = "July" ;
    } else if(da == 7){
      day = "August" ;
    } else if(da == 8){
      day = "September" ;
    } else if(da == 9){
      day = "October" ;
    } else if(da == 10){
      day = "November" ;
    } else{
      day = "December" ;
    } 
    var query = day+"_"+d.getDate() ;
    var url = "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=&format=json&titles="+query+"&rvprop=content" ;
   // myBackEndLogic(url);
    

  request(url, function (err, response, body) {
    if(err){
    var error = "cannot connect to the server";
    console.log(error);
   } else {
     body = JSON.parse(body);
     var id = Object.getOwnPropertyNames(body.query.pages);
     text = "" ;
     events = [] ;
     text = body.query.pages[id].extract ;
     var start = text.indexOf("== Events ==") + 13 ;
     var end = text.indexOf("== Births ==")-2;
     var ev = text.slice(start,end) ;
     var linestart = 0 ;
     var linend = 0 ;
     
     for(var i = start ; i <= end; i++){
       if(ev.charAt(i) == '\n'){
         linend = i ;
         events.push(ev.slice(linestart,linend)) ;
         linestart = linend + 1;
       }
     }
    }
   });
//});
}

//async function myBackEndLogic(url) {
 // try {
 //    await downloadPage(url) ;
//  } catch (error) {
//       console.error('ERROR:');
//       console.error(error);
//   }
// }
//function getdata(){
downloadPage() ;
app.get("/",function(req,res){

  
      var obj = {
        'cont':events,
        'day': d.toLocaleDateString(),
        'time':d.toLocaleTimeString()
      }
      // if(events.length === 0){
      //   console.log(events) ;
      //   res.redirect('/') ;
      // }else{
       
        res.json(obj);
  //    }//setTimeout((function() {res.json(obj)}), 8000);
});
//}
setInterval(function() {
  downloadPage() ;
}, 1000);
var port = process.env.PORT || 3000;
server.listen(port,function(){ 
  console.log("server running!!!!");
});