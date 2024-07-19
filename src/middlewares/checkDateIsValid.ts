import { NextFunction, Request, Response } from 'express'
import z from 'zod'

export function checkDateIsValid(
    request: Request, response: Response, next: NextFunction
): void {
    const dateQueryParamsValid = z.coerce.date()
    const validDatestart = dateQueryParamsValid.safeParse(request.query.startDate).success
    const validDateEnd = dateQueryParamsValid.safeParse(request.query.endDate).success

    if (!validDatestart || !validDateEnd) {
        response.status(400).send({
            error: 'Invalid date',
        })
    }
    next()
}
