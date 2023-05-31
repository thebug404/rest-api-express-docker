import express from 'express'
import morgan from 'morgan'

import { environments } from './environments'

import { notFound } from './middlewares/notfound.middleware'

import userRoutes from './users/user.routes'

const { PORT } = environments

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('tiny'))

// Define routes.
app.use('/api', userRoutes)

// Enable statuc files.
app.use(express.static('public'))

// Show 404 error messages.
app.use(notFound)

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`

  console.log(`Server executing in ${url}`)
})
