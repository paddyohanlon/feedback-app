<script setup lang="ts">
const { width = '22px' } = defineProps<{ width?: string }>()
</script>

<template>
  <svg :style="`width: ${width}`" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m5 19.5c0-4.1421 3.35787-7.5 7.5-7.5h75c4.1421 0 7.5 3.3579 7.5 7.5s-3.3579 7.5-7.5 7.5h-75c-4.14214 0-7.5-3.3579-7.5-7.5z"
    ></path>
    <path
      d="m5 49.5c0-4.1421 3.35787-7.5 7.5-7.5h45c4.1421 0 7.5 3.3579 7.5 7.5s-3.3579 7.5-7.5 7.5h-45c-4.14214 0-7.5-3.3579-7.5-7.5z"
    ></path>
    <path
      d="m5 79.5c0-4.1421 3.35787-7.5 7.5-7.5h75c4.1421 0 7.5 3.3579 7.5 7.5s-3.3579 7.5-7.5 7.5h-75c-4.14214 0-7.5-3.3579-7.5-7.5z"
    ></path>
  </svg>
</template>

<style scoped></style>
