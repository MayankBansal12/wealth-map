import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import randomstring from 'randomstring'
import User from '../models/User.model.js'
import LoginToken from '../models/LoginToken.model.js'
import Invitation from '../models/Invitation.model.js'
import { sendVerificationEmail, sendMagicLinkEmail } from '../utils/email.js'
import { AuthRequest } from '../middleware/auth.middleware.js'
import { z } from 'zod'

const companySignupSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
})

const companyLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const verifyEmailSchema = z.object({
  email: z.string().email(),
  token: z.string().min(1),
})

const memberLoginSchema = z.object({
  email: z.string().email(),
})

const memberSetupSchema = z.object({
  name: z.string().min(2).max(50),
  profilePic: z.string().optional(),
  token: z.string().min(1),
})

const generateToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined')
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const companySignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = companySignupSchema.parse(req.body)
    const existingUser = await User.findOne({ email: validatedData.email })
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' })
      return
    }

    const user = await User.create({
      email: validatedData.email,
      password: validatedData.password,
      name: validatedData.name,
      role: 'company',
    })

    const verificationToken = randomstring.generate({
      length: 6,
      charset: 'numeric',
    })

    await LoginToken.create({
      userId: user._id,
      token: verificationToken,
      type: 'otp',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isUsed: false,
    })

    await sendVerificationEmail(user.email, verificationToken)
    res.status(201).json({ message: 'User created. Please verify your email.' })
  } catch (error) {
    console.error('Company signup error:', error)
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors })
      return
    }
    res.status(500).json({ message: 'Server error' })
  }
}

export const companyLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = companyLoginSchema.parse(req.body)
    const user = await User.findOne({ email: validatedData.email, role: 'company' })
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    if (!user.isVerified) {
      res.status(400).json({ message: 'Please verify your email first' })
      return
    }

    const isMatch = await user.comparePassword(validatedData.password)
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    const token = generateToken(user._id.toString())
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      profilePic: user.profilePic,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    res.status(200).json({ token, user: userResponse })
  } catch (error) {
    console.error('Company login error:', error)
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors })
      return
    }
    res.status(500).json({ message: 'Server error' })
  }
}

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = verifyEmailSchema.parse(req.body)
    const user = await User.findOne({ email: validatedData.email })
    if (!user) {
      res.status(400).json({ message: 'User not found' })
      return
    }

    const tokenRecord = await LoginToken.findOne({
      userId: user._id,
      token: validatedData.token,
      type: 'otp',
      isUsed: false,
      expiresAt: { $gt: new Date() },
    })

    if (!tokenRecord) {
      res.status(400).json({ message: 'Invalid or expired token' })
      return
    }

    tokenRecord.isUsed = true
    await tokenRecord.save()

    user.isVerified = true
    await user.save()

    const token = generateToken(user._id.toString())
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      profilePic: user.profilePic,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    res.status(200).json({ token, user: userResponse })
  } catch (error) {
    console.error('Verify email error:', error)
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors })
      return
    }
    res.status(500).json({ message: 'Server error' })
  }
}

export const memberLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = memberLoginSchema.parse(req.body)

    const user = await User.findOne({
      email: validatedData.email,
      role: 'member',
    })

    if (user && user.isVerified) {
      const jwtToken = generateToken(user._id.toString())
      const magicLink = `${process.env.CLIENT_URL}/member-login?token=${jwtToken}`
      await sendMagicLinkEmail(user.email, magicLink)
      res.status(200).json({ message: 'Magic link sent to your email' })
      return
    }

    const invitation = await Invitation.findOne({
      email: validatedData.email,
      expiresAt: { $gt: new Date() },
    })

    if (!invitation) {
      res.status(400).json({ message: 'No valid user found for this email' })
      return
    }

    const magicLink = `${process.env.CLIENT_URL}/member-setup?token=${invitation.token}`
    await sendMagicLinkEmail(invitation.email, magicLink)
    res.status(200).json({ message: 'Magic link sent to your email' })
  } catch (error) {
    console.error('Member login error:', error)
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors })
      return
    }
    res.status(500).json({ message: 'Server error' })
  }
}

export const memberSetup = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = memberSetupSchema.parse(req.body)
    const { token } = req.body

    if (!token || typeof token !== 'string') {
      res.status(400).json({ message: 'Token is required' })
      return
    }

    const invitationRecord = await Invitation.findOne({ token: validatedData.token })
    if (!invitationRecord) {
      res.status(400).json({ message: 'Invalid or expired token' })
      return
    }
    if (invitationRecord.status !== 'pending') {
      res
        .status(400)
        .json({ message: 'Invalid operation, invitation is either accepted or expired!' })
      return
    }

    let user = await User.findOne({ email: invitationRecord.email })
    if (!user) {
      user = await User.create({
        email: invitationRecord.email,
        name: validatedData.name,
        profilePic: validatedData.profilePic,
        role: 'member',
        companyId: invitationRecord.companyId,
      })
    }
    invitationRecord.status = 'accepted'
    await invitationRecord.save()
    user.isVerified = true
    await user.save()

    const jwtToken = generateToken(user._id.toString())

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

    res.status(200).json({ token: jwtToken, user: userResponse })
  } catch (error) {
    console.error('Member setup error:', error)
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors })
      return
    }
    res.status(500).json({ message: 'Server error' })
  }
}

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Get current user error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
