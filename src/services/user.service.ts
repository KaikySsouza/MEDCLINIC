import type { UserFind, UserInterface } from "../interfaces/userInterface"
import { UsersRepository } from "../repositories/user.repository"
import HTTPException from "../middlewares/httpExeception"
import { Jwt } from "../utils/jwt"






class UsersService {
  constructor(
    private usersRepository: UsersRepository
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


  async findusers() {
    const users = await this.usersRepository.userFindMany()
    return users
  }
}


export {UsersService}
