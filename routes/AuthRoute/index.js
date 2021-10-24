const router = require('express').Router();
const signup = require('./signup');
const login = require('./login');

router.use(signup, login);

module.exports = router;
