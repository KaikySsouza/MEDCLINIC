import express from 'express'
import { DeleteUser, findAllUsers, FindUser, UpdateUser, UserCreate } from '../controllers/usersController'
import TokenJwtValidation from '../middlewares/tokenjwtValidation'

const userRouter = express()

userRouter.get('/users',TokenJwtValidation, findAllUsers)
userRouter.put('/update/:id', UpdateUser)
userRouter.post('/register', UserCreate)
userRouter.post('/login',TokenJwtValidation,  FindUser)
userRouter.delete('/user/:id', DeleteUser)

export default userRouter
