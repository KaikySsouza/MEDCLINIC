import type { Request, Response, NextFunction } from 'express'
import z, { ZodType } from 'zod'

export function validate(schema: ZodType) {
   return async ( req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(401).json({error: error.issues.map(err => err.message)})
        return
      }
      next(error)
    }
  }
}
