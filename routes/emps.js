var express=require("express");

var router=express();
var mysql=require("mysql");
var Joi=require("joi");
var config=require("config");


 var connection =mysql.createConnection({
     host:"192.168.0.107",
     database:"db1",
     user:"root",
     password:"root",
port:9099
 });

connection.connect();

router.use(express.json());

router.get("/",(request,response)=>{
var querytext=`select * from product`;      
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


 router.get("/:id",(request,response)=>{

var querytext=`select * from product where id=${request.params.id}`;      
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


router.put("/:id",(request,response)=>{
    var id=request.params.id;
    var title=request.body.title;
    var price=request.body.price;
    
var querytext=`UPDATE product SET title='${title}',price=${price} where id=${id}`;      
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
    var id=request.body.id;
    var title=request.body.title;
    var price=request.body.price;
    
		var querytext=`insert into product values(${id},'${title}',${price})`;      
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
    id:Joi.number().required(),
    title:Joi.string().required(),
    price:Joi.number().min(0).max(60000).required()
}

return Joi.validate(request.body,validationschema);
}


router.delete("/:id",(request,response)=>{
    var No=request.params.No;
    var querytext=`delete from product where id=${id}`;      
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
