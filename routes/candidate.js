const express = require('express');
const con = require('../connection');
const router = express.Router();
const candInfo = require('./candidate/candInfo');


router.use('/candInfo', candInfo);
module.exports = router;
