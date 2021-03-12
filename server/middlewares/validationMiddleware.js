import express from 'express';

// eslint-disable-next-line  new-cap
const router = express.Router();

/* add subFacility from emc */
router.post('/enterprise-management-center/sub-facility',
  (req, res, next) => {
    const body = req.body;
    const errors = [];
    if ('_id' in body) { next(); } else {
      if (!('username' in body) || body.username === '' || body.username === undefined) { errors.push({ 'username error': 'Username is missing' }); }
      if (!('password' in body) || body.password === '' || body.password === undefined) { errors.push({ 'password error': 'password is missing' }); }
      if (!('type' in body) || body.type === '' || body.type === undefined) { errors.push({ 'type error': 'type is missing' }); } else if (!('data' in body) || body.data === '' || body.data === undefined) { errors.push({ 'data error': 'data is missing' }); } else {
        const data = body.data;
        if (body.type === 'subFacilities') {
          if (!('facility_name' in data) || data.facility_name === '' || data.facility_name === undefined) { errors.push({ 'facility_name error': 'facility_name is missing in data' }); }
          if (!('contact_first_name' in data) || data.contact_first_name === '' || data.contact_first_name === undefined) { errors.push({ 'contact_first_name error': 'contact_first_name is missing in data' }); }
          if (!('contact_last_name' in data) || data.contact_last_name === '' || data.contact_last_name === undefined) { errors.push({ 'contact_last_name error': 'contact_last_name is missing in data' }); }
          if (!('facility_phone_number' in data) || data.facility_phone_number === '' || data.facility_phone_number === undefined) { errors.push({ 'facility_phone_number error': 'facility_phone_number is missing in data' }); }
          if (!('email_address' in data) || data.email_address === '' || data.email_address === undefined) { errors.push({ 'email_address error': 'email_address is missing in data' }); }
          if (!('street_address' in data) || data.street_address === '' || data.street_address === undefined) { errors.push({ 'street_address error': 'street_address is missing in data' }); }
          if (!('city_address' in data) || data.city_address === '' || data.city_address === undefined) { errors.push({ 'city_address error': 'city_address is missing in data' }); }
          if (!('state_address' in data) || data.state_address === '' || data.state_address === undefined) { errors.push({ 'state_address error': 'state_address is missing in data' }); }
          if (!('zip_address' in data) || data.zip_address === '' || data.zip_address === undefined) { errors.push({ 'zip_address error': 'zip_address is missing in data' }); }
        } else {
          errors.push({ 'type error': `${body.type} is not a valid enum value for path \`type\` at subFacility` });
        }
      }
      if (errors.length > 0) {
        res.status(400).send({ errors });
      } else {
        next();
      }
    }
  });
// add patient from emc
router.post('/enterprise-management-center/patient',
  (req, res, next) => {
    const body = req.body;
    const errors = [];
    if ('_id' in body || 'sub_facility_id' in body) { next(); } else {
      if (!('username' in body) || body.username === '' || body.username === undefined) { errors.push({ 'username error': 'Username is missing' }); }
      if (!('password' in body) || body.password === '' || body.password === undefined) { errors.push({ 'password error': 'password is missing' }); }
      if (!('type' in body) || body.type === '' || body.type === undefined) { errors.push({ 'type error': 'type is missing' }); } else if (!('data' in body) || body.data === '' || body.data === undefined) { errors.push({ 'data error': 'data is missing' }); } else {
        const data = body.data;
        if (body.type === 'patients') {
          if (!('first_name' in data) || data.first_name === '' || data.first_name === undefined) { errors.push({ 'first_name error': 'first_name is missing in data' }); }
          if (!('last_name' in data) || data.last_name === '' || data.last_name === undefined) { errors.push({ 'last_name error': 'last_name is missing in data' }); }
          if (!('phone_number' in data) || data.phone_number === '' || data.phone_number === undefined) { errors.push({ 'phone_number error': 'phone_number is missing in data' }); }
          if (!('email_address' in data) || data.email_address === '' || data.email_address === undefined) { errors.push({ 'email_address error': 'email_address is missing in data' }); }
          if (!('sub_facility_id' in data) || data.sub_facility_id === '' || data.sub_facility_id === undefined) { errors.push({ 'sub_facility_id error': 'sub_facility_id is missing in data' }); }
          if (!('resources' in data) || data.resources === '' || data.resources === undefined) { errors.push({ 'resources error': 'resources is missing in data' }); }
        } else {
          errors.push({ 'type error': `${body.type} is not a valid enum value for path \`type\` at patient` });
        }
      }
      if (errors.length > 0) {
        res.status(400).send({ errors });
      } else {
        next();
      }
    }
  });
