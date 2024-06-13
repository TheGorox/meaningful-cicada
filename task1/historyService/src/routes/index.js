const express = require('express');

const historyRouter = require('./history');

const router = express.Router();

router.use('/history', historyRouter);

module.exports = router;