import app from "../app";
import { UserController } from "../controllers/usersController";
import { UsersRepository } from "../repositories/user.repository";
import { UsersService } from "../services/user.service";

const repository = new UsersRepository()
const service = new UsersService(repository)
const controller = new UserController(service)


export {controller}

