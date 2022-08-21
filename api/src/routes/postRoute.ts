import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
const Post = require("../models/postModal");

const checkAuth = require("../midleware/checkAuth");

const router = express.Router();

router.post("", checkAuth, (req: Request, res: Response) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((createdPost: { _id: any; }) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

router.get("", (req: Request, res: Response) => {
  Post.find().then((fetchedPost: any) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchedPost
    });
  });
});

router.delete("/:id", (req: Request, res: Response, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result: any) => {
    res.status(200).json({ message: "Post deleted!" });
  });
});


module.exports = router;
