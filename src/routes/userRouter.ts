import express from 'express'
import { DeleteUser, findAllUsers, UserLogin, UpdateUser, UserCreate } from '../controllers/usersController'
import TokenJwtValidation from '../middlewares/tokenjwtValidation'
import { CreateUserSchema, DeleteUserSchema, UpdateUserSchema, UserLoginSchema } from '../schemas/userSchemas'
import { validate } from '../middlewares/validationMiddleware'


const userRouter = express()

userRouter.get('/users',TokenJwtValidation, findAllUsers)
userRouter.put('/update/:id', validate(UpdateUserSchema), UpdateUser)
userRouter.post('/register',  UserCreate)
userRouter.post('/login', validate(UserLoginSchema),  UserLogin)
userRouter.delete('/user/:id',validate(DeleteUserSchema), DeleteUser)

export default userRouter
