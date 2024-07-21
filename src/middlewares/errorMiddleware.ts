import { NextFunction, Request, Response } from 'express'
import { CustomException } from '../helpers/customException'

export const errorMiddleware = (
    err: Error & Partial<CustomException>, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    console.log(err.statusCode)
    const statusCode = err.statusCode ?? 500
    const message = err.statusCode ? err.message : 'Internal Server Error'
    return res.status(statusCode).json({message})
    
}