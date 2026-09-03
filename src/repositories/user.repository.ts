import type { Usable } from "react";
import { prisma } from "../lib/prisma";
import type { UserInterface } from "../interfaces/userInterface";
import HTTPException from "../middlewares/httpExeception";

class UsersRepository {


 async userFind(email: string) {
   return  await prisma.users.findUnique({where: {email}})
 }

 
  async userCreate(name: string, email: string, cpf: string, password: string)  {
    await prisma.users.create({
      data: {
        name,
        email,
        cpf,
        password
      }
    })
  }
  }





export {UsersRepository}
