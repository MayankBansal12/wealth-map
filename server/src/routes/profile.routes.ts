import express, { Request, Response, NextFunction } from 'express'
import { updateProfile } from '../controllers/profile.controller.js'
import { auth, AuthRequest } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(auth)
router.put('/', (req: Request, res: Response, next: NextFunction) => {
  updateProfile(req as AuthRequest, res).catch(next)
})

export default router
