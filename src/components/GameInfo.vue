<template>
  <div class="text-grey-4">
    <span v-show="props.name">
      {{ props.name }}
    </span>
    <span v-show="props.rating">
      ({{ props.rating }})
    </span>
  </div>
</template>

<script setup>
const props = defineProps(['name', 'rating'])
</script>
