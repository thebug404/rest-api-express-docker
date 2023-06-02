/* eslint-disable camelcase */
import { Id, Query, ServiceMethods } from '../declarations'

import { dataSource } from '../config/database'

import { User } from './user.model'

const repository = dataSource.getRepository(User)

export class UserRepository implements ServiceMethods<User> {
  async list (query: Query = {}): Promise<User[]> {
    const users = await repository.find()

    return users as User[]
  }

  async get (id: Id, query: Query = {}): Promise<User | null | undefined> {
    return repository.findOne({
      where: { id: id as number }
    })
  }

  async create (data: User, query: Query = {}): Promise<User> {
    const results = await repository.insert(data)

    const { id: userId } = results.identifiers.at(0) || {}

    return this.get(userId) as Promise<User>
  }

  async update (id: Id, data: User, query?: Query | undefined): Promise<User> {
    await repository.update(id, data)

    return this.get(id, query) as Promise<User>
  }

  async patch (id: Id, data: User, query: Query = {}): Promise<User> {
    await repository.update(id, data)

    return this.get(id, query) as Promise<User>
  }

  async remove (id: Id, query: Query = {}): Promise<User> {
    const userId = id

    const user = await this.get(id, query)

    await repository.delete(userId)

    return user as User
  }
}
