/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken"
import { configs } from "../configs";
import userModel from "../models/user.model";
import { Response } from "express";
import { IToken } from "../domain/IToken";
import { IRequest } from "../domain/IRequest";
export default (req: any, res: Response, next: (param?: unknown) => void): void => {
  if (['/login', '/createaccount'].includes(req.url)) {
    next()
  }
  const token = req.headers.authorization ? req.headers.authorization : ""
  const decodedTokenData = jwt.verify(token, configs.secret)
  if (decodedTokenData === "string") {
    res.status(403).json({
      error: 'Token invalid'
    })
    return
  }
  const tokenData = decodedTokenData as IToken
  userModel.findOne({ _id: tokenData._id }, (err: any, doc: any) => {
    if (err) {
      res.status(401).json({error: 'User not found'})
      return
    } else {
      req.currentUser = doc;
      return next();
    }
  })
  return
}