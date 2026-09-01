import { describe, test, expect } from 'bun:test'
import { CreateUserSchema } from './userSchemas'

describe('CreateUserSchema', () => {
  test('aceita dados válidos', () => {
    const result = CreateUserSchema.safeParse({
      body: {
        name: 'Kaiky Souza',
        email: 'kaiky@email.com',
        cpf: '12345678900',
        password: 'senha1234',
      },
    })
  })
})
