import { Router } from 'express'
import { debugApp } from '../utils/debugger'
import { FeedbackType, type UnsavedFeedback, type Feedback } from '../types/common'

import mongoose from 'mongoose'

mongoose
  .connect(process.env.DB_URL || 'mongodb://127.0.0.1/feedback')
  .then(() => debugApp('Connected to MongoDB...'))
  .catch((err) => debugApp('Could not connect to MongoDB', err))

mongoose.connection.on('error', (err) => {
  debugApp(err)
})

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    feedbackType: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
)

const FeedbackModel = mongoose.model('Feedback', feedbackSchema)

/**
 * Return only the data the client needs
 */
function feedbackDocToApiResponse(doc: InstanceType<typeof FeedbackModel>): Feedback {
  const { id, createdAt, name, email, feedbackType, message } = doc

  return {
    id,
    createdAt,
    name,
    email,
    feedbackType: feedbackType as FeedbackType,
    message
  }
}

const router = Router()

router.get('/', async (req, res) => {
  debugApp('GET feedback')

  const docs = await FeedbackModel.find()
  const feedbacks = docs.map((doc) => feedbackDocToApiResponse(doc))

  res.json(feedbacks)
})

router.post('/', async (req, res) => {
  debugApp('POST feedback')
  debugApp('req.body', req.body)
  const unsavedFeedback = req.body as UnsavedFeedback

  // validate

  const feedbackModel = new FeedbackModel(unsavedFeedback)
  const doc = await feedbackModel.save()
  const savedFeedback = feedbackDocToApiResponse(doc)

  res.json(savedFeedback)
})

export default router
