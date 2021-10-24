const router = require('express').Router();
const getSingleUser = require('./getSingleUser');
const updateSingleUser = require('./updateSingleUser');

router.use(getSingleUser, updateSingleUser);

module.exports = router;
