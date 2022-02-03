import router from '../router';
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import userModel from '../../models/user.model';
import jwt from "jsonwebtoken"
import { configs } from '../../configs';


router.route('/login')
    .post(async (req: Request, res: Response) => {
      const {username, password, email}: { username?: string, email?: string, password: string } = req.body;
      const user = await userModel.findOne({$or: [{username}, {email}]})
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: "User not found"
        })
      }
      const isPasswordCorrect = await bcrypt.compare(password, user?.password)
      if (!isPasswordCorrect) {
        return res.status(403).json({
          status: 403,
          error: "Password incorrect"
        })
      }
      const token = jwt.sign({
        id: user.id,
        _id: user._id
      }, configs.secret)
      return res.status(200).json({
        status: 200,
        token: token
      })
    })

export default router;
