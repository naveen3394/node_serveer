var express=require("express");

var router=express();
var mysql=require("mysql");
var Joi=require("joi");
var config=require("config");


 var connection =mysql.createConnection({
     host:config.get("host"),
     database:config.get("database"),
     user:config.get("user"),
     password:config.get("password")
 });

connection.connect();

router.use(express.json());

router.get("/",(request,response)=>{
var querytext=`select * from Emp`;      
    connection.query(querytext,(err,result)=>
    {
    if(err==null)
    {
    console.log(result);
    response.send(JSON.stringify(result));
    }
    else
    {
        console.log(err);
        response.send(JSON.stringify(err));   
    }
    });
    });


 router.get("/:No",(request,response)=>{

var querytext=`select * from Emp where No=${request.params.No}`;      
connection.query(querytext,(err,result)=>
{
if(err==null)
{
console.log(result);
response.send(JSON.stringify(result));
}
else
{
console.log(err);
response.send(JSON.stringify(err));   
}
});
});


router.put("/:No",(request,response)=>{
    var No=request.params.No;
    var Name=request.body.Name;
    var Age=request.body.Age;
    
var querytext=`UPDATE Emp SET Name='${Name}',Age=${Age} where No=${No}`;      
connection.query(querytext,(err,result)=>
{
if(err==null)
{
console.log(result);
response.send(JSON.stringify(result));
}
else
{
console.log(err);
response.send(JSON.stringify(err));   
}
});
});


router.post("/",(request,response)=>{
    
    var validationResult=Validate(request);
    
    if(validationResult.error==null)
    {
    var No=request.body.No;
    var Name=request.body.Name;
    var Age=request.body.Age;
    
		var querytext=`insert into Emp values(${No},'${Name}',${Age})`;      
		connection.query(querytext,(err,result)=>
		{
		if(err==null)
		{
		console.log(result);
		response.send(JSON.stringify(result));
		}
		else
		{
		console.log(err);
		response.send(JSON.stringify(err));   
		}
		});
		    }
		    else
		    {
response.send(JSON.stringify(validationResult.error));
    }
});
    
function Validate(request){

var validationschema={
    No:Joi.number().required(),
    Name:Joi.string().required(),
    Age:Joi.number().min(18).max(60).required()
}

return Joi.validate(request.body,validationschema);
}


router.delete("/:No",(request,response)=>{
    var No=request.params.No;
    var querytext=`delete from Emp where No=${No}`;      
    connection.query(querytext,(err,result)=>
    {
    if(err==null)
    {
    console.log(result);
    response.send(JSON.stringify(result));
    }
    else
    {
    console.log(err);
    response.send(JSON.stringify(err));   
    }
    });
    });
    module.exports=router;
