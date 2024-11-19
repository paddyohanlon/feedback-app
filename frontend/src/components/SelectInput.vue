<script setup lang="ts">
import { Field } from 'vee-validate'

const model = defineModel()

defineProps<{
  name: string
  options: string[]
  defaultOption?: string
}>()
</script>

<template>
  <Field
    :name="name"
    as="select"
    class="border border-slate-200 px-3 py-1 rounded max-sm:w-full sm:min-w-[300px] appearance-none select-caret"
    v-model="model"
  >
    <option v-if="defaultOption" disabled value="">{{ defaultOption }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option" class="capitalize">
      {{ option }}
    </option>
  </Field>
</template>

<style scoped>
.select-caret {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
}
</style>
