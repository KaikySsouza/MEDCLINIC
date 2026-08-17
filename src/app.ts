import express from 'express'
import type { Request,Response } from 'express';
import { prisma } from './lib/prisma.ts';


const app = express();


const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor up 🚀🚀🚀 http://localhost:${PORT}`)
})


app.get('/api', (req: Request , res: Response ) => {
    res.send({msg: 'Bem vindo!'})
})



export default async function main() {
  const user = await prisma.users.create({
    data: {
      name: 'Kaiky',
      email: 'kaikybelga@gmail.com',
      cpf: '70420357637',
      password: 'kaiky2005@@'
    }
  })
  console.log("Created user", user)
}

main()



