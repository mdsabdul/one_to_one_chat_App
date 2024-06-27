const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.DB_LINK).then(()=>console.log("connection done")).catch((error)=>{ console.log(error)})