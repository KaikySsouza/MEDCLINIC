import type { NextFunction, Request, Response } from 'express'
import type {
  UserFind,
  UserInterface,
  UserUpdate,
} from '../interfaces/userInterface'
import { prisma } from '../lib/prisma'
import type { Params } from '../interfaces/paramsInterface'
import HTTPException from '../middlewares/httpExeception'
import { HashPassword, PasswordVerify } from '../utils/hash'
import { Jwt } from '../utils/jwt'



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




   await prisma.users.create({
    data: {
      name,
      email,
      cpf,
      password: String(HashPassword(password)),
    },
  })


  res.status(201).json({ msg: 'Cadastro realizado!' })
}


export const UserLogin = async (
  req: Request<{}, {}, UserFind>,
  res: Response, next: NextFunction
): Promise<void> => {
  const { email, cpf, password } = req.body

  const user = await prisma.users.findFirst({
    where: {
      OR: [{ email }, { cpf }],
    },
  })

  const passwordverify = user?.password
   PasswordVerify(password, String(passwordverify))

  if (!user || !passwordverify) {
    res.status(401).json({ msg: 'Credenciais invalidas!' })
  } else {

    res.status(201).json({ msg: 'Login realizado com sucesso!' })
  }


  Jwt( Number(user?.id), String(user?.name), String(user?.password))

  next()
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
  const  id  = Number(req.params.id)
  const user = await prisma.users.update({
    where: { id },

    data: {
      name,
      email,
      password,
    },
  })
  res.status(200).json({msg:'Usúario atualizado!'})
}

export const DeleteUser = async (req: Request<Params>, res: Response) => {
  const  id  = Number(req.params.id)
  const user = await prisma.users.delete({
    where: {id },
  })
  res.status(200).json({msg: `Usúario removido do sistema!` })
}
