import { ValidationChain, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req) as any

      if (result.errors.length) break
    }

    const errors = validationResult(req)

    if (errors.isEmpty()) return next()

    res.status(400).json({ errors: errors.array() })
  }
}
