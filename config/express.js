/**
 * Created by adil on 6/20/17.
 */
/* eslint-disable no-param-reassign */

// npms
import mongoose from 'mongoose';
import express from 'express';
import logger from 'morgan';
import passport from 'passport';
import Strategy from 'passport-local';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import socketio from 'socket.io';
import util from 'util';
import cors from 'cors';
// middle wares
// todo: merge the two authenticate middle wares
import {
  generateToken,
  respond,
  executeLogin,
  verifyToken,
  checkPatientsPermission,
  signUp,
  checkRefreshToken,
  respondRefresh,
  serializeClient
} from '../server/middlewares/authMiddleware.js';
import { formatOutput } from '../server/middlewares/outputMiddleware.js';
import { handleOptions } from '../server/middlewares/inputMiddleware.js';

// const Container = require('../server/lib/di/container.js');
// const sql = require('mssql');
// // const cron = require('../server/cron');
// const sockets = require('../server/socket');
// const amqpConsumer = require('../server/amqp'); // eslint-disable-line no-unused-vars
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const debug = require('debug')('mysehhatiapi:index');

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = `mongodb://localhost:27017/Limouna`;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
// print mongoose logs in dev env
if (true) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// server initialization
const app = express();
app.use(cors());
// load services
// eslint-disable-next-line global-require

// var port = www.normalizePort(process.env.WWWPORT || '4000');

const server = http.createServer(app);

const websocket = socketio(server);
// app.set('port', port);
// server.listen(port);
// server.on('error', www.onError);
// server.on('listening', www.onListening);
global.websocket = websocket;

// amqpConsumer.initialize();

// routes
import patientsRoutes from '../server/routes/patientsRoutes.js';
// import doctorsRoutes from '../server/routes/doctorsRoutes.js';
import usersRoutes from '../server/routes/usersRoutes.js';
import pharmacistsRoutes from '../server/routes/pharmacistsRoutes.js';
import medecinsRoutes from '../server/routes/medecinsRoutes.js';
import benificiairesRoutes from '../server/routes/benificiairesRoutes.js';
import consultationsRoutes from '../server/routes/consultationsRoutes.js';
import ordonnancesRoutes from '../server/routes/ordonancesRoutes.js';
import analysesRoutes from '../server/routes/analysesRoutes.js';
import traitementsRoutes from '../server/routes/traitementsRoutes.js';
import radiosRoutes from '../server/routes/radiosRoutes.js';

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(handleOptions);

passport.use(new Strategy(
  (username, password, done) => {
    executeLogin(username, password, done);
  }
));
// app.use('/sign-up', authRoutes);
app.post('/login', passport.initialize(), passport.authenticate(
  'local', {
    session: false,
    scope: []
  }), serializeClient, generateToken, respond);

app.use('/medecins', medecinsRoutes);
app.use('/patients',checkPatientsPermission, patientsRoutes);
app.use('/pharmacists', pharmacistsRoutes);
  // app.use('/doctors', doctorsRoutes);
app.use('/users', usersRoutes);
app.post('/refresh',
  checkRefreshToken,
  generateToken,
  respondRefresh
);
app.post('/sign-up', signUp);
app.use(verifyToken);
app.use('/benificiares', checkPatientsPermission, benificiairesRoutes);
app.use('/consultation', checkPatientsPermission, consultationsRoutes);
app.use('/ordonnances', checkPatientsPermission, ordonnancesRoutes);
app.use('/analyses', checkPatientsPermission, analysesRoutes);
app.use('/traitements', checkPatientsPermission, traitementsRoutes);
app.use('/radios', checkPatientsPermission, radiosRoutes);
app.use(formatOutput);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send({});
});

export {server};
