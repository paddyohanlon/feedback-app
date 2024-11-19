<script setup lang="ts">
import { useFeedbackStore } from './stores/feedback'
import { storeToRefs } from 'pinia'
import LogoSvg from './components/LogoSvg.vue'
import FeedbackItem from './components/FeedbackItem.vue'
import NewFeedbackModal from './components/NewFeedbackModal.vue'
import { RouterView } from 'vue-router'

const feedbackStore = useFeedbackStore()

const { isLoading, feedbacks, activeFeedback } = storeToRefs(feedbackStore)

feedbackStore.fetchInitialData()
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <template v-else>
    <header
      class="bg-slate-50 border-b border-slate-200 h-24 p-4 flex gap-4 justify-between items-center sticky top-0"
    >
      <RouterLink :to="{ name: 'home' }"><LogoSvg /></RouterLink>
      <div>
        <RouterLink class="bg-mint-green text-white rounded py-2 px-4" :to="{ name: 'newFeedback' }"
          >New feedback</RouterLink
        >
        <NewFeedbackModal />
      </div>
    </header>
    <div class="flex flex-1">
      <aside
        class="bg-slate-50 w-96 border-r border-slate-200 lg:flex flex-col h-[calc(100vh-24*0.25rem)] overflow-hidden sticky top-[calc(24*0.25rem)]"
      >
        <div class="p-4 border-b border-slate-200">filtering/sorting</div>
        <div class="p-[5px] relative min-h-px flex-1">
          <div class="overflow-y-auto h-full">
            <h2 class="sr-only">List of feedback</h2>
            <ul class="flex flex-col gap-2">
              <FeedbackItem
                v-for="feedback in feedbacks"
                :key="feedback.id"
                :feedback="feedback"
                :is-active="feedback.id === activeFeedback.id"
              />
            </ul>
          </div>
        </div>
        <div class="p-4 border-t border-slate-200">pagination</div>
      </aside>
      <main class="grow">
        <RouterView />
      </main>
    </div>
  </template>
</template>

<style scoped></style>
