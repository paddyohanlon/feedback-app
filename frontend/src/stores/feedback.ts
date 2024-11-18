import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFeedbackStore = defineStore('feedback', () => {
  const feedbacks = ref([])

  return { feedbacks }
})
