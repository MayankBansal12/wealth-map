import express, { Request, Response, NextFunction } from 'express'
import {
  inviteMember,
  getCompanyMembers,
  cancelInvitation,
} from '../controllers/member.controller.js'
import { auth, AuthRequest } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(auth)
router.post('/invite', (req: Request, res: Response, next: NextFunction) => {
  inviteMember(req as AuthRequest, res).catch(next)
})
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  getCompanyMembers(req as AuthRequest, res).catch(next)
})
router.delete('/invitation/:id', (req: Request, res: Response, next: NextFunction) => {
  cancelInvitation(req as AuthRequest, res).catch(next)
})

export default router
