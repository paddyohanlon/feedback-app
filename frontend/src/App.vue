<script setup lang="ts">
import { useFeedbackStore } from './stores/feedback'
import { storeToRefs } from 'pinia'
import LogoSvg from './components/LogoSvg.vue'
import FeedbackItem from './components/FeedbackItem.vue'
import NewFeedbackModal from './components/NewFeedbackModal.vue'
import { RouterView } from 'vue-router'
import { computed, ref } from 'vue'
import HamburgerSvg from './components/HamburgerSvg.vue'
import LoadingSvg from './components/LoadingSvg.vue'
import LeftArrowSvg from './components/LeftArrowSvg.vue'
import RightArrowSvg from './components/RightArrowSvg.vue'
import PaginationButton from './components/PaginationButton.vue'
import PaginationEllipsis from './components/PaginationEllipsis.vue'
import CloseIconSvg from './components/CloseIconSvg.vue'

const feedbackStore = useFeedbackStore()

const { isLoading, queryParams, feedbacks, totalFeedbackDocs, activeFeedback, reporterNames } =
  storeToRefs(feedbackStore)

const isSideBarExpanded = ref(false)

function toggleSideBarExpanded(): void {
  isSideBarExpanded.value = !isSideBarExpanded.value
}

const totalPages = computed(() => {
  const pageSize = queryParams.value.pageSize || 1
  return (
    Math.floor(totalFeedbackDocs.value / pageSize) +
    (totalFeedbackDocs.value % pageSize !== 0 ? 1 : 0)
  )
})

const pageNumber = computed(() =>
  queryParams.value.pageNumber === undefined ? 1 : queryParams.value.pageNumber,
)

/**
 * When paginating, always show the first and last page buttons.
 * And show siblings to the left and right of current page number.
 * I'm sure this could be tidied up
 */
const siblingPageNumArray = computed(() => {
  const pagesToShow = 4
  const distance = Math.floor(pagesToShow / 2)
  let startPage = 2

  if (pageNumber.value > distance + 1 && pageNumber.value < totalPages.value - pagesToShow) {
    startPage = pageNumber.value - distance
  } else if (pageNumber.value >= totalPages.value - pagesToShow) {
    startPage = totalPages.value - pagesToShow - 1
  }

  let endPage = totalPages.value - 1

  if (pageNumber.value < totalPages.value - (distance + 1)) {
    endPage = startPage + pagesToShow
  }

  const siblingPageNums = []

  for (let i = startPage; i <= endPage; i++) {
    siblingPageNums.push(i)
  }
  return siblingPageNums
})

feedbackStore.fetchInitialData()

type SortOrder = 'asc' | 'desc'

const sortOrder = ref<SortOrder>('desc')

function handleSortChange(event: Event) {
  // would be nice to show some kind of loading indicator for the list of feedback
  const select = event.target as HTMLSelectElement
  sortOrder.value = select.value as SortOrder
  feedbackStore.setQueryParams({ sortOrder: sortOrder.value })
}

const nameFilter = ref('')

function handleNameFilterChange(event: Event) {
  const select = event.target as HTMLSelectElement
  nameFilter.value = select.value
  feedbackStore.setQueryParams({ name: nameFilter.value })
}

function handlePagination(pageNum: number) {
  feedbackStore.setQueryParams({ pageNumber: pageNum })
}
</script>

