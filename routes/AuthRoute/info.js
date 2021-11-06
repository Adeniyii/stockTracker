const router = require('express').Router();
const auth = require('../../auth/auth');
const { info } = require('../../controllers/auth.controller');

router.get('/info', auth, info);

module.exports = router;
