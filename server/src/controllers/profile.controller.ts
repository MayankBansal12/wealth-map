import { Response } from 'express'
import User from '../models/User.model.js'
import { AuthRequest } from '../middleware/auth.middleware.js'
import { z } from 'zod'

const profileUpdateSchema = z.object({
  name: z.string().min(2).max(50),
  profilePic: z.string().optional(),
})

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validatedData = profileUpdateSchema.parse(req.body)
    const user = await User.findById(req.userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    user.name = validatedData.name
    if (validatedData.profilePic) {
      user.profilePic = validatedData.profilePic
    }

    await user.save()

    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      profilePic: user.profilePic,
      companyId: user.companyId,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    res.status(200).json(userResponse)
  } catch (error) {
    console.error('Update profile error:', error)
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors })
      return
    }
    res.status(500).json({ message: 'Server error' })
  }
}
