const router = require('express').Router();
const signup = require('./signup');
const login = require('./login');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
