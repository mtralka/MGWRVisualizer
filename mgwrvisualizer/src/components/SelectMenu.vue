<script setup>

const props = defineProps({
  placeholder: {
      type: String,
      required: false,
      default: null
  },
  data: {
      type: Array,
      required: true,
  },
  keyBy: {
      type: String,
      required: false,
      default: null
  },
  labelBy: {
      type: String,
      required: false,
      default: null
  },
})


</script>
<template>
  <select
    class="
      w-full
      max-w-xs
      px-3
      py-2
      w-60
      font-medium
    "
  >
    <option v-if="placeholder" disabled="disabled" selected="selected">
      {{ placeholder }}
    </option>
    <option
      v-for="item in data"
      :key="keyBy ? item[keyBy] : item"
      :value="keyBy ? item[keyBy] : item"
      class=""
    >
      {{ labelBy ? item[labelBy] : item }}
    </option>
  </select>
</template>

<style scoped>
option {
  @apply bg-white
}

</style>