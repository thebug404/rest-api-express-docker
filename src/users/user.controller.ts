import { Request, Response } from 'express'

export class UserController {
  async get (req: Request, res: Response): Promise<void> {
    res.json({ name: 'GET /users' })
  }

  async post (req: Request, res: Response): Promise<void> {
    res.json({ message: 'POST /users' })
  }
}
