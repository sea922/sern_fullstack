import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './routeS/web';
import connectDB from "./config/connectDB";
import cors from 'cors';

require('dotenv').config();

let app = express();
app.use(cors({ origin: true }));
// config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8000;


app.listen(port, () => {
    //callback
    console.log("Backend NodeJs is running on the port: " + port)
}) 

//admin// Test