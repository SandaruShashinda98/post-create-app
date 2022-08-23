import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();
const checkAuth = require('../midleware/checkAuth');
const postController = require('../controllers/post.controller');

// add new post
router.post('', checkAuth, (req: Request, res: Response) => {
  postController.addPost(req, res);
});

// find post
router.get('', checkAuth, (req: Request, res: Response) => {
  postController.findPost(req, res);
});

// delete post
router.delete('', checkAuth, (req: Request, res: Response) => {
  postController.deletePost(req, res);
});

module.exports = router;
