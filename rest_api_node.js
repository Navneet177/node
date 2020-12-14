var express=require('express');
const app=express();
var mysql = require('mysql');
var bodyparser=require('body-parser');


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'userdata'
});

var jsonParser = bodyparser.json()
var urlencodedParser = bodyparser.urlencoded({ extended: false })

// Login code start here 

app.post('/login', urlencodedParser, function (req, res) {

  var email=req.body.email;

  var password=req.body.password;

  connection.query("Select * from tbl_users WHERE email = ?",[email],function(err,result,fields){


    if(result && result.length){

      if(password==result[0].password){
        res.json("Successfully Login!");
      }
      else{
        res.json("Wrong Login info data!");  
      }
    }
})

})

// Signup code starting from here 

app.post('/signup', urlencodedParser, function (req, res) {

    var full_name=req.body.full_name;
    var age=req.body.age;
    var email=req.body.email;
    var pass=req.body.password;
  
    connection.query("Insert into tbl_users (full_name,age,email,password) VALUES ('"+full_name+"','"+age+"','"+email+"','"+pass+"')",function(err,result,fields){
  
        if (err) throw err;  

          res.json("User Successfully Registered!");
      
  })
  
  })


  app.post('/add_product', urlencodedParser, function (req, res) {

    var full_name=req.body.full_name;
    var age=req.body.age;
    var email=req.body.email;
    var pass=req.body.password;
  
    connection.query("Insert into tbl_product (full_name,age,email,password) VALUES ('"+full_name+"','"+age+"','"+email+"','"+pass+"')",function(err,result,fields){
  
        if (err) throw err;  

          res.json("User Successfully Registered!");
      
  })
  
  })



app.listen(8080,() =>{
    console.log('Server started on port 8080...');
  });