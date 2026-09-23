import type { IUserRepo, IUserService, UserFind, UserInterface, UserUpdate } from "../interfaces/userInterface"
import { UsersRepository } from "../repositories/user.repository"
import HTTPException from "../middlewares/httpExeception"
import { Jwt } from "../utils/jwt"






class UsersService implements IUserService {
  constructor(
    private readonly usersRepository: IUserRepo
  ) {}


  async create(data: UserInterface){
    const user = await this.usersRepository.userFind(data.email)

      if(user) {
        throw new HTTPException('Usúario já cadastrado, favor realizar login!', 401)
      }


    await this.usersRepository.userCreate(data.name, data.email, data.cpf, data.password)
  }


  async login(data: UserFind) {

  const user =   await this.usersRepository.userLogin(data.email, data.cpf, data.password)
  const jwt =  await Jwt(user.id, user.name, user.email)
  return jwt
  }


  async findusers(): Promise<UserInterface[]> {
    const users = await this.usersRepository.userFindMany()
    return users
  }


  async update( data: UserUpdate, id: Express.UserReq ) {
    const update = await this.usersRepository.userUpdate(data.name, data.email, data.password, id)
    return update
  }

  async delete(id: Express.UserReq) {
    const userDelete = await this.usersRepository.userDelete(id)
    return userDelete


  }
}


export {UsersService}
