import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  userId: string
}

interface JwtPayload {
  userId: string
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token, authorization denied' })
      return
    }

    const token = authHeader.split(' ')[1]

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
    ;(req as AuthRequest).userId = decoded.userId

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({ message: 'Token is not valid' })
  }
}
