'use strict';
const express = require('express');
const app = require('express')();//Création d'une instance d'express
const api = require('./api/api');


app.use('/', express.static(__dirname + '/public'));//Définition du dossier public
app.use('/api', api);

var path = require('path');
app.set('port', (process.env.PORT || 4444));

//test socket.io
const server = require('http').createServer(app);




//For avoidong Heroku $PORT error
server.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
