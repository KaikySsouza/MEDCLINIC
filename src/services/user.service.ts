import type { UserInterface } from "../interfaces/userInterface"
import { UsersRepository } from "../repositories/user.repository"
import HTTPException from "../middlewares/httpExeception"





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




}


export {UsersService}
