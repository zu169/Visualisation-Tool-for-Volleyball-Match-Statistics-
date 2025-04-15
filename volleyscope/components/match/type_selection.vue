<script setup lang="ts">
const type = ["BUCS", "BDVA", "Tournament", "Other"];

const selectedType = defineModel<string>();
// add selected type to match database
</script>

<template>
  <div class="flex flex-col">
    <label class="mb-1 p-2">Game Type</label>
    <USelectMenu
      v-model="selectedType"
      searchable
      searchable-placeholder="Search a Game Type..."
      class="w-full lg:w-48"
      placeholder="Select a type..."
      :items="type"
    />
  </div>
</template>
