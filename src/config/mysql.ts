import { createPool } from 'mysql2/promise'

import { environments } from '@/environments'

export const pool = createPool({
  host: environments.MYSQL_HOST,
  port: Number(environments.MYSQL_PORT),
  user: environments.MYSQL_USER,
  password: environments.MYSQL_PASSWORD,
  database: environments.MYSQL_DATABASE
})
