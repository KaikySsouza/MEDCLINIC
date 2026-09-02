import type { StringOrBuffer } from 'bun'
import type { NextFunction } from 'express'

export async function HashPassword(password: StringOrBuffer) {
  const hash = await Bun.password.hash(password, {
    algorithm: 'bcrypt',
    cost: 10,
  })
  console.log(hash)
}

export async function PasswordVerify(password: string, passwordverify: string) {
  try {
    await Bun.password.verify(password, passwordverify)
  } catch (error) {
    if (!password || !passwordverify) {
      return { error: 'Senha não fornecida, favor verificar!' }
    }
  }
}
