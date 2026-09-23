import type {Request, Response } from 'express'
import type { IUserService, UserFind, UserInterface, UserUpdate,} from '../interfaces/userInterface'
import type { Params } from '../interfaces/paramsInterface'







 export class UserController {
  constructor(private readonly usersService: IUserService){}

  UserCreate = async (
  req: Request<{}, {}, UserInterface>,  res: Response): Promise<void> => {
  await this.usersService.create(req.body)
  res.status(201).json({ msg: 'Cadastro realizado!' })

}

  UserLogin = async (
  req: Request<{}, {}, UserFind>,
  res: Response,
) => {

 const token = await this.usersService.login(req.body)
 res.status(200).json({msg: 'login realizado com sucesso', token})

}

  findAllUsers = async (req: Request, res: Response) => {
  const users = await this.usersService.findusers()
  res.status(201).json(users)
}


  UpdateUser = async (
  req: Request<Params, {}, UserUpdate>,
  res: Response
) => {

  await this.usersService.update(req.body, req.user)
  res.status(200).json({msg:'Usúario atualizado!'})
}

  DeleteUser = async (req: Request<Params>, res: Response) => {
  await this.usersService.delete(req.user)
  res.status(200).json({msg: `Usúario removido do sistema!` })
}


}
