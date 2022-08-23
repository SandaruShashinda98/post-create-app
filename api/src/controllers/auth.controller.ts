import { Request, Response } from 'express';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

exports.addUser = (req: Request, res: Response) => {
  bcrypt.hash(req.body.password, 10).then((hash: any) => {
    const user = new User({
      userName: req.body.userName,
      password: hash,
    });
    user
      .save()
      .then((result: any) => {
        res.status(201).json({
          message: 'User created!',
          result: result,
        });
      })
      .catch((err: any) => {
        res.status(500).json({
          error: err,
        });
      });
  });
};

exports.loginUser = (req: Request, res: Response) => {
  let fetchedUser: any;

  User.findOne({ userName: req.body.userName })
    .then((user: any) => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed 1',
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result: any) => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed 2',
        });
      }
      const token = jwt.sign(
        { userName: fetchedUser.userName, userId: fetchedUser._id },
        'secret_this_should_be_longer',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err: any) => {
      return res.status(401).json({
        message: 'Auth failed 3',
      });
    });
};
