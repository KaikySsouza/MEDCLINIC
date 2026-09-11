import express from 'express'
import { DeleteUser, findAllUsers, UserLogin, UpdateUser, UserCreate } from '../controllers/usersController'
import ValidateTokenJwt from '../utils/jwt'




const userRouter = express()


userRouter.post('/register', UserCreate)
userRouter.post('/login', UserLogin)
userRouter.get('/users',ValidateTokenJwt, findAllUsers)
userRouter.put('/update-user',ValidateTokenJwt, UpdateUser)
userRouter.delete('/user/delete-account',ValidateTokenJwt, DeleteUser)

export default userRouter
