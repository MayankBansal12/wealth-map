import express from 'express'
import PropertyInfo from '../models/PropertyInfo.model.js'
import { auth } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(auth)

router.get('/', async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize as string) || 6
    const next = req.query.next as string

    const query = next ? { _id: { $gt: next } } : {}

    const properties = await PropertyInfo.find(query)
      .sort({ _id: 1 })
      .limit(pageSize + 1)

    const hasMore = properties.length > pageSize
    const results = hasMore ? properties.slice(0, pageSize) : properties
    const nextCursor = hasMore ? results[results.length - 1]._id : null

    res.json({
      properties: results,
      nextCursor,
      hasMore,
    })
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
