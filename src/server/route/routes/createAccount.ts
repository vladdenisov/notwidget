import router from '../router';
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import userModel from '../../models/user.model';
import { configs } from '../../configs';
import { nanoid } from 'nanoid';
import { IRequest } from '../../domain/IRequest';

router.route('/createaccount')
    .post(async (req: IRequest, res: Response) => {
      const {username, password, email}: { username: string, email: string, password: string } = req.body;
      const user = await userModel.findOne({$or: [{username}, {email}]})
      if (user) {
        return res.status(409).json({
          status: 409,
          error: "User is already created"
        })
      }
      const passwordHash = await bcrypt.hash(password, configs.saltRounds)
      console.log(password)
      const createdUser = new userModel({
        id: nanoid(10),
        email,
        username,
        widgets: [],
        isEmailVerified: false,
        password: passwordHash
      })
      console.log(createdUser)
      await createdUser.save()
      return res.status(200).json({
        status: 200
      })
    })

export default router;
