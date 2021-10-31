const router = require('express').Router();
const { info } = require('../../controllers/auth.controller');

router.get('/info', info);

module.exports = router;
