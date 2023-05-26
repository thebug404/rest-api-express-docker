import { v4 as uuid } from 'uuid'

import { Query, ServiceMethods } from '../declarations'

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
  async list (): Promise<User[]> {
    const [results] = await pool.query('SELECT * FROM Users;');

    return results as User[]
  }

  async create (data: User, query?: Query | undefined): Promise<User> {
    const {
      first_name,
      last_name,
      email,
      gender,
      age
    } = data

    const id = uuid()

    const querySQL = 'INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (?, ?, ?, ?, ?, ?)'

    const values = [id, first_name, last_name, email, gender, age]

    await pool.query(querySQL, values)

    const [results] = await pool.query('SELECT * FROM Users WHERE id = ?', [id])

    const user = (results as User[]).at(0)

    return user as User
  }
}
