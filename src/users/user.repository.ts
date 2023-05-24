import { pool } from '../config/mysql'

import { ServiceMethods } from '../declarations'

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
}
