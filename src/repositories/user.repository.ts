

import { prisma } from '../lib/prisma'
import HTTPException from '../middlewares/httpExeception'
import { HashPassword, PasswordVerify } from '../utils/hash'



class UsersRepository {

  async userFind(email: string) {
    return await prisma.users.findUnique({ where: { email } })
  }

  async userCreate(name: string, email: string, cpf: string, password: string) {

   const hash = await HashPassword(password)

    await prisma.users.create({
      data: {
        name,
        email,
        cpf,
        password: hash
      },
    })
  }


  async userLogin( email: string, cpf: string, password: string) {

   const user =  await prisma.users.findFirst({
      where: {OR: [{email}, {cpf}]}
    })

    if(!user) {
       throw new HTTPException('Usuário não encontrado', 404)
    }

 const Validate = await PasswordVerify(password, user.password)

   if (!Validate) {
      throw new HTTPException('Senha incorreta!', 404)
    }
    console.log(user)
    return user
  }


  async userFindMany() {
    const users = await prisma.users.findMany()
    return users
  }
}

export { UsersRepository }