<template>
  <div v-if="isLoading" class="grid w-full justify-center items-center h-full"><LoadingSvg /></div>
  <template v-else>
    <header
      class="bg-slate-50 border-b border-slate-200 h-24 p-4 flex gap-4 justify-between items-center sticky top-0"
    >
      <div class="flex gap-2 items-center">
        <button
          @click="toggleSideBarExpanded"
          :aria-expanded="isSideBarExpanded"
          aria-label="Sidebar"
          class="lg:hidden"
        >
          <CloseIconSvg v-if="isSideBarExpanded" />
          <HamburgerSvg v-else="isSideBarExpanded" />
        </button>
        <RouterLink :to="{ name: 'home' }"><LogoSvg /></RouterLink>
      </div>
      <div>
        <RouterLink
          class="bg-mint-green hover:bg-mint-green-dark text-white rounded py-2 px-4 transition-colors"
          :to="{ name: 'newFeedback' }"
          >New feedback</RouterLink
        >
        <NewFeedbackModal />
      </div>
    </header>
    <div class="flex flex-1">
      <aside
        class="bg-slate-50 max-sm:w-full sm:w-96 shrink-0 border-r border-slate-200 lg:flex flex-col h-[calc(100vh-24*0.25rem)] overflow-hidden sticky top-[calc(24*0.25rem)]"
        :class="isSideBarExpanded ? 'max-lg:flex max-lg:fixed' : 'max-lg:sr-only'"
      >
        <div
          class="p-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between items-center text-sm text-slate-500"
        >
          <div class="flex gap-2 items-center">
            <label for="filter-by-reporter">Filter</label>
            <!-- should probably hide the default caret and use the same SVG as SelectInput -->
            <select
              :value="nameFilter"
              @change="(event) => handleNameFilterChange(event)"
              id="filter-by-reporter"
              class="bg-slate-200 rounded-sm py-[1px]"
            >
              <option default value="">All reporters</option>
              <option v-for="name in reporterNames" :key="name" :value="name">
                {{ name.length > 20 ? `${name.slice(0, 20)}...` : name }}
              </option>
            </select>
          </div>
          <div class="flex gap-2 items-center">
            <label for="sort-by-date">Sort</label>
            <select
              :value="sortOrder"
              @change="(event) => handleSortChange(event)"
              id="sort-by-date"
              class="bg-slate-200 rounded-sm py-[1px]"
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
        </div>
        <div class="p-[5px] relative min-h-px flex-1">
          <div class="overflow-y-auto h-full">
            <h2 class="sr-only">List of feedback</h2>
            <ul class="flex flex-col gap-2">
              <FeedbackItem
                v-for="feedback in feedbacks"
                :key="feedback.id"
                :feedback="feedback"
                :is-active="feedback.id === activeFeedback.id"
                @select-item="isSideBarExpanded = false"
              />
            </ul>
          </div>
        </div>
        <div class="p-4 border-t border-slate-200">
          <!-- Pagination accessibility needs work probably -->
          <ul class="flex flex-wrap content-stretch items-center text-sm font-bold">
            <li v-if="pageNumber > 1">
              <PaginationButton :isFirst="true" @click="handlePagination(pageNumber - 1)">
                <LeftArrowSvg />
              </PaginationButton>
            </li>
            <!-- always show the first page number -->
            <li class="grow">
              <PaginationButton
                @click="handlePagination(1)"
                :isActive="1 === pageNumber"
                :isFirst="pageNumber === 1"
              >
                1
              </PaginationButton>
            </li>
            <PaginationEllipsis v-if="siblingPageNumArray[0] > 2" />
            <li v-for="(pageNum, index) in siblingPageNumArray" class="grow">
              <PaginationButton
                @click="handlePagination(pageNum)"
                :isActive="pageNum === pageNumber"
              >
                {{ pageNum }}
              </PaginationButton>
            </li>
            <PaginationEllipsis
              v-if="siblingPageNumArray[siblingPageNumArray.length - 1] < totalPages - 2"
            />
            <!-- always show the last page number -->
            <li class="grow">
              <PaginationButton
                @click="handlePagination(totalPages)"
                :isActive="totalPages === pageNumber"
                :isLast="pageNumber === totalPages"
              >
                {{ totalPages }}
              </PaginationButton>
            </li>
            <li v-if="pageNumber < totalPages">
              <PaginationButton :isLast="true" @click="handlePagination(pageNumber + 1)">
                <RightArrowSvg />
              </PaginationButton>
            </li>
          </ul>
        </div>
      </aside>
      <main class="grow">
        <RouterView />
      </main>
    </div>
  </template>
</template>

<style scoped></style>
