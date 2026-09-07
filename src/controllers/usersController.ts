import type { NextFunction, Request, Response } from 'express'
import type {
  UserFind,
  UserInterface,
  UserUpdate,
} from '../interfaces/userInterface'
import { prisma } from '../lib/prisma'
import type { Params } from '../interfaces/paramsInterface'
import { UsersService } from '../services/user.service'
import { UsersRepository } from '../repositories/user.repository'




const usersRepository = new UsersRepository()
const usersService = new UsersService(usersRepository)

export const UserCreate = async (
  req: Request<{}, {}, UserInterface>,  res: Response): Promise<void> => {

  await usersService.create(req.body)
  res.status(201).json({ msg: 'Cadastro realizado!' })

}

export const UserLogin = async (
  req: Request<{}, {}, UserFind>,
  res: Response, next: NextFunction
): Promise<void> => {


 const token = await usersService.login(req.body)

 res.status(200).json({msg: 'login realizado com sucesso', token})

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
  await prisma.users.update({
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
   await prisma.users.delete({
    where: {id },
  })
  res.status(200).json({msg: `Usúario removido do sistema!` })
}
