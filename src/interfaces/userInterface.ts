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
export interface UserUpdate{
  name: string,
  email: string
  password: string
}




