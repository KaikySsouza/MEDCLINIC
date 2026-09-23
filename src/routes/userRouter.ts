import express from 'express'

import ValidateTokenJwt from '../utils/jwt'
import { controller } from '../container/composition-root'




 const userRouter = express()


userRouter.post('/register', controller.UserCreate  )
 userRouter.post('/login', controller.UserLogin  )
 userRouter.get('/users',ValidateTokenJwt, controller.findAllUsers )
 userRouter.put('/update-user',ValidateTokenJwt, controller.UpdateUser )
userRouter.delete('/user/delete-account',ValidateTokenJwt,  controller.DeleteUser)

export default userRouter
