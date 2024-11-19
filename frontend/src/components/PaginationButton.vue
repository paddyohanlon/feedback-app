<script setup lang="ts">
defineProps<{
  isFirst?: boolean
  isLast?: boolean
  isActive?: boolean
}>()
</script>

<template>
  <button
    class="h-10 px-2 py-2 hover:bg-slate-200 transition-colors border-r border-t border-b border-slate-200 w-full"
    :class="[
      { 'border-l rounded-l-md': isFirst },
      { 'border-r rounded-r-md': isLast },
      isActive ? 'bg-logo-green text-white' : 'bg-white',
    ]"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
