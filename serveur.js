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
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('\n------------\nuser connected !\n------------\n');
  //Evenement en live reception d'un msg de qqn, et envoie a tout le monde
  socket.on('addPlayer', (data) => {
    io.emit('addPlayer', data);
  });
  socket.on('launchGame', (data) => {
    io.emit('launchGame', data);
  });
});

//For avoidong Heroku $PORT error
server.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
