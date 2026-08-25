import { password } from "bun"
import type { Request, Response } from "express"
import * as z from "zod"
 

export const CreateUserSchema =   z.object({
 body: z.object({
  name: z.string('Nome não pode ser números').min(2).max(100),
  email: z.email('Favor informa email!').min(8).max(100),
  cpf: z.string('Favor informa CPF!').min(11).max(11),
  password: z.string('Favor informa senha!').min(8).max(12),
 })

})



