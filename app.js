var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session =require ("express-session");
const { connectToMongoDb } = require("./config/db");
const path = require('path');

const cors = require("cors");
require("dotenv").config();

const logMiddleware = require('./midlewares/logsMiddlewares.js'); //log



const http = require("http");//1 importation du protocole http

// gemini
const fetch = require('node-fetch');
global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;




var indexRouter = require("./routes/indexRouter");
var usersRouter = require("./routes/usersRouter");
var osRouter = require("./routes/osRouter");

var formationRouter = require("./routes/formationRouter");
var alerteRouter = require ("./routes/alerteRouter");
var articleRouter = require ("./routes/articleRouter");
var chapitreRouter = require ("./routes/chapitreRouter");
var inscritRouter = require ("./routes/inscritRouter");
var notifRouter = require ("./routes/notifRouter");
//var pdfRouter = require ("./routes/pdfRouter");
var questionRouter = require ("./routes/questionRouter");
var quizRouter = require ("./routes/quizRouter");
var certificatRouter = require ("./routes/certificatRouter");
var preferenceRouter = require ("./routes/preferenceRouter.js");



var GeminiRouter = require("./routes/GeminiRouter");
var app = express();



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(logMiddleware); //log

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));


app.use(session({   //cobfig session
  secret: "net secret pfe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: {secure: false},
    maxAge: 24*60*60,
  
  },  
}))

const apiVersion = '/api/v1';
app.use('/uploads/', express.static(path.join(__dirname, 'uploads/')));

app.use(apiVersion, usersRouter);
app.use(apiVersion, articleRouter);
app.use(apiVersion, formationRouter);
app.use(apiVersion, alerteRouter);
app.use(apiVersion, quizRouter);



app.use("/os", osRouter);

// les tables
app.use("/formation", formationRouter);

app.use("/chapitre", chapitreRouter);
app.use("/inscrit", inscritRouter);
app.use("/notif", notifRouter);
 //app.use("/pdf", pdfRouter);
app.use("/question", questionRouter);
app.use("/certificat", certificatRouter);
app.use("/preference",preferenceRouter);

 //gemini 
app.use("/gemini", GeminiRouter);

 // path hety ely kbal l os 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// error handler
app.use(function (err, req, res, next) {
  console.error("Erreur serveur:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erreur serveur",
  });
});



const server = http.createServer(app); //2
server.listen(process.env.port, () => {
  connectToMongoDb()
  console.log("app is running on port 5000");
});