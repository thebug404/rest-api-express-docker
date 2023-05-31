import { Request, Response } from 'express'

export const notFound = (req: Request, res: Response) => {
  const message = 'Resource not found.'

  const name = 'NotFound'

  const statusCode = 404

  res.status(statusCode).json({ name, message })
}
