'use strict';

// import du module Express
let express = require('express');
let app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
let fetch = require('node-fetch');
app.use(express.json());
app.use(jsonParser);
const FileSystem = require("fs");




app.get('/rooms/', (req,res) => {
  const content = JSON.parse(FileSystem.readFileSync('./json/rooms.json'));
  res.send(content);
})

app.post('/rooms/addRoom/:code/:nbPlayer/:nbSecond', (req,res) => {
  
  const newRoom = {
    "codeRoom" : req.params.code,
    "nbMaxPlayer" : req.params.nbPlayer,
    "maxTime" : req.params.nbSecond,
    "playersList" : []
  }
  
  const oldContent = JSON.parse(FileSystem.readFileSync('./json/rooms.json'));
  oldContent.push(newRoom);
  const newContent = oldContent;
  FileSystem.writeFile('./json/rooms.json', JSON.stringify(newContent, null, '\t'), (error) => {
    if (error) throw error;
  });

  res.send({"text" : "bonjourAPI"}).status(200);

})

app.post('/rooms/addPlayer/:code/:pseudoPlayer', (req,res) => {
    
  const content = JSON.parse(FileSystem.readFileSync('./json/rooms.json'));
  const valuePseudo = req.params.pseudoPlayer;
  for (let room of content){
    if (room.codeRoom == req.params.code){
      if (room.playersList.length < room.nbMaxPlayer){
        room.playersList.push(valuePseudo);
      }
    }
  }
  FileSystem.writeFile('./json/rooms.json', JSON.stringify(content, null, '\t'), (error) => {
    if (error) throw error;
  });

  const allLocation = JSON.parse(FileSystem.readFileSync('./json/playerLocation.json'));
  let locationPlayer;
  for (let player of allLocation){
    if (player.name == valuePseudo){
      locationPlayer = player;
    }
  }
  if (locationPlayer == null){
    locationPlayer = {
      "name" : valuePseudo,
      "location" : ""
    }
  }
  if (locationPlayer.location == ""){
    FileSystem.writeFile('./json/rooms.json', JSON.stringify(content, null, '\t'), (error) => {
      if (error) throw error;
    });
    locationPlayer.location = "in a game";
    allLocation.push(locationPlayer);
    FileSystem.writeFile('./json/playerLocation.json', JSON.stringify(allLocation, null, '\t'), (error) => {
      if (error) throw error;
    });
    console.log(allLocation);
    res.send({"text" : 'good', "status" : 200});
  }
})



module.exports = app;
