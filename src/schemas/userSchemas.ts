import { z } from 'zod'

export const CreateUserSchema = z.object({
  body: z.object({
    name: z
      .string({ error: 'Nome é obrigatório' })
      .min(2, 'Nome deve ter no mínimo 2 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),

    email: z
      .email({ error: 'E-mail inválido' })
      .max(100, 'E-mail deve ter no máximo 100 caracteres'),

    cpf: z
      .string({ error: 'CPF é obrigatório' })
      .min(11, 'CPF deve ter 11 caracteres')
      .max(11, 'CPF deve ter 11 caracteres'),

    password: z
      .string({ error: 'Senha é obrigatória' })
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .max(12, 'Senha deve ter no máximo 12 caracteres'),
  }),
})

export const UserLoginSchema = z.object({
  body: z.object({
    email: z
      .email({ error: 'E-mail inválido' })
      .max(100, 'E-mail deve ter no máximo 100 caracteres'),
  }),
})

export const UpdateUserSchema = z.object({
  params: z.object({
    id: z.coerce
      .number({ error: 'ID deve ser um número' })
      .int('ID deve ser um número inteiro')
      .positive('ID deve ser um número positivo'),
  }),

  body: z.object({
          name: z
      .string({ error: 'Nome é obrigatório' })
      .min(2, 'Nome deve ter no mínimo 2 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),

    email: z
      .email({ error: 'E-mail inválido' })
      .max(100, 'E-mail deve ter no máximo 100 caracteres'),


    password: z
      .string({ error: 'Senha é obrigatória' })
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .max(12, 'Senha deve ter no máximo 12 caracteres'),
  }),
  })


export const DeleteUserSchema = z.object({
  params: z.object({
    id: z.coerce
      .number({ error: 'ID deve ser um número' })
      .int('ID deve ser um número inteiro')
      .positive('ID deve ser um número positivo'),
  }),
})
