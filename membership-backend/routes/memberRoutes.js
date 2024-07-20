const express = require('express');
const { getAllMembers, createMember } = require('../controllers/memberController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getAllMembers);
// router.get('/', getAllMembers)
router.post('/', authMiddleware, createMember);
// router.post('/', createMember)

module.exports = router;
