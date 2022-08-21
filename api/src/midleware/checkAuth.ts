const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

module.exports = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, 'secret_this_should_be_longer');
      next();
    } else {
      res.status(401).json({ message: 'Auth failed - M-1' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Auth failed - M-2' });
  }
};
