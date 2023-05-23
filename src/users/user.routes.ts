import { Router } from 'express'

import { UserController } from './user.controller'

const userController = new UserController()

const router = Router()

const BASE_URL = '/users'

router.get(BASE_URL, userController.get)

router.post(BASE_URL, userController.post)

export default router
