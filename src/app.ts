import express, { json } from 'express'
import type { Request,Response } from 'express';
import userRouter from './routes/userRouter.ts';
import PatientRouter from './routes/patientsRouter.ts';



const app = express();
app.use(json())
app.use('/', userRouter, PatientRouter)


const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor up 🚀🚀🚀 http://localhost:${PORT}`)
})


app.get('/api', (req: Request , res: Response ) => {
    res.send({msg: 'Bem vindo!'})
})


