import { DataSource } from 'typeorm'

import { environments } from '@/environments'

import { User } from '@/users/user.model'

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_DATABASE,
  MYSQL_PASSWORD
} = environments

export const dataSource = new DataSource({
  type: 'mysql',

  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,

  entities: [User]
})
