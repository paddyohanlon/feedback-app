<script setup lang="ts">
import { getRelativeTimeString } from '@/utils/relative-time-formatter'
import { FeedbackType, type Feedback } from '../../../types/common'
import BugIconSvg from '@/components/BugIconSvg.vue'
import SuggestionIconSvg from '@/components/SuggestionIconSvg.vue'
import { useFeedbackStore } from '@/stores/feedback'

const emit = defineEmits(['selectItem'])

const { feedback, isActive = false } = defineProps<{ feedback: Feedback; isActive?: boolean }>()

const feedbackStore = useFeedbackStore()

function handleItemClick() {
  emit('selectItem')
  feedbackStore.setActiveFeedback(feedback)
}
</script>

<template>
  <li class="flex gap-2 py-3 rounded pl-2 pr-3" :class="{ 'bg-slate-200': isActive }">
    <div class="pt-[1px]">
      <BugIconSvg v-if="feedback.type === FeedbackType.BUG" />
      <SuggestionIconSvg v-else-if="feedback.type === FeedbackType.SUGGESTION" />
    </div>
    <div class="grow">
      <h3 class="text-lg cursor-pointer" role="button" @click="handleItemClick">
        {{ feedback.title }}
      </h3>
      <div class="flex gap-2 justify-between text-sm text-slate-500">
        <div aria-label="Reporter name">{{ feedback.name }}</div>
        <div aria-label="Reported time">{{ getRelativeTimeString(feedback.createdAt) }}</div>
      </div>
    </div>
  </li>
</template>

<style scoped></style>
