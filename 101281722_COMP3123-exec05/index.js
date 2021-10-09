const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname+"/home.html");
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  fs.readFile(__dirname + "/user.json", 'utf-8', (err, data) => {
    res.send(data)
    res.end()
  })
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {

  var username = req.query.username
  var password = req.query.password

  let account = {
    username,
    password
  }
  fs.readFile(__dirname + "/user.json", 'utf-8', (err, data) => {
    let info = JSON.parse(data)
    if(account.username == info.username && account.password == info.password){
        res.send({
          status: true,
          message: "User Is valid"
      })
    } else if(account.username != info.username && account.password == info.password){
      res.send({
        status: false,
        message: "User Name is invalid"
      })
    }else if(account.username == info.username && account.password != info.password){
      res.send({
        status: false,
        message: "Password is invalid"
      })
    }else {
      res.send({
        status: false,
        message: "Username/Password is invalid"
      })
    }
  })
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  var username = req.params.username
  
  res.send(` <b>${username} successfully logout.<b>`)
  
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));