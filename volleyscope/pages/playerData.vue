<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const teams = ref<TabsItem[]>([
  {
    label: "View All",
    slot: "all" as const,
  },
  {
    label: "Mens 1",
    slot: "mens" as const,
  },
  {
    label: "Womens 1",
    slot: "womens" as const,
  },
  {
    label: "Add New Team",
    disabled: true,
    slot: "newteam" as const,
  },
]);
</script>
<template>
  <UContainer>
    <div class="flex justify-between items-center">
      <h2 class="p-2">Player Information</h2>
      <UButton type="submit" class="h-10" to="/playerInput"
        >Add New Player</UButton
      >
    </div>
    <USeparator />
    <UTabs color="neutral" variant="link" :items="teams" class="w-full">
      <template #all="{ item }">
        <PlayerDisplayTable />
      </template>
      <template #mens="{ item }">
        <p>This is the {{ item }}</p>
      </template>
      <template #womens="{ item }">
        <p>This is the {{ item }}</p>
      </template>
      <template #newteam="{ item }">
        <p>This is the {{ item }}</p>
      </template>
    </UTabs>
  </UContainer>
</template>
