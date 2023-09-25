const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public")); //renders all external files like css, images etc.

app.get("/" , function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req, res){
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data={
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/33aee13dff";
  const options = {
    method: "POST",
    auth: "raisa1:58b0846dc823e89e03fd73f51a7f26d5-us21"
  }

  const request = https.request(url , options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });


  })
  //request.write(jsonData);
  request.end();
});

app.post("/failure" , function(req, res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});


//API KEY
//58b0846dc823e89e03fd73f51a7f26d5-us21

//List id
//33aee13dff
