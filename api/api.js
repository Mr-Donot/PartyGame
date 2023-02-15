'use strict';

// import du module Express
let express = require('express');
let app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
let fetch = require('node-fetch');
app.use(express.json());
app.use(jsonParser);




app.get('/message/allMessages', (req,res) => {
  db.all(`SELECT idUser_message, content_message FROM MESSAGE;`, (err, rows) => {
    if(err){
      res.status(400);
      res.send();
    }
    else {
      res.set('Content-Type', 'application/json; charset=utf-8');
      res.status(200).send(rows);

    }
  })
})

app.post('/message/addMessage', (req,res) => {
  db.run(`INSERT INTO MESSAGE (idUser_message, content_message) VALUES (${req.body.idUser}, "${req.body.content}");`);
  db.all(`SELECT score FROM USER WHERE id_user = ${req.body.idUser};`, (err, rows) => {
    db.run(`UPDATE USER SET score = ${rows[0].score + 1} WHERE id_user = ${req.body.idUser};`);
  });
})


app.get('/user/allUser', (req,res) => {
  db.all(`SELECT id_user, mail_user, pseudo_user, role_user, dateCreation_user, score FROM USER;`, (err, rows) => {
    if(err){
      res.status(400);
      res.send();
    }
    else {
      res.set('Content-Type', 'application/json; charset=utf-8');
      res.status(200).send(rows);

    }
  })
})

app.get('/message/:id_user', (req, res) => {
  db.all(`SELECT pseudo_user FROM USER WHERE id_user=${req.params.id_user};`, (err, rows) => {
      if(err){
          res.status(400);
          res.send();
      }
      else {
          if (rows.length === 1){
            res.set('Content-Type', 'application/json; charset=utf-8');
            res.status(200).send(rows);
          }
          else{
            res.set('Content-Type', 'application/json; charset=utf-8');
            res.status(401).send();
          }
      }
  });
});

app.get('/user/role/:id_user', (req, res) => {
  db.all(`SELECT role_user, pseudo_user FROM USER WHERE id_user=${req.params.id_user};`, (err, rows) => {
      if(err){
          res.status(400);
          res.send();
      }
      else {
          if (rows.length === 1){
            res.set('Content-Type', 'application/json; charset=utf-8');
            res.status(200).send(rows);
          }
          else{
            res.set('Content-Type', 'application/json; charset=utf-8');
            res.status(401).send();
          }
      }
  });
});

app.get('/cookie/:idCookie', (req,res) => {
    db.all(`SELECT * FROM SESSION`, (err, rows) => {
        for (let i = 0 ; i < rows.length ; i++){

          if (req.params.idCookie === rows[i].id_session){

            res.status(200).send(rows[i]);
          }
        }
      res.status(403).send();
    });
});

app.get('/user/deconnexion', (req,res) => {
  req.session.authenticated = false;
})

app.post('/user/connexion', (req,res) => {
    db.all(`SELECT id_user, mail_user, pseudo_user, role_user, dateCreation_user FROM USER WHERE (pseudo_user="${req.body.pseudoOrMail}" OR
     mail_user="${req.body.pseudoOrMail}") AND mdp_user="${req.body.mdp}"`, (err, rows) => {
        if(err){
            res.status(400);
            res.send();
        }
        else {
            if (rows.length === 1){
              res.set('Content-Type', 'application/json; charset=utf-8');
              db.run(`INSERT INTO SESSION (id_session, idUser_session) VALUES ("${req.sessionID}", ${rows[0].id_user});`);

              if (req.session.authenticated){
                res.json(req.session);
              }
              else{
                req.session.authenticated = true;
                req.session.user = rows;
                res.json({sessionId: req.sessionID, session: req.session});
              }

            }
            else{
              res.set('Content-Type', 'application/json; charset=utf-8');
              res.status(401).send();
            }

        }
    });
});

app.post('/user/inscription', (req,res) => {
    db.run(`INSERT INTO USER (mail_user, pseudo_user, mdp_user, role_user, dateCreation_user, score) VALUES
     ("${req.body.mail}", "${req.body.pseudo}", "${req.body.mdp}", 'user', "${req.body.date}", 0)`, (err) => {
        if(err){
            res.status(409);
            res.send();
        }
        else{
            res.status(200);
            res.send();
        }
    });
});

app.get('/user/inscription/:pseudo/:mail', (req, res) => {
  db.all(`SELECT * FROM USER WHERE pseudo_user="${req.params.pseudo}" OR
   mail_user="${req.params.mail}"`, (err, rows) => {
      if(err){
          res.status(400);
          res.send();
      }
      else {
          if (rows.length === 0){
            res.set('Content-Type', 'application/json; charset=utf-8');
            res.status(200).send();
          }
          else{
            res.set('Content-Type', 'application/json; charset=utf-8');
            res.status(401).send();
          }

      }
  });
});
// export de notre application vers le serveur principal
module.exports = app;
