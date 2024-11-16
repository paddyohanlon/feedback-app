import { Router } from 'express'
import Joi from 'joi'
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

// Validation constants
const nameMaxLength = 50
const emailMaxLength = 254
const messageMaxLength = 2000

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: nameMaxLength },
    email: { type: String, required: true, maxLength: emailMaxLength },
    feedbackType: { type: String, required: true, enum: Object.values(FeedbackType) },
    message: { type: String, required: true, maxLength: messageMaxLength }
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

  try {
    const docs = await FeedbackModel.find()
    const feedbacks = docs.map((doc) => feedbackDocToApiResponse(doc))

    res.json(feedbacks)
  } catch (err) {
    debugApp('Error finding feedback', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/', async (req, res) => {
  debugApp('POST feedback')
  debugApp('req.body', req.body)

  const schema = Joi.object({
    name: Joi.string().max(nameMaxLength).required(),
    email: Joi.string().email().required(),
    feedbackType: Joi.string()
      .valid(...Object.values(FeedbackType))
      .required(),
    message: Joi.string().max(messageMaxLength).required()
  })

  const { value, error } = schema.validate(req.body, { abortEarly: false })
  if (error) {
    debugApp(error.details)
    res.status(400).json({ error: error.details.map((d) => d.message).join('. ') })
    return
  }

  const unsavedFeedback = value as UnsavedFeedback

  const feedbackModel = new FeedbackModel(unsavedFeedback)

  try {
    const doc = await feedbackModel.save()
    const savedFeedback = feedbackDocToApiResponse(doc)

    res.json(savedFeedback)
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ error: err.message })
      return
    }

    debugApp('Error saving feedback', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
