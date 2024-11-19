import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient, { axiosErrorHandler } from '@/services/api-client'
import {
  FeedbackType,
  type Feedback,
  type FeedbacksDto,
  type QueryParams,
  type UnsavedFeedback,
} from '../../../types/common'

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
    await fetchAllNames()

    isLoading.value = false
  }

  const feedbacks = ref<Feedback[]>([])

  const totalFeedbackDocs = ref(0)

  const queryParams = ref<QueryParams>({
    sortBy: 'createdAt',
    sortOrder: 'desc',
    pageSize: 10,
    pageNumber: 1,
  })

  function setQueryParams(newQueryParams: QueryParams) {
    queryParams.value = { ...queryParams.value, ...newQueryParams }
    fetchFeedbacks()
  }

  const reporterNames = ref<string[]>([])

  // This is pretty inefficient. I'd probably create a new API endpoint and cache the names there
  // Also, unique names do not mean that the feedback is from the same person of course.
  // With authentication we'd have the concept of users (with its own endpoints) and would query users
  async function fetchAllNames() {
    try {
      const { data } = await apiClient.get<FeedbacksDto>('/feedback')
      reporterNames.value = [...new Set(data.feedbacks.map((obj) => obj.name))]
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchFeedbacks() {
    try {
      const { data } = await apiClient.get<FeedbacksDto>('/feedback', { params: queryParams.value })
      feedbacks.value = data.feedbacks
      totalFeedbackDocs.value = data.totalDocs
      activeFeedback.value = feedbacks.value[0]
    } catch (err) {
      axiosErrorHandler(err)
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

  return {
    isLoading,
    activeFeedback,
    queryParams,
    feedbacks,
    totalFeedbackDocs,
    reporterNames,
    fetchInitialData,
    setQueryParams,
    setActiveFeedback,
    addFeedback,
  }
})
