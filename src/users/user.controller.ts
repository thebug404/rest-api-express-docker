import { Request, Response } from 'express'

import { ServiceMethods } from '../declarations'

import { UserNotFound } from '../errors'

import { User } from './user.repository'

export class UserController {
  constructor (private repository: ServiceMethods<User>) {}

  async get (req: Request, res: Response): Promise<void> {
    const items = await this.repository.list()

    res.json({ items })
  }

  async post (req: Request, res: Response): Promise<void> {
    const data = await this.repository.create(req.body)

    res.json(data)
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params || {}
  
      const user = await this.repository.get(userId)
  
      if (!user) throw new UserNotFound('The user you want to delete does not exist.')
  
      const data = await this.repository.remove(userId)
  
      res.json(data)
    } catch (error: any) {
      res.status(error?.statusCode || 500).json(error)
    }
  }
}
