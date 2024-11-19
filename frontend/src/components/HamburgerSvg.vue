<script setup lang="ts">
const { width = '22px' } = defineProps<{ width?: string }>()
</script>

<template>
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    :style="`width: ${width}`"
    aria-hidden="true"
  >
    <path d="m15.5 4h-15a.5.5 0 0 1 0-1h15a.5.5 0 0 1 0 1z"></path>
    <path d="m15.5 9h-15a.5.5 0 0 1 0-1h15a.5.5 0 0 1 0 1z"></path>
    <path d="m15.5 14h-15a.5.5 0 0 1 0-1h15a.5.5 0 0 1 0 1z"></path>
  </svg>
</template>

<style scoped></style>
