const router = require('express').Router();
const signup = require('./signup');
const login = require('./login');
const info = require('./info');
const refresh = require('./refreshToken');

router.use(signup, login, refresh, info);

module.exports = router;
