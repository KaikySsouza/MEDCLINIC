import express from 'express'
import { DeleteUser, findAllUsers, FindUser, UpdateUser, UserCreate } from '../controllers/usersController'

const userRouter = express()

userRouter.get('/users', findAllUsers)
userRouter.put('/update/:id', UpdateUser)
userRouter.post('/register', UserCreate)
userRouter.post('/login', FindUser)
userRouter.delete('/user/:id', DeleteUser)

export default userRouter
