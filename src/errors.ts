export class UserNotFound extends Error {
  statusCode: number = 404

  name: string = 'UserNotFound'

  constructor (public message: string) {
    super(message)
  }
}
