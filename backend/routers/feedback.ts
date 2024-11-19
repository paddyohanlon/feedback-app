import { Router } from 'express'
import Joi from 'joi'
import { debugApp } from '../utils/debugger'
import { FeedbackType, type UnsavedFeedback, type Feedback } from '../types/common'
import { NAME_MAX_LENGTH, TITLE_MAX_LENGTH, MESSAGE_MAX_LENGTH } from '../../constants'
import mongoose from 'mongoose'
import { FeedbackModel } from '../models/feedback'

/**
 * Return only the data the client needs
 */
function feedbackDocToApiResponse(doc: InstanceType<typeof FeedbackModel>): Feedback {
  const { id, createdAt, name, email, type, title, message } = doc

  return {
    id,
    createdAt,
    name,
    email,
    type: type as FeedbackType,
    title,
    message
  }
}

const router = Router()

router.get('/', async (req, res) => {
  debugApp('GET feedback')

  const queryParamsSchema = Joi.object({
    name: Joi.string().max(NAME_MAX_LENGTH),
    pageNumber: Joi.number().integer().min(1),
    pageSize: Joi.number().integer().min(1),
    sortBy: Joi.string().valid('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc')
  })

  const { value, error } = queryParamsSchema.validate(req.query, { abortEarly: false })
  if (error) {
    debugApp(error.details)
    res.status(400).json({ error: error.details.map((d) => d.message).join('. ') })
    return
  }

  type QueryParams = {
    name: string
    pageNumber: number
    pageSize: number
    sortBy: string
    sortOrder: string
  }

  const { name, pageNumber, pageSize, sortBy, sortOrder } = value as QueryParams

  // Filter by name (could also do `type`)
  const filter: { name?: string } = {}
  if (name) {
    filter.name = name
  }

  const feedbackQuery = FeedbackModel.find(filter)

  // Pagination
  if (pageNumber && pageSize) {
    feedbackQuery.skip((pageNumber - 1) * pageSize).limit(pageSize)
  }

  // Sorting
  const sort: { [key: string]: 1 | -1 } = {}
  if (sortBy && sortOrder) {
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1
  } else {
    // Sort by newest first by default
    sort['createdAt'] = -1
  }
  feedbackQuery.sort(sort)

  try {
    const docs = await feedbackQuery
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
    name: Joi.string().max(NAME_MAX_LENGTH).required(),
    email: Joi.string().email().required(),
    type: Joi.string()
      .valid(...Object.values(FeedbackType))
      .required(),
    title: Joi.string().max(TITLE_MAX_LENGTH).required(),
    message: Joi.string().max(MESSAGE_MAX_LENGTH).required()
  })

  const { value, error } = schema.validate(req.body, { abortEarly: false })
  // would eventually extract this to avoid duplication
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

    res.status(201).json(savedFeedback)
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
