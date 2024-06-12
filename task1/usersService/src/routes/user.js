const express = require('express');

const { createUser, editUser, getUsers } = require('../controllers/user');

const router = express.Router();

router.post('/create', createUser);
router.post('/edit/:id', editUser);
router.get('/getAll', getUsers);

module.exports = router;