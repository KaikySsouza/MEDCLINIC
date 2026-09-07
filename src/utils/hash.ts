import type { StringOrBuffer } from 'bun'
import HTTPException from '../middlewares/httpExeception'

export async function HashPassword(password: StringOrBuffer) {
  const hash = await Bun.password.hash(password, {
    algorithm: 'bcrypt',
    cost: 10,
  })
  return hash
}

export async function PasswordVerify(password: string, passwordverify: string) {
  try {
    const Validate = await Bun.password.verify(password, passwordverify)
    return Validate
  } catch (error) {
    return console.log(error)
  }
}
