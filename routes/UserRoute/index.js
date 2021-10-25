const router = require('express').Router();
const getSingleUser = require('./getSingleUser');
const updateSingleUser = require('./updateSingleUser');
const activateUser = require('./activateUser');
const verifyUser = require('./verifyUser');

router.use(getSingleUser, updateSingleUser, activateUser, verifyUser);

module.exports = router;
