<script setup lang="ts">
const { listId, players } = defineProps<{
  listId: number;
  players: Player[];
}>();

type Player = {
  playerId: number;
  playerName: string;
  position: string;
  shirtNumber: number;
};
const block_types = ["Kill", "Touch", "Error"];

const selected = ref<Player>();
const block = ref(block_types[0]);
</script>

<template>
  <UCard class="mb-2">
    <template #header> Block </template>
    <div class="flex flex-col space-y-1">
      <label class="font-bold">Player Name</label>
      <USelectMenu
        v-model="selected"
        searchable
        searchable-placeholder="Search a person..."
        class="w-full lg:w-48"
        placeholder="Select a person"
        :items="players"
      />
      <label class="font-bold">Block Type</label>
      <USelect v-model="block" :items="block_types" />
    </div>
  </UCard>
</template>
