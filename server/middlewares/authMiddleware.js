/**
 * Created by abdelghafour on 15/01/2017.
 */
/* eslint-disable new-cap, no-param-reassign */

import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import {
  getUserByFilter,
  getUser,
  updateUser,
} from './../controllers/usersController.js';
import {
  getPharmacist,
} from './../controllers/pharmacistsController.js';
import {
  getPatient,
} from './../controllers/patientsController.js';
import {
  addClient,
  getClientByFilter
} from './../controllers/clientController.js';

const secretToken = '9c8ea6cf-0c33-44de-b4f0-376bc89a2903';
const tokenTime = 120 * 60;

function generateToken(req, res, next) {
  const json = {
    _id: req.user._id,
    kind: req.user.user_type.kind,
    patient: req.user.user_type.item._id
  };
  // eslint-disable-next-line  no-param-reassign
  req.token = jwt.sign({ user: json }, secretToken, { expiresIn: tokenTime });
  next();
}
function checkRefreshToken(req, res, next) {
  const body = req.body;
  if ('refreshToken' in body) {
    const result = getClientByFilter({ refreshToken: body.refreshToken });
    return result.then((clients) => {
      if (clients.length !== 0) {
        const client = clients[0];
        req.user = client.user.item;
        return next();
      }
      return res.status(401).send({ error: 'this refresh token is invalid' });
    }, err => res.status(401).send({ error: err }));
  }
  return res.status(401).send({ error: 'refreshToken is required' });
}
function serializeClient(req, res, next) {
  const refreshToken = uuid.v4();
  const client = {
    user: {
      kind: req.user.user_type.kind,
      item: req.user.user_type.item._id
    },
    refreshToken,
  };
  if (req.body.deviceId !== undefined) {
    client.deviceId = req.body.deviceId;
  }
  const result = addClient(client);
  result.then(() => {
    req.refreshToken = refreshToken;
    next();
  }, (error) => {
    res.status(401).send({ error });
  });
}
function respondRefresh(req, res) {
  res.status(200).json({
    token: req.token
  });
}
function respond(req, res) {
  res.status(200).send({
    _id: req.user._id,
    last_login: req.user.last_login,
    user_type: req.user.user_type,
    token: req.token,
    refreshToken: req.refreshToken,
    expiresIn: tokenTime,
  });
}
function executeLogin(username, password, cb) {
  const filter = {
    deleted: false,
    username,
    password
  };

  getUserByFilter(filter)
    .then((users) => {
      if (users.length !== 0) {
        const body = { last_login: new Date() };
        const userID = users[0]._id;
        updateUser(userID, body);
        cb(null, users[0]);
      } else {
        cb(null, false);
      }
    }, () => cb(null, false));
}
function handleTokenError(error) {
  const name = error.name;
  const data = {};
  switch (name) {
    case 'JsonWebTokenError':
      data.errors = ['wrong token provided'];
      break;
    case 'TokenExpiredError':
      data.errors = ['token has expired please refresh'];
      break;
    default:
      data.errors = ['unhandled authentication case'];
      break;
  }
  return data;
}
function handleTokenSuccess(decoded, callback) {
  const userID = decoded.user._id;
  let func;
  getUser(userID)
    .then((user) => {
      console.log('user ', user.user_type.item._id)
      const itemID = user.user_type.item._id;
      const itemType = user.user_type.kind;
      switch (itemType) {
        case 'patients':
          func = getPatient;
          break;
        case 'pharmacists':
          func = getPharmacist;
          break;
        default:
          break;
      }
      if (func) {
        func(itemID).then((item) => {
          if (item === null) {
            callback({ message: 'user not found' }, null);
          } else {
            callback(null, item, itemType);
          }
        }, () => callback({ message: 'user not found' }, null));
      } else {
        callback({ message: 'user not found' }, null);
      }
    }, () => callback({ message: 'user not found' }, null));
}
function verifyToken(req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }
  jwt.verify(token, secretToken, (error, decoded) => {
    if (error) {
      const data = handleTokenError(error);
      res.status(401).send(data);
    } else {
      handleTokenSuccess(decoded, (err, authUser, kind) => {
        if (err) {
          res.status(401).send(err);
        } else {
          // eslint-disable-next-line  no-param-reassign
          req.user = authUser;
          // eslint-disable-next-line  no-param-reassign
          req.kind = kind;
          next();
        }
      });
    }
  });
}
function checkEnterpriseManagementCenterPermission(req, res, next) {
  const kind = req.kind;
  if (kind === 'enterpriseManagementCenters') {
    next();
  } else {
    res.status(401).send({
      message: 'you do not have enough permissions'
    });
  }
}
function checkLongTermCareFacilitiesPermission(req, res, next) {
  const kind = req.kind;
  if (kind === 'longTermCareFacilities') {
    next();
  } else {
    res.status(401).send({
      message: 'you do not have enough permissions'
    });
  }
}
function checkPatientsPermission(req, res, next) {
  const kind = req.kind;
  if (kind === 'patients') {
    next();
  } else {
    res.status(401).send({
      message: 'you do not have enough permissions'
    });
  }
}
function checkPharmacistsPermission(req, res, next) {
  const kind = req.kind;
  if (kind === 'pharmacists') {
    next();
  } else {
    res.status(401).send({
      message: 'you do not have enough permissions'
    });
  }
}
function checkSubFacilitiesPermission(req, res, next) {
  const kind = req.kind;
  if (kind === 'subFacilities') {
    next();
  } else {
    res.status(401).send({
      message: 'you do not have enough permissions'
    });
  }
}
function signUp(req, res, next) {
  console.log('1')
  const data = req.body;
  const filter = {
    _id: data._id
  };
  const body = {
    password: data.password
  };
  console.log('12')
  getUserByFilter(filter, body)
    .then((users) => {
      console.log('13 ', users)
      const user = users[0];
      console.log('13 ', user)
      const userID = user._id;
      console.log('13 ', userID)
      updateUser(userID, body)
        .then((userResult) => {
          res.result = userResult;
          next(200);
        }, (err) => {
          res.error = err;
          next(500);
        });
    }, (err) => {
      console.log('14')
      res.error = err;
      next(500);
    });
}

export {
  generateToken,
  respond,
  executeLogin,
  handleTokenError,
  handleTokenSuccess,
  verifyToken,
  checkEnterpriseManagementCenterPermission,
  checkLongTermCareFacilitiesPermission,
  checkSubFacilitiesPermission,
  checkPatientsPermission,
  checkPharmacistsPermission,
  signUp,
  respondRefresh,
  serializeClient,
  checkRefreshToken
};

