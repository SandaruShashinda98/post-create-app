"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post = require("../models/postModal");
const router = express_1.default.Router();
router.post("", (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then((createdPost) => {
        res.status(201).json({
            message: "Post added successfully",
            postId: createdPost._id
        });
    });
});
router.get("", (req, res) => {
    Post.find().then((fetchedPost) => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: fetchedPost
        });
    });
});
router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json({ message: "Post deleted!" });
    });
});
module.exports = router;
