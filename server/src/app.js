const express=require('express');
const app = express();
const mongoose = require("mongoose");
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