// attach resource to patient from emc
router.post('/enterprise-management-center/patient/:patientID/resource',
  (req, res, next) => {
    const resources = req.body;
    const errors = [];
    for (let i = 0; i < resources.length; i += 1) {
      if (!('name' in resources[i]) || resources[i].name === '' || resources[i].name === undefined) { errors.push({ 'name error': `name of resource is missing at ${i}` }); }
      if (!('description' in resources[i]) || resources[i].description === '' || resources[i].description === undefined) { errors.push({ 'description error': `description of resource is missing at ${i}` }); }
      if (!('resource_type' in resources[i]) || resources[i].resource_type === '' || resources[i].resource_type === undefined) { errors.push({ 'resource_type error': `type of resource is missing at ${i}` }); }
      if (!('content' in resources[i]) || resources[i].content === '' || resources[i].content === undefined) { errors.push({ 'content error': `content of resource is missing at ${i}` }); }
    }
    if (errors.length > 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  });
// schedule patient to queue from emc
router.post('/enterprise-management-center/discharge-queues/schedule-patient',
  (req, res, next) => {
    const body = req.body;
    const patient = body.patient;
    if ('_id' in patient || 'sub_facility_id' in patient) {
      next();
    } else {
      res.status(400).send({ errors: 'required fields are missing' });
    }
  });
// schedule patient to queue
router.post('/enterprise-management-center/sub-facility/discharge-queues/schedule-patient',
  (req, res, next) => {
    const body = req.body;
    const patient = body.patient;
    if ('_id' in patient || 'sub_facility_id' in patient) { next(); } else {
      res.status(400).send({ errors: 'required fields are missing' });
    }
  });
// add pharmacist from emc
router.post('/enterprise-management-center/pharmacist',
  (req, res, next) => {
    const body = req.body;
    const errors = [];
    if ('_id' in body) { next(); } else {
      if (!('username' in body) || body.username === '' || body.username === undefined) { errors.push({ 'username error': 'Username is missing' }); }
      if (!('password' in body) || body.password === '' || body.password === undefined) { errors.push({ 'password error': 'password is missing' }); }
      if (!('type' in body) || body.type === '' || body.type === undefined) { errors.push({ 'type error': 'type is missing' }); } else if (!('data' in body) || body.data === '' || body.data === undefined) { errors.push({ 'data error': 'data is missing' }); } else {
        const data = body.data;
        if (body.type === 'pharmacists') {
          if (!('first_name' in data) || data.first_name === '' || data.first_name === undefined) { errors.push({ 'first_name error': 'first_name is missing in data' }); }
          if (!('last_name' in data) || data.last_name === '' || data.last_name === undefined) { errors.push({ 'last_name error': 'last_name is missing in data' }); }
          if (!('phone_number' in data) || data.phone_number === '' || data.phone_number === undefined) { errors.push({ 'phone_number error': 'phone_number is missing in data' }); }
          if (!('email_address' in data) || data.email_address === '' || data.email_address === undefined) { errors.push({ 'email_address error': 'email_address is missing in data' }); }
        } else {
          errors.push({ 'type error': `${body.type} is not a valid enum value for path \`type\` at pharmacist` });
        }
      }
      if (errors.length > 0) {
        res.status(400).send({ errors });
      } else {
        next();
      }
    }
  });
// add patient from subFacility
router.post('/sub-facilities/patient',
  (req, res, next) => {
    const body = req.body;
    const errors = [];
    if ('_id' in body) { next(); } else {
      if (!('username' in body) || body.username === '' || body.username === undefined) { errors.push({ 'username error': 'Username is missing' }); }
      if (!('password' in body) || body.password === '' || body.password === undefined) { errors.push({ 'password error': 'password is missing' }); }
      if (!('type' in body) || body.type === '' || body.type === undefined) {
        errors.push({ 'type error': 'type is missing' });
      } else if (!('data' in body) || body.data === '' || body.data === undefined) {
        errors.push({ 'data error': 'data is missing' });
      } else {
        const data = body.data;
        if (body.type === 'patients') {
          if (!('first_name' in data) || data.first_name === '' || data.first_name === undefined) { errors.push({ 'first_name error': 'first_name is missing in data' }); }
          if (!('last_name' in data) || data.last_name === '' || data.last_name === undefined) { errors.push({ 'last_name error': 'last_name is missing in data' }); }
          if (!('phone_number' in data) || data.phone_number === '' || data.phone_number === undefined) { errors.push({ 'phone_number error': 'phone_number is missing in data' }); }
          if (!('email_address' in data) || data.email_address === '' || data.email_address === undefined) { errors.push({ 'email_address error': 'email_address is missing in data' }); }
          if (!('resources' in data) || data.resources === '' || data.resources === undefined) { errors.push({ 'resources error': 'resources is missing in data' }); }
        } else {
          errors.push({ 'type error': `${body.type} is not a valid enum value for path \`type\` at patient` });
        }
      }
      if (errors.length > 0) {
        res.status(400).send({ errors });
      } else {
        next();
      }
    }
  });
// attach resource to patient from subFacility
router.post('/sub-facilities/patient/:patientID/resource',
  (req, res, next) => {
    const resources = req.body;
    const errors = [];
    for (let i = 0; i < resources.length; i += 1) {
      if (!('name' in resources[i]) || resources[i].name === '' || resources[i].name === undefined) { errors.push({ 'name error': `name of resource is missing at ${i}` }); }
      if (!('description' in resources[i]) || resources[i].description === '' || resources[i].description === undefined) { errors.push({ 'description error': `description of resource is missing at ${i}` }); }
      if (!('resource_type' in resources[i]) || resources[i].resource_type === '' || resources[i].resource_type === undefined) { errors.push({ 'resource_type error': `type of resource is missing at ${i}` }); }
      if (!('content' in resources[i]) || resources[i].content === '' || resources[i].content === undefined) { errors.push({ 'content error': `content of resource is missing at ${i}` }); }
    }
    if (errors.length > 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  });
// attach resource to patient from pharmacist
router.post('/pharmacists/patient/:patientID/resource',
  (req, res, next) => {
    const resources = req.body;
    const errors = [];
    for (let i = 0; i < resources.length; i += 1) {
      if (!('name' in resources[i]) || resources[i].name === '' || resources[i].name === undefined) { errors.push({ 'name error': `name of resource is missing at ${i}` }); }
      if (!('description' in resources[i]) || resources[i].description === '' || resources[i].description === undefined) { errors.push({ 'description error': `description of resource is missing at ${i}` }); }
      if (!('resource_type' in resources[i]) || resources[i].resource_type === '' || resources[i].resource_type === undefined) { errors.push({ 'resource_type error': `type of resource is missing at ${i}` }); }
      if (!('content' in resources[i]) || resources[i].content === '' || resources[i].content === undefined) { errors.push({ 'content error': `content of resource is missing at ${i}` }); }
    }
    if (errors.length > 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  });
// edit patient profile
router.post('/patients/profile',
  (req, res, next) => {
    const body = req.body;
    const errors = [];
    if (!('email_address' in body) || body.email_address === '' || body.email_address === undefined) { errors.push({ 'email_address error': 'email_address is missing' }); }
    if (!('time_zone' in body) || body.time_zone === '' || body.time_zone === undefined) { errors.push({ 'time_zone error': 'time_zone is missing' }); }
    if (errors.length > 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  });
// edit pharmacist profile
router.post('/pharmacists/profile',
  (req, res, next) => {
    const body = req.body;
    const errors = [];
    if (!('email_address' in body) || body.email_address === '' || body.email_address === undefined) { errors.push({ 'email_address error': 'email_address is missing' }); }
    if (!('time_zone' in body) || body.time_zone === '' || body.time_zone === undefined) { errors.push({ 'time_zone error': 'time_zone is missing' }); }
    if (errors.length > 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  });
// edit subFacility profile
router.post('/sub-facilities/profile',
  (req, res, next) => {
    const body = req.body;
    const errors = [];
    if (!('email_address' in body) || body.email_address === '' || body.email_address === undefined) { errors.push({ 'email_address error': 'email_address is missing' }); }
    if (!('time_zone' in body) || body.time_zone === '' || body.time_zone === undefined) { errors.push({ 'time_zone error': 'time_zone is missing' }); }
    if (errors.length > 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  });
// add room validation
router.post('/pharmacists/room',
  (req, res, next) => {
    const body = req.body;
    const errors = [];
    if (!('type' in body) || body.type === '' || body.type === undefined) { errors.push({ 'type error': 'type is missing' }); }
    if (['MEETING', 'NOTE'].indexOf(body.type) === -1) { errors.push({ 'type error': 'Invalid type value' }); }
    if (errors.length > 0) {
      return res.status(400).send({ errors });
    }
    return next();
  });
export {router};
