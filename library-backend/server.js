const express = require("express");
const connectDB = require("./config/dbconnection");
const bookRoutes= require("./routes/bookRoutes")
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config()
const cors = require('cors') ;

connectDB()
const app = express();
const port =process.env.PORT || 6000;
app.use(express.json())
app.use(cors());
app.use('/api/book' ,bookRoutes)
 app.use(errorHandler)
app.listen(port , () => {
    console.log(`server started at ${port} `)
})