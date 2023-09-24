const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");

const {routesInit} = require("./routes/configRoutes")
// התחברות למסד 
require("./db/mongoConnect")

const app = express();
// כדי שנוכל לשלוח באדי מצד לקוח
app.use(cors())
app.use(express.json());
// להגדיר תיקייה סטטית שתיהיה התיקייה בשם פאבליק
app.use(express.static(path.join(__dirname,"public")));

routesInit(app);


const server = http.createServer(app);
const port = process.env.PORT || 3005;
server.listen(port);
// npm install -> כדי להתקין פרוייקט מוכן, שיותקנו בו כל המודולים


// last update!