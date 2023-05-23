import { Request, Response } from 'express'

import { pool } from '../config/mysql'

export class UserController {
  async get (req: Request, res: Response): Promise<void> {
    const [results] = await pool.query('SELECT * FROM Users')

    res.json({ items: results })
  }

  async post (req: Request, res: Response): Promise<void> {
    res.json({ message: 'POST /users' })
  }
}
