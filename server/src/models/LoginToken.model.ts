import mongoose from 'mongoose'

export interface ILoginToken extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  token: string
  type: 'magic-link' | 'otp'
  expiresAt: Date
  isUsed: boolean
  createdAt: Date
  updatedAt: Date
}

const loginTokenSchema = new mongoose.Schema<ILoginToken>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['magic-link', 'otp'],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

loginTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const LoginToken = mongoose.model<ILoginToken>('LoginToken', loginTokenSchema)

export default LoginToken
