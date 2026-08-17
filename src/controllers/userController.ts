import type { NextFunction, Request, Response } from 'express'
import type { Params, UserInterface, UserUpdate } from '../interfaces/userInterface'
import { prisma } from '../lib/prisma'

export const UserCreate = async (
  req: Request<{}, {}, UserInterface>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, cpf, password } = req.body
  const user = await prisma.users.create({
    data: {
      name,
      email,
      cpf,
      password,
    },
  })
  res.status(201).json(user)
}

export const FindUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await prisma.users.findUnique({
    where: {
      email,
      password,
    },
  })
  res.status(201).json(user)
}

export const findAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.users.findMany()
  res.status(201).json(users)
}


export const UpdateUser = async (req: Request<Params, {}, UserUpdate>, res: Response) => {
  const {name, email, password} = req.body
  const user = await prisma.users.update({
    where: { id:  req.params.id},

    data: {
      name,
      email,
      password
    }
  })
  res.status(201).json(user)
}

export const DeleteUser = async (req: Request<Params>, res: Response) => {
  const user = await prisma.users.delete({
    where: { id: req.params.id},
  })
  res.status(201).json(user)
}
