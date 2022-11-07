const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email

    var data = {
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    const jsonDATA = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/39a76c9489";
    const options = {
        method: "POST",
        auth: "Adebayo:d890d2be2f561787e04eb874c0447074-us9"
    }
    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonDATA)
    request.end();

})

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("App is listening on port 3000");
})


// API KEY
// d890d2be2f561787e04eb874c0447074-us9

// LIST ID
// 39a76c9489
