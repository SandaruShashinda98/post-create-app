import { Request, Response } from 'express';
const Post = require('../models/postModal');

exports.addPost = (req: Request, res: Response) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost: { _id: any }) => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id,
    });
  });
};

exports.findPost = (req: Request, res: Response) => {
  Post.find().then((fetchedPost: any) => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: fetchedPost,
    });
  });
};

exports.deletePost = (req: Request, res: Response) => {
  Post.deleteOne({ _id: req.params.id }).then((result: any) => {
    res.status(200).json({ message: 'Post deleted!' });
  });
};
