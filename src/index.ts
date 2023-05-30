import express from 'express'
import morgan from 'morgan'

import { environments } from './environments'

import userRoutes from './users/user.routes'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('tiny'))

// Define routes.
app.use('/api', userRoutes)

// Enable statuc files.
app.use(express.static('public'))

app.listen(environments.PORT, () => {
  console.log(`Server executing in port:${environments.PORT}`)
})
