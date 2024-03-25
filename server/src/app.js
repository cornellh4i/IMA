const express=require('express');
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;


app.use(express.json())
mongoose.connect("mongodb+srv://h4i-ima:h4iIMA2024@ima.pejjbfw.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if (!err) {
        console.log("connected to db")
    }
    else {
        console.log(err)
    }
})
app.listen(3000, () => {
    console.log("on port 3000")
})

const userSchema = new mongoose.Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    id: Number
  });

  const users = mongoose.model('users', userSchema);

  app.post('/addMember', function (req, res) {
    const data = new users({
        name: req.body.name,
        email: req.body.email,
        id: req.body.id
    })

    data.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
  })


 //Get all Method
 app.get('/getMember', function (req, res) {

    users.find(function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            console.log(docs); 
            res.send(docs)
        } 
    }); 
})


