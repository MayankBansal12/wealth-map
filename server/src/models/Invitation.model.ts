import mongoose from 'mongoose'

export interface IInvitation extends mongoose.Document {
  email: string
  companyId: mongoose.Types.ObjectId
  token: string
  status: 'pending' | 'accepted' | 'expired'
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

const invitationSchema = new mongoose.Schema<IInvitation>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'expired'],
      default: 'pending',
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

invitationSchema.index({ email: 1, companyId: 1 }, { unique: true })

const Invitation = mongoose.model<IInvitation>('Invitation', invitationSchema)

export default Invitation
