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

    expect(result.success).toBe(true)
  })

  test('rejeita email inválido', () => {
    const result = CreateUserSchema.safeParse({
      body: {
        name: 'Kaiky Souza',
        email: 'nao-e-email',
        cpf: '12345678900',
        password: 'senha1234',
      },
    })

    expect(result.success).toBe(false)
  })

  test('rejeita senha curta demais', () => {
    const result = CreateUserSchema.safeParse({
      body: {
        name: 'Kaiky Souza',
        email: 'kaiky@email.com',
        cpf: '12345678900',
        password: '123',
      },
    })

    expect(result.success).toBe(false)
  })

  test('rejeita CPF com tamanho errado', () => {
    const result = CreateUserSchema.safeParse({
      body: {
        name: 'Kaiky Souza',
        email: 'kaiky@email.com',
        cpf: '123',
        password: 'senha1234',
      },
    })

    expect(result.success).toBe(false)
  })
})
