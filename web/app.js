const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoConnection = require("./models/connection");
const authRouter = require("./routes/authRouter");
const medRouter = require("./routes/medRouter");
const cookieParser = require("cookie-parser");

dotenv.config();

//Express App
const app = express();
//Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));
//mongo link
const mdbcnt = process.env.MONGO_URI;
//mongoConnection
mongoConnection(mdbcnt, app);  

app.use('/',authRouter);
app.use('/',medRouter);


app.get('/test',(req,res)=>{
  res.json({test:'test route'})
})
