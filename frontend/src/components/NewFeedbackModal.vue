<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { watch } from 'vue'
import { useRoute, useRouter, type RouteRecordNameGeneric } from 'vue-router'
import { FeedbackType, type UnsavedFeedback } from '../../../types/common'
import { useFeedbackStore } from '@/stores/feedback'
import FormControl from './FormControl.vue'
import InputLabel from './InputLabel.vue'
import SelectInput from './SelectInput.vue'
import BaseInput from './BaseInput.vue'

import {
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
} from '../../../constants'
import { Field, Form } from 'vee-validate'
import InputErrorMessage from './InputErrorMessage.vue'

const route = useRoute()
const router = useRouter()

const feedbackStore = useFeedbackStore()

const modal = useTemplateRef('new-feedback-modal')

watch(route, (newRoute) => {
  openModal(newRoute.name)
})

onMounted(() => openModal(route.name))

const initialUnsavedFeedback = {
  name: '',
  email: '',
  /** Allow empty string here to show default inactive option */
  type: '' as FeedbackType,
  title: '',
  message: '',
}

const unsavedFeedback = ref<UnsavedFeedback>({ ...initialUnsavedFeedback })

function openModal(routeName: RouteRecordNameGeneric) {
  if (routeName !== 'newFeedback') return

  modal.value?.showModal()
  document.addEventListener('keydown', escapeHandler)
}

function closeModal() {
  unsavedFeedback.value = initialUnsavedFeedback
  modal.value?.close()
  document.removeEventListener('keydown', escapeHandler)
  router.push({ name: 'home' })
}

function escapeHandler(e: KeyboardEvent) {
  if (e.code === 'Escape') {
    closeModal()
  }
}

function handleSubmit(values: unknown) {
  feedbackStore.addFeedback(values as UnsavedFeedback)
  closeModal()
}

/**
 *
 * @param value must be `unknown` or vee-validate complains
 */
function validateName(value: unknown): string | boolean {
  if (!value) return 'Name is required'
  if (typeof value !== 'string') return 'Name must be a string'
  if (value.length > NAME_MAX_LENGTH) return `Name must be less than ${NAME_MAX_LENGTH} characters`
  return true
}

function validateEmail(value: unknown): string | boolean {
  if (!value) return 'Email is required'
  if (typeof value !== 'string') return 'Name must be a string'
  if (value.length > EMAIL_MAX_LENGTH)
    return `Name must be less than ${EMAIL_MAX_LENGTH} characters`
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (!regex.test(value)) {
    return 'Must be a valid email'
  }
  return true
}

function validateType(value: unknown): string | boolean {
  if (!value) return 'Type is required'
  if (typeof value !== 'string') return 'Type must be a string'
  if (!Object.values(FeedbackType).includes(value as FeedbackType))
    return `Type must be one of the following: ${Object.values(FeedbackType).join(', ')}`
  return true
}

function validateTitle(value: unknown): string | boolean {
  if (!value) return 'Title is required'
  if (typeof value !== 'string') return 'Title must be a string'
  if (value.length > TITLE_MAX_LENGTH)
    return `Title must be less than ${TITLE_MAX_LENGTH} characters`
  return true
}

function validateMessage(value: unknown): string | boolean {
  if (!value) return 'Message is required'
  if (typeof value !== 'string') return 'Message must be a string'
  if (value.length > MESSAGE_MAX_LENGTH)
    return `Message must be less than ${MESSAGE_MAX_LENGTH} characters`
  return true
}
</script>

<template>
  <Teleport to="#modal-container">
    <dialog
      class="w-[calc(100vw-2rem)] max-w-[773px] focus-visible:outline-none rounded shadow-sm"
      ref="new-feedback-modal"
    >
      <h2 class="text-2xl border-b border-slate-200 py-4 px-8">Add new feedback</h2>

      <Form @submit="handleSubmit" method="dialog" class="py-8 px-8">
        <FormControl>
          <InputLabel for="name">Name</InputLabel>
          <BaseInput
            v-model="unsavedFeedback.name"
            id="name"
            name="name"
            type="text"
            :rules="validateName"
            :maxlength="NAME_MAX_LENGTH"
          />
          <InputErrorMessage name="name" />
        </FormControl>
        <FormControl>
          <InputLabel for="email">Email</InputLabel>
          <BaseInput
            v-model="unsavedFeedback.email"
            id="email"
            name="email"
            type="email"
            :rules="validateEmail"
            :maxlength="EMAIL_MAX_LENGTH"
          />
          <InputErrorMessage name="email" />
        </FormControl>
        <FormControl>
          <InputLabel for="type">Type</InputLabel>
          <SelectInput
            v-model="unsavedFeedback.type"
            id="type"
            name="type"
            defaultOption="Select type"
            :options="Object.values(FeedbackType)"
            :rules="validateType"
          />
          <InputErrorMessage name="type" />
        </FormControl>
        <FormControl>
          <InputLabel for="title">Title</InputLabel>
          <BaseInput
            v-model="unsavedFeedback.title"
            id="title"
            name="title"
            type="text"
            :rules="validateTitle"
            :maxlength="TITLE_MAX_LENGTH"
            :isFullWidth="true"
          />
          <InputErrorMessage name="title" />
        </FormControl>
        <FormControl>
          <InputLabel for="message">Message</InputLabel>
          <Field
            name="message"
            as="textarea"
            v-model="unsavedFeedback.message"
            id="message"
            class="border border-slate-200 px-3 py-1 rounded w-full min-h-[166px]"
            :rules="validateMessage"
            :maxlength="MESSAGE_MAX_LENGTH"
            required
          />
          <InputErrorMessage name="message" />
        </FormControl>
        <div class="flex flex-col md:flex-row justify-end gap-3 pt-1">
          <button
            type="button"
            @click="closeModal"
            class="bg-[#eaf0f6] hover:bg-slate-300 rounded py-2 px-4 transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            class="bg-mint-green hover:bg-mint-green-dark text-white rounded py-2 px-4 transition-colors"
          >
            Send feedback
          </button>
        </div>
      </Form>
    </dialog>
  </Teleport>
</template>

<style scoped></style>
