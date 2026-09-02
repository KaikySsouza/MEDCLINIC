
import type { Request, Response, NextFunction } from 'express'
import * as jose from 'jose'
   const secret = new TextEncoder().encode(process.env.SECRET_JWT)
    const alg = 'HS256'


   export async function Jwt(req: Request, res: Response, next: NextFunction ) {


      const jwt = await new jose.SignJWT({
       id: req.body.id,
       name: req.body.name,
       email: req.body.email
      })

      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(secret)
      console.log(jwt)
    }


 export default async function ValidateTokenJwt(req: Request, res: Response, next: NextFunction ) {
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

     await jose.jwtVerify(token, secret)


   next()
 }


