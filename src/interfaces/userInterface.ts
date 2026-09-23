import type { Interface } from "node:readline"
import { UserController } from "../controllers/usersController"
import { UsersRepository } from "../repositories/user.repository"

export interface UserInterface {
  name: string
  email: string
  cpf: string
  password: string
}

export interface UserFind{
  id: number,
  name: string
  email: string,
  cpf: string,
  password: string
}

export type UserId = Pick<UserFind, 'id'>
export interface UserUpdate{
  name: string,
  email: string
  password: string
}


    declare global {
  namespace Express {

    interface UserReq{
      id: number | string

    }
     interface Request {
      user: UserReq;
    }
  }
}

export interface IUserController  {
 UserCreate(): Promise<void>
 UserLogin(): Promise<void>
 findAllUsers(): Promise<void>
 UpdateUser(): Promise<void>
 DeleteUser(): Promise<void>
}


export interface IUserService {
  create(data: UserInterface): Promise<void>
  login(data: UserFind): Promise<string>
  findusers(): Promise<UserInterface[]>
  update(data: UserUpdate, id: Express.UserReq): Promise<UserUpdate>
  delete(id: Express.UserReq): Promise<UserInterface>
}


export interface IUserRepo {
  userFind(email: string): Promise<UserFind | null>
  userCreate(name: string, email: string, cpf: string, password: string): Promise<void>
  userLogin( email: string, cpf: string, password: string): Promise<UserFind>
  userFindMany(): Promise<UserInterface[]>
  userUpdate(name: string, email: string, password: string, userid: Express.UserReq): Promise<UserInterface>
  userDelete(userid: Express.UserReq): Promise<UserInterface>
}
