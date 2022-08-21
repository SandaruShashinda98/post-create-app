"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose = require('mongoose');
const Post = require("./models/postModal");
const app = (0, express_1.default)();
const postsRoute = require("./routes/postRoute");
mongoose.connect("mongodb+srv://sandaru:sandaru123@cluster0.z1bfc.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    console.log("connected to database");
}).catch(() => {
    console.log("Connection failed!");
});
app.listen(5000, () => { console.log("server running"); });
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});
app.use("/api/posts", postsRoute);
module.exports = app;
