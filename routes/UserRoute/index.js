const router = require('express').Router();
const getSingleUser = require('./getSingleUser');
const updateSingleUser = require('./updateSingleUser');
const activateUser = require('./activateUser');

router.use(getSingleUser, updateSingleUser, activateUser);

module.exports = router;
