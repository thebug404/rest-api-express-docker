import { Router } from 'express'

import { validate } from '@/middlewares/validation.middleware'

import { validateUserInput } from './user.validations'

import { UserRepository } from './user.repository'

import { UserController } from './user.controller'

const controller = new UserController(new UserRepository())

const router = Router()

const BASE_URL = '/users'

router.get(BASE_URL, controller.list.bind(controller))

router.get(`${BASE_URL}/:userId`, controller.get.bind(controller))

router.post(
  BASE_URL,
  validate(validateUserInput),
  controller.post.bind(controller)
)

router.put(`${BASE_URL}/:userId`, controller.put.bind(controller))

router.patch(`${BASE_URL}/:userId`, controller.patch.bind(controller))

router.delete(`${BASE_URL}/:userId`, controller.delete.bind(controller))

export default router
