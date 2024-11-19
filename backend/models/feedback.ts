import mongoose from 'mongoose'
import { FeedbackType } from '../../types/common'
import { NAME_MAX_LENGTH, EMAIL_MAX_LENGTH, TITLE_MAX_LENGTH, MESSAGE_MAX_LENGTH } from '../../constants'

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: NAME_MAX_LENGTH },
    email: { type: String, required: true, maxLength: EMAIL_MAX_LENGTH },
    type: { type: String, required: true, enum: Object.values(FeedbackType) },
    title: { type: String, required: true, maxLength: TITLE_MAX_LENGTH },
    message: { type: String, required: true, maxLength: MESSAGE_MAX_LENGTH }
  },
  { timestamps: true }
)

export const FeedbackModel = mongoose.model('Feedback', feedbackSchema)
