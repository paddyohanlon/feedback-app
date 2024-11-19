<script setup lang="ts">
import { Field } from 'vee-validate'

const model = defineModel()

defineProps<{
  name: string
  type: 'text' | 'email'
  isFullWidth?: boolean
}>()
</script>

<template>
  <Field
    :name="name"
    :type="type"
    v-model="model"
    class="border border-slate-200 px-3 py-1 rounded"
    :class="isFullWidth ? 'w-full' : 'max-sm:w-full sm:min-w-[300px]'"
    required
  />
</template>

<style scoped></style>
