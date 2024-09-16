const dotenv= require("dotenv").config()
const express = require("express")
const app = express()
const port =process.env.PORT|| 5000
app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes"))
// assinging port to the app
app.listen(port,()=>{
    console.log("server on ",port)
})
