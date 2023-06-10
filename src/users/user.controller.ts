/* eslint-disable camelcase */
import { Request, Response } from 'express'

import { ServiceMethods } from '@/declarations'

import { UserNotFound } from '@/errors'

import { User } from './user.model'

export class UserController {
  // eslint-disable-next-line no-useless-constructor
  constructor (private repository: ServiceMethods<User>) {}

  async list (req: Request, res: Response): Promise<void> {
    const items = await this.repository.list()

    res.json({ items })
  }

  async get (req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params

      const user = await this.repository.get(userId)

      if (!user) throw new UserNotFound('The user does not exist.')

      res.json(user)
    } catch (error: any) {
      res.status(error?.statusCode || 500).json(error)
    }
  }

  async post (req: Request, res: Response): Promise<void> {
    const data = await this.repository.create(req.body)

    res.json(data)
  }

  async put (req: Request, res: Response): Promise<void> {
    try {
      const { first_name, last_name, email, gender, age } = req.body

      const { userId } = req.params

      const user = await this.repository.get(userId)

      if (!user) throw new UserNotFound('The user you want to update does not exist.')

      const payload = {
        first_name,
        last_name,
        email,
        gender,
        age
      } as User

      const data = await this.repository.patch(userId, payload)

      res.json(data)
    } catch (error: any) {
      res.status(error?.statusCode || 500).json(error)
    }
  }

  async patch (req: Request, res: Response): Promise<void> {
    try {
      const { first_name, last_name, email, gender, age } = req.body

      const { userId } = req.params

      const user = await this.repository.get(userId)

      if (!user) throw new UserNotFound('The user you want to update does not exist.')

      const payload = {
        first_name: first_name ?? user.first_name,
        last_name: last_name ?? user.last_name,
        email: email ?? user.email,
        gender: gender ?? user.gender,
        age: age ?? user.age
      } as User

      const data = await this.repository.patch(userId, payload)

      res.json(data)
    } catch (error: any) {
      res.status(error?.statusCode || 500).json(error)
    }
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
