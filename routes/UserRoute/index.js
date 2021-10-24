const router = require('express').Router();
const getSingleUser = require('./getSingleUser');

router.use(getSingleUser);

module.exports = router;
