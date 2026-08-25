import { z } from 'zod'
import { Gender } from '../../generated/prisma/enums'

export const CreatePacientSchema = z.object({
  body: z.object({
    dob: z.coerce.date("Data de nascimento inválida"),

    gender: z.enum(Gender, 'Gênero inválido'),

    cep: z
      .string('CEP é obrigatório')
      .min(8, 'CEP deve ter 8 caracteres')
      .max(8, 'CEP deve ter 8 caracteres'),

    address: z
      .string('Endereço é obrigatório')
      .min(5, 'Endereço deve ter no mínimo 5 caracteres')
      .max(100, 'Endereço deve ter no máximo 100 caracteres'),

    telephone: z
      .string('Telefone é obrigatório')
      .min(5, 'Telefone deve ter no mínimo 5 caracteres')
      .max(14, 'Telefone deve ter no máximo 14 caracteres'),
  }),
})

export const UpdatePatientSchema = CreatePacientSchema.extend({
  params: z.object({
    id: z.coerce
      .number('ID deve ser um número')
      .int('ID deve ser um número inteiro')
      .positive('ID deve ser um número positivo'),
  }),
})

export const FindPatientSchema = z.object({
  params: z.object({
    id: z.coerce
      .number('ID deve ser um número')
      .int('ID deve ser um número inteiro')
      .positive('ID deve ser um número positivo'),
  }),
})

export const DeletePatientSchema = z.object({
  params: z.object({
    id: z.coerce
      .number('ID deve ser um número')
      .int('ID deve ser um número inteiro')
      .positive('ID deve ser um número positivo'),
  }),
})
