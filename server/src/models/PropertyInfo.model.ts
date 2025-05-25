import mongoose from 'mongoose'

const PropertyInfoSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    propertyProfile: { type: Object, default: null },
    neighborhoodData: { type: Object, default: null },
    transportationData: { type: Object, default: null },
    advancedInfo: { type: Object, default: null },
    ownerDetails: { type: Object, default: null },
  },
  { timestamps: true }
)

export default mongoose.model('PropertyInfo', PropertyInfoSchema)
