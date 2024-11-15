export enum FeedbackType {
  BUG = 'bug',
  SUGGESTION = 'suggestion'
}

export type Feedback = {
  id: string
  createdAt: NativeDate
  name: string
  email: string
  feedbackType: FeedbackType
  message: string
}

export type UnsavedFeedback = Omit<Feedback, 'id' | 'createdAt'>
