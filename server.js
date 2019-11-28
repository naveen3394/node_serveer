var express=require("express");
var app=express();
var mysql=require("mysql");
var empsRouter=require("./routes/emps");
var config=require("config");

var port=parseInt(JSON.stringify(config.get("port")));

 app.use(express.json());

app.use(function(req,res,next){

    res.header("Access-Control-Allow-Origin","*"),
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE"),
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept"),
    next();
})

app.use("/emps",empsRouter);

app.listen(port,()=>{
    console.log("server started");
    
})
