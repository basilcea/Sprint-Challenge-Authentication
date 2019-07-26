const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../config/routes');

const server = express();
const session = require('express-session')
const KnexSessionStore= require('connect-session-knex')(session)
const store = new KnexSessionStore(/* options here */)

server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use('/', configureRoutes);

server.use(
    session({
      name: 'Cherekwa', // default is connect.sid
      secret: 'Okwa esi i ma hacking',
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false, // only set cookies over https. Server will not send back a cookie over http.
      }, // 1 day in milliseconds
      httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
      resave: false,
      saveUninitialized: false,
      store:store
    })
  );

module.exports = server;
