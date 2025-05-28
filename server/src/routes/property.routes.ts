import express from 'express'
import PropertyInfo from '../models/PropertyInfo.model.js'
import { auth } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(auth)

router.get('/', async (_req, res) => {
  try {
    const properties = await PropertyInfo.find({})
    if (!properties) return res.status(404).json({ message: 'No recent properties found!' })
    res.json(properties)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const property = await PropertyInfo.findById(req.params.id)
    if (!property) return res.status(404).json({ message: 'Not found' })
    res.json(property)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updated = await PropertyInfo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, upsert: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err })
  }
})

export default router
