import type { Usable } from "react";
import { prisma } from "../lib/prisma";
import type { UserInterface } from "../interfaces/userInterface";
import HTTPException from "../middlewares/httpExeception";
import { HashPassword } from "../utils/hash";

class UsersRepository {


 async userFind(email: string) {
   return  await prisma.users.findUnique({where: {email}})
 }


  async userCreate(name: string, email: string, cpf: string, password: string)  {
    const hash = await HashPassword(password)
    await prisma.users.create({
      data: {
        name,
        email,
        cpf,
        password: String(hash)
      }
    })
  }
  }





export {UsersRepository}
