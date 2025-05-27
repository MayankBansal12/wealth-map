import express, { Request, Response, NextFunction } from 'express'
import {
  inviteMember,
  getCompanyMembers,
  cancelInvitation,
  getBookmarks,
  addBookmark,
  removeBookmark,
  getWealthEstimate,
} from '../controllers/member.controller.js'
import { auth, AuthRequest } from '../middleware/auth.middleware.js'

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     WealthEstimate:
 *       type: object
 *       properties:
 *         netWorthMin:
 *           type: number
 *           description: Minimum estimated net worth
 *         netWorthMax:
 *           type: number
 *           description: Maximum estimated net worth
 *         incomeMin:
 *           type: number
 *           description: Minimum estimated annual income
 *         incomeMax:
 *           type: number
 *           description: Maximum estimated annual income
 *         range:
 *           type: string
 *           description: Wealth range category
 *         category:
 *           type: string
 *           description: Wealth category classification
 *         confidence:
 *           type: number
 *           description: Confidence score of the estimate (0-85)
 *         percentileRange:
 *           type: string
 *           description: Estimated percentile range in wealth distribution
 *         methodology:
 *           type: array
 *           items:
 *             type: string
 *           description: Methods used to calculate the estimate
 *         caveats:
 *           type: array
 *           items:
 *             type: string
 *           description: Important considerations and limitations
 */

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
router.get('/bookmarks', (req: Request, res: Response, next: NextFunction) => {
  getBookmarks(req as AuthRequest, res).catch(next)
})
router.post('/bookmark', (req: Request, res: Response, next: NextFunction) => {
  addBookmark(req as AuthRequest, res).catch(next)
})
router.delete('/bookmark/:bookmarkId', (req: Request, res: Response, next: NextFunction) => {
  removeBookmark(req as AuthRequest, res).catch(next)
})

/**
 * @swagger
 * /api/members/wealth-estimate:
 *   get:
 *     summary: Get wealth estimate for a property
 *     description: Calculate wealth estimate based on property and market data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: salePrice
 *         schema:
 *           type: number
 *         description: Recent sale price of the property
 *       - in: query
 *         name: estimatedMarketValue
 *         schema:
 *           type: number
 *         description: Current estimated market value
 *       - in: query
 *         name: neighborhoodMedianIncome
 *         schema:
 *           type: number
 *         description: Median income of the neighborhood
 *       - in: query
 *         name: costOfLivingIndex
 *         schema:
 *           type: number
 *         description: Cost of living index (default 100)
 *       - in: query
 *         name: localMedianHomePrice
 *         schema:
 *           type: number
 *         description: Median home price in the local area
 *       - in: query
 *         name: propertyTaxAssessment
 *         schema:
 *           type: number
 *         description: Property tax assessment value
 *       - in: query
 *         name: mortgageAmount
 *         schema:
 *           type: number
 *         description: Current mortgage amount
 *       - in: query
 *         name: ownershipDuration
 *         schema:
 *           type: number
 *         description: Duration of property ownership in years
 *     responses:
 *       200:
 *         description: Wealth estimate calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WealthEstimate'
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Server error
 */
router.get('/wealth-estimate', (req: Request, res: Response, next: NextFunction) => {
  getWealthEstimate(req as AuthRequest, res).catch(next)
})

export default router
