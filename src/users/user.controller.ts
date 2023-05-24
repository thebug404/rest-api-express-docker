import { Request, Response } from 'express'

import { ServiceMethods } from '../declarations'

import { User } from './user.repository'

export class UserController {
  constructor (private repository: ServiceMethods<User>) {}

  async get (req: Request, res: Response): Promise<void> {
    const items = await this.repository.list()

    res.json({ items })
  }

  async post (req: Request, res: Response): Promise<void> {
    res.json({ message: 'POST /users' })
  }
}
