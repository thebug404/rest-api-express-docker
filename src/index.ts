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

// Show 404 error messages.
app.use((req, res) => {
  const message = 'Resource not found.'

  const name = 'NotFound'

  const statusCode = 404

  res.status(statusCode).json({ name, message })
})

app.listen(environments.PORT, () => {
  console.log(`Server executing in port:${environments.PORT}`)
})
