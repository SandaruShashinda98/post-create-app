import { Application, Request, Response } from 'express';
import express from 'express';

const router = express.Router();
const authController = require('../controllers/post.controller');

// add new user
router.post('/signup', (req: Request, res: Response) => {
  authController.addUser(req, res);
});

// login user
router.get('/login', (req: Request, res: Response) => {
  authController.loginUser(req, res);
});

module.exports = router;
