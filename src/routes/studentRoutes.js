const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET api/students?search=...&gender=...
router.get('/students', studentController.getAllStudents);

module.exports = router;