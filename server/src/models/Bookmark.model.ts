import mongoose, { Types } from 'mongoose'

export interface IBookmark extends mongoose.Document {
  userId: Types.ObjectId
  property: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const bookmarkSchema = new mongoose.Schema<IBookmark>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
)

const Bookmark = mongoose.model<IBookmark>('Bookmark', bookmarkSchema)
export default Bookmark
