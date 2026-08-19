import type { NextFunction, Request, Response } from "express";
import HTTPException from "./httpExeception";
export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
  if(err instanceof HTTPException) {
        return res.status(err.statusCode).json({Error: err.message})
  }else {
    return res.status(500).json({Error: err.message})
  }
}
