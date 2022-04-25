"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const nconf = require('nconf');
const path = require('path');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');
nconf.file('./localConfig.json');
const appConfig = nconf.get('app');
require('./data/models/dbConnection')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
 	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
 	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", true);
 	next();
 });
 app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc, {explorer: true}));
 app.use('/server/health', function(req, res, next) {
    res.send({success: true, message: 'Server is running'})
   });
   app.use(function(err, req, res, next) {
 	console.error(err.stack);   
	res.status(500).render({status: 'ERROR', messgae: err.stack});
});
  app.use('/api/users',    require('./routes/product'));
  server.listen(appConfig.port, function() {
    console.log(`Server is running on ${appConfig.port}`);
  });
