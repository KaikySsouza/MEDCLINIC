export interface UserInterface {
  name: string
  email: string
  cpf: string
  password: string
}

export interface UserFind{
  id: number,
  name: string
  email: string,
  cpf: string,
  password: string
}

export type UserId = Pick<UserFind, 'id'>
export interface UserUpdate{
  name: string,
  email: string
  password: string
}


    declare global {
  namespace Express {

    interface UserReq{
      id: number | string

    }
     interface Request {
      user: UserReq;
    }
  }
}


