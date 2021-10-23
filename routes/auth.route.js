const router = require('express').Router();
const { signUp } = require('../controllers/auth.controller');
const { validateUserSignIn } = require('../middlewares/auth');
const bodyvalidator = require('../util/body_validator');

router.post('/signup', validateUserSignIn(), bodyvalidator, signUp);

module.exports = router;
