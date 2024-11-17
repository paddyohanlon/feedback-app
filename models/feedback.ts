import mongoose from 'mongoose'
import config from 'config'
import { FeedbackType } from '../types/common'

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: config.get('NAME_MAX_LENGTH') },
    email: { type: String, required: true, maxLength: config.get('EMAIL_MAX_LENGTH') },
    feedbackType: { type: String, required: true, enum: Object.values(FeedbackType) },
    message: { type: String, required: true, maxLength: config.get('MESSAGE_MAX_LENGTH') }
  },
  { timestamps: true }
)

export const FeedbackModel = mongoose.model('Feedback', feedbackSchema)
