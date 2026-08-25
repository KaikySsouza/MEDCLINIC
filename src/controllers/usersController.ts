import type { NextFunction, Request, Response } from 'express'
import type {
  UserFind,
  UserInterface,
  UserUpdate,
} from '../interfaces/userInterface'
import { prisma } from '../lib/prisma'
import type { Params } from '../interfaces/reqParams'
import HTTPException from '../middlewares/httpExeception'
import * as jose from 'jose'
import { CreateUserSchema } from '../schemas/userSchemas'
 import * as z from "zod"

export const UserCreate = async (
  req: Request<{}, {}, UserInterface>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, cpf, password } = req.body






  const finduser = await prisma.users.findFirst({
    where: {
      OR: [{ email }, { cpf }],
    },
  })

  if (finduser) {
    throw new HTTPException(
      'Dados já cadastrado na base de dados, favor realizar login.',
      409
    )
  }


  const hash = await Bun.password.hash(password, {
    algorithm: 'bcrypt',
    cost: 10,
  })

  const user = await prisma.users.create({
    data: {
      name,
      email,
      cpf,
      password: hash,
    },
  })

  console.log(user)
  res.status(201).json({ msg: 'Cadastro realizado!' })
}


export const FindUser = async (
  req: Request<{}, {}, UserFind>,
  res: Response
): Promise<void> => {
  const { email, cpf, password } = req.body

  const user = await prisma.users.findFirst({
    where: {
      OR: [{ email }, { cpf }],
    },
  })
  const passwordverify = user
    ? await Bun.password.verify(password, user.password)
    : false

  if (!user || !passwordverify) {
    res.status(401).json({ msg: 'Credenciais invalidas!' })
  } else {
    const secret = new TextEncoder().encode(process.env.SECRET_JWT)
    const alg = 'HS256'

    const jwt = await new jose.SignJWT({
      id: user.id,
      name: user.name,
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(secret)

    console.log(jwt)
    res.status(201).json({ msg: 'Login realizado com sucesso!' })
  }
}

export const findAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.users.findMany()
  res.status(201).json(users)
}

export const UpdateUser = async (
  req: Request<Params, {}, UserUpdate>,
  res: Response
) => {
  const { name, email, password } = req.body
  const user = await prisma.users.update({
    where: { id: req.params.id },

    data: {
      name,
      email,
      password,
    },
  })
  res.status(201).json(user)
}

export const DeleteUser = async (req: Request<Params>, res: Response) => {
  const user = await prisma.users.delete({
    where: { id: req.params.id },
  })
  res.status(201).json(user)
}
