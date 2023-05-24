import { Router } from 'express'

import { UserRepository } from './user.repository'

import { UserController } from './user.controller'

const controller = new UserController(new UserRepository())

const router = Router()

const BASE_URL = '/users'

router.get(BASE_URL, controller.get.bind(controller))

router.post(BASE_URL, controller.post.bind(controller))

export default router
