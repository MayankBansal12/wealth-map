import express, { Request, Response, NextFunction } from 'express'
import {
  companySignup,
  companyLogin,
  verifyEmail,
  memberLogin,
  memberSetup,
  getCurrentUser,
} from '../controllers/auth.controller.js'
import { auth, AuthRequest } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/company/signup', companySignup)
router.post('/company/login', companyLogin)
router.post('/verify-email', verifyEmail)
router.post('/member/login', memberLogin)
router.post('/member/setup', memberSetup)

router.get('/me', auth, (req: Request, res: Response, next: NextFunction) => {
  getCurrentUser(req as AuthRequest, res).catch(next)
})

export default router
