import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/services/api-client'
import { FeedbackType, type Feedback, type UnsavedFeedback } from '../../../types/common'

export const useFeedbackStore = defineStore('feedback', () => {
  const isLoading = ref(true)

  const activeFeedback = ref<Feedback>({
    id: '',
    createdAt: new Date(),
    name: '',
    email: '',
    type: FeedbackType.BUG,
    title: '',
    message: '',
  })

  async function fetchInitialData() {
    await fetchFeedbacks()

    isLoading.value = false
  }

  const feedbacks = ref<Feedback[]>([])

  async function fetchFeedbacks() {
    try {
      const { data } = await apiClient.get<Feedback[]>('/feedback')
      feedbacks.value = data
      activeFeedback.value = feedbacks.value[0]
    } catch (err) {
      console.error(err)
    }
  }

  function setActiveFeedback(feedback: Feedback) {
    activeFeedback.value = feedback
  }

  async function addFeedback(unsavedFeedback: UnsavedFeedback) {
    try {
      const originalFeedbacks = [...feedbacks.value]
      // Optimistic update
      feedbacks.value.unshift({ id: '0', createdAt: new Date(), ...unsavedFeedback })

      const { data: savedFeedback } = await apiClient.post<Feedback>('/feedback', unsavedFeedback)
      feedbacks.value = [savedFeedback, ...originalFeedbacks]
      activeFeedback.value = savedFeedback
    } catch (err) {}
  }

  return { isLoading, activeFeedback, feedbacks, fetchInitialData, setActiveFeedback, addFeedback }
})
