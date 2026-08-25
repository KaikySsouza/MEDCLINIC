import express from 'express'
import { DeleteUser, findAllUsers, FindUser, UpdateUser, UserCreate } from '../controllers/usersController'
import TokenJwtValidation from '../middlewares/tokenjwtValidation'

import { CreateUserSchema } from '../schemas/userSchemas'
import { handleValidation } from '../middlewares/validationMiddleware'


const userRouter = express()

userRouter.get('/users',TokenJwtValidation, findAllUsers)
userRouter.put('/update/:id', UpdateUser)
userRouter.post('/register', handleValidation(CreateUserSchema) , UserCreate)
userRouter.post('/login',  FindUser)
userRouter.delete('/user/:id', DeleteUser)

export default userRouter
