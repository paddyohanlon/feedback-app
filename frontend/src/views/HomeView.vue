<script setup lang="ts">
import { useFeedbackStore } from '@/stores/feedback'
import { storeToRefs } from 'pinia'
import { getRelativeTimeString } from '@/utils/relative-time-formatter'
import BugIconSvg from '@/components/BugIconSvg.vue'
import SuggestionIconSvg from '@/components/SuggestionIconSvg.vue'
import { FeedbackType } from '../../../types/common'

const feedbackStore = useFeedbackStore()
const { activeFeedback: feedback } = storeToRefs(feedbackStore)
</script>

<template>
  <div>
    <div class="flex gap-2 max-w-[716px] mx-auto py-20 px-4">
      <div class="pt-[23px]">
        <BugIconSvg v-if="feedback.type === FeedbackType.BUG" />
        <SuggestionIconSvg v-else-if="feedback.type === FeedbackType.SUGGESTION" />
      </div>
      <div class="grow">
        <div class="text-sm text-slate-500" aria-label="Reported time">
          {{ getRelativeTimeString(feedback.createdAt) }}
        </div>
        <h1 class="text-2xl">{{ feedback.title }}</h1>
        <div class="text-sm text-slate-500 pt-1 pb-6">
          <span aria-label="Reporter name">{{ feedback.name }}</span>
          <span aria-label="Reporter email"> ({{ feedback.email }})</span>
        </div>
        <div style="white-space: pre-wrap">
          {{ feedback.message }}
        </div>
      </div>
    </div>
  </div>
</template>
