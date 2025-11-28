const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET api/students
router.get('/students', studentController.getAllStudents);

// GET api/students/male
router.get('/students/male', studentController.getMaleStudents);

module.exports = router;