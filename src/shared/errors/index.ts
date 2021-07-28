/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

import AppError from './AppError'

export function getAppErrors (error: Error, _: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Interal Server Error',
  })
}

export { AppError }
