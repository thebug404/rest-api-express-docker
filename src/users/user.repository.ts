/* eslint-disable camelcase */
import { v4 as uuid } from 'uuid'

import { Id, Query, ServiceMethods } from '../declarations'

import { pool } from '../config/mysql'

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  age: number;
}

export class UserRepository implements ServiceMethods<User> {
  async list (query: Query = {}): Promise<User[]> {
    const [results] = await pool.query('SELECT * FROM Users;')

    return results as User[]
  }

  async get (id: Id, query: Query = {}): Promise<User | null | undefined> {
    const [results] = await pool.query('SELECT * FROM Users WHERE id = ?', [id])

    return (results as User[]).at(0)
  }

  async create (data: User, query: Query = {}): Promise<User> {
    const {
      first_name,
      last_name,
      email,
      gender,
      age
    } = data

    const userId = uuid()

    const querySQL = 'INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (?, ?, ?, ?, ?, ?)'

    const values = [userId, first_name, last_name, email, gender, age]

    await pool.query(querySQL, values)

    return this.get(userId) as Promise<User>
  }

  async update (id: Id, data: User, query?: Query | undefined): Promise<User> {
    await pool.query('UPDATE Users SET ? WHERE id = ?', [data, id])

    return this.get(id, query) as Promise<User>
  }

  async patch (id: Id, data: User, query: Query = {}): Promise<User> {
    await pool.query('UPDATE Users SET ? WHERE id = ?', [data, id])

    return this.get(id, query) as Promise<User>
  }

  async remove (id: Id, query: Query = {}): Promise<User> {
    const userId = id

    const user = await this.get(id, query)

    await pool.query('DELETE FROM Users Where id = ?', [userId])

    return user as User
  }
}
