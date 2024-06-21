const mongoose = require("mongoose")
mongoose.connect("mongodb://0.0.0.0/socket").then(()=>console.log("connection done")).catch((error)=>{ console.log(error)
})