import type { Request, Response,NextFunction } from "express";
import * as jose from 'jose'

 export default async function TokenJwtValidation(req: Request, res: Response, next: NextFunction ) {
    const headers = req.headers.authorization

    if(!headers) {
      return res.status(401).json({Error: 'Token não informado'})
    }

    const token = headers.split(' ')[1]

    if(!token) {
      return res.status(401).json({msg: 'Usúario não autorizado!'})
    }

    const keyEnv = process.env.SECRET_JWT

    if(!keyEnv) {
      return res.status(401).json({msg: 'ENV-JWT não informada'})
    }



    const secret = new TextEncoder().encode(keyEnv)

     const ValidToken = await jose.jwtVerify(token, secret)
    console.log(ValidToken)

   next()
 }
