import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from 'bun:test'
import request from 'supertest'
import app from '../app'
import { faker } from '@faker-js/faker'
import { prisma } from '../lib/prisma'

let userid: Number
const randomName = faker.person.fullName()
const randomEmail = faker.internet.email()
const randomNumber = faker.number.int({
  min: 10000000000,
  max: 99999999999,
})

const user = prisma.users.delete
describe('usersController.ts', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    const user = await prisma.users.create({
      data: {
        name: randomName,
        email: randomEmail,
        cpf: String(randomNumber),
        password: String(randomNumber),
      },
    })
    userid = user.id
  })

  afterEach(async () => {
    await prisma.users.deleteMany({ where: { id: Number(userid) } })
  })

  test('POST/register/ retorna usúario', async () => {
    const response = await request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        cpf: String(faker.number.int({ min: 10000000000, max: 99999999999 })),
        password: String(
          faker.number.int({ min: 10000000000, max: 99999999999 })
        ),

        
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({ msg: 'Cadastro realizado!' })
  })

  test('POST/register/ retorna usúario encontrado e dispara o throw Error', async () => {
    const response = await request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send({
        email: 'Chaz83@gmail.com',
        cpf: '37502393544',
      })

    expect(response.status).toBe(409)
    expect(response.body).toEqual({
      Error: 'Dados já cadastrado na base de dados, favor realizar login.',
    })
  })

  test('POST/Login retorna usúario logado ', async () => {
    const response = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@email.com',
        password: 'senha1234',
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({ msg: 'Login realizado com sucesso!' })
  })

  test('POST/Login retorna usúario com credenciais invalidas', async () => {
    const response = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@email.com',
        password: randomNumber, // password incorreta!!!
      })
    expect(response.status).toBe(401)
    expect(response.body).toEqual({ msg: 'Credenciais invalidas!' })
  })

  test('Get/findAllUsers', async () => {
    const response = await request(app)
      .get('/users')
      .set(
        'Authorization',
        `Bearer ${['eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MjksIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImV4cCI6MTc4ODI4NTEyMH0._7oEFj8q7GXaDEeR47J540jdfVeAOyz_5VHfMExJIWQ']}`
      )

    expect(response.status).toBe(201)
  })

  test('PUT/ retorna usúario atualizado', async () => {
    const response = await request(app)
      .put(`/update/${userid}`)
      .send({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: String(faker.number.int({ min: 10000000000, max: 99999999999 })),
      })

      .set('Accept', 'application/json')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ msg: 'Usúario atualizado!' })
  })

  test('Delete/ retorna usúario deletado ', async () => {
    const response = await request(app)
      .delete(`/user/${userid}`)
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ msg: `Usúario removido do sistema!` })
  })
})
