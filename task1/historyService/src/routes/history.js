const express = require('express');
const { getHistory, pushHistory } = require('../controllers/history');

const router = express.Router();

// общая ссылка вида .../api/history/:id
router.get('/:id', getHistory);
router.post('/push', pushHistory);

module.exports = router;