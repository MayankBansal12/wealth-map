import { Response } from 'express'
import randomstring from 'randomstring'
import User from '../models/User.model.js'
import Invitation from '../models/Invitation.model.js'
import { sendInvitationEmail } from '../utils/email.js'
import { AuthRequest } from '../middleware/auth.middleware.js'
import { z } from 'zod'
import mongoose from 'mongoose'

const inviteMemberSchema = z.object({
  email: z.string().email(),
})

export const inviteMember = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validatedData = inviteMemberSchema.parse(req.body)
    const company = await User.findOne({ _id: req.userId, role: 'company' })
    if (!company) {
      res.status(403).json({ message: 'Only company accounts can invite members' })
      return
    }

    const existingCompany = await User.findOne({ email: validatedData.email, role: 'company' })
    if (existingCompany) {
      res.status(400).json({ message: 'This email is already registered as a company' })
      return
    }

    const existingInvitation = await Invitation.findOne({ email: validatedData.email })
    if (existingInvitation) {
      if (existingInvitation.status === 'pending' || existingInvitation.status === 'accepted') {
        res.status(400).json({ message: 'This email already has an active or accepted invitation' })
        return
      }
      if (existingInvitation.status === 'expired') {
        existingInvitation.token = randomstring.generate(32)
        existingInvitation.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        existingInvitation.status = 'pending'
        existingInvitation.companyId = company._id
        await existingInvitation.save()
        await sendInvitationEmail(
          validatedData.email,
          company.name || 'unknown company',
          existingInvitation.token
        )
        res.status(200).json({ message: 'Invitation re-sent successfully' })
        return
      }
    }

    const token = randomstring.generate(32)
    await Invitation.create({
      email: validatedData.email,
      companyId: company._id,
      token,
      status: 'pending',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    })
    await sendInvitationEmail(validatedData.email, company.name || 'unknown company', token)
    res.status(201).json({ message: 'Invitation sent successfully' })
  } catch (error) {
    console.error('Invite member error:', error)
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors })
      return
    }
    res.status(500).json({ message: 'Server error' })
  }
}

export const getCompanyMembers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await User.findOne({ _id: req.userId, role: 'company' })
    if (!company) {
      res.status(403).json({ message: 'Only company accounts can access members' })
      return
    }

    const [members, pendingInvitations] = await Promise.all([
      User.find({ companyId: company._id, role: 'member' }).select('-password'),
      Invitation.find({ companyId: company._id, status: 'pending' }),
    ])

    const processedMembers = await Promise.all(
      members.map(async (member) => {
        const invitation = await Invitation.findOne({
          email: member.email,
          companyId: company._id,
        })

        return {
          _id: member._id,
          email: member.email,
          name: member.name,
          profilePic: member.profilePic,
          role: member.role,
          isVerified: member.isVerified,
          companyId: member.companyId,
          createdAt: member.createdAt,
          updatedAt: member.updatedAt,
          invitationStatus: invitation
            ? {
                status: invitation.status,
                expiresAt: invitation.expiresAt,
              }
            : {
                status: member.isVerified ? 'accepted' : 'pending',
                expiresAt: new Date(),
              },
        }
      })
    )

    const pendingMembers = await Promise.all(
      pendingInvitations
        .filter(
          (invitation) => !processedMembers.some((member) => member.email === invitation.email)
        )
        .map(async (invitation) => {
          const existingUser = await User.findOne({
            email: invitation.email,
            companyId: company._id,
            role: 'member',
          })

          if (existingUser) {
            return {
              _id: existingUser._id,
              email: existingUser.email,
              name: existingUser.name,
              profilePic: existingUser.profilePic,
              role: existingUser.role,
              isVerified: existingUser.isVerified,
              companyId: existingUser.companyId,
              createdAt: existingUser.createdAt,
              updatedAt: existingUser.updatedAt,
              invitationStatus: {
                status: invitation.status,
                expiresAt: invitation.expiresAt,
              },
            }
          }

          return {
            _id: new mongoose.Types.ObjectId().toString(),
            email: invitation.email,
            name: undefined,
            profilePic: undefined,
            role: 'member' as const,
            isVerified: false,
            companyId: company._id,
            createdAt: invitation.createdAt,
            updatedAt: invitation.updatedAt,
            invitationStatus: {
              status: invitation.status,
              expiresAt: invitation.expiresAt,
            },
          }
        })
    )

    const allMembers = [...processedMembers, ...pendingMembers].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    res.status(200).json(allMembers)
  } catch (error) {
    console.error('Get company members error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const cancelInvitation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const memberId = req.params.id
    const company = await User.findOne({ _id: req.userId, role: 'company' })
    if (!company) {
      res.status(403).json({ message: 'Only company accounts can cancel invitations' })
      return
    }

    const member = await User.findOne({ _id: memberId, companyId: company._id, role: 'member' })

    if (member) {
      const invitation = await Invitation.findOne({
        email: member.email,
        companyId: company._id,
        status: 'pending',
      })

      if (invitation) {
        invitation.status = 'expired'
        await invitation.save()
      }
    } else {
      const invitation = await Invitation.findOneAndUpdate(
        { _id: memberId, companyId: company._id, status: 'pending' },
        { status: 'expired' }
      )

      if (!invitation) {
        res.status(404).json({ message: 'Invitation not found' })
        return
      }
    }

    res.status(200).json({ message: 'Invitation cancelled successfully' })
  } catch (error) {
    console.error('Cancel invitation error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
