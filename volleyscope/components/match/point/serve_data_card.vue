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

const serve_types = ["Underhand", "Overhand", "Float", "Jump"];
const serve_success = ["Normal", "Ace", "Error"];
const selected = ref<Player>();

const serve = ref(serve_types[0]);
const success = ref(serve_success[0]);
</script>

<template>
  <UCard class="mb-2">
    <template #header> Serve </template>
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
      <label class="font-bold">Serve Type</label>
      <USelect v-model="serve" :items="serve_types" />
      <label class="font-bold">Serve Success</label>
      <USelect v-model="success" :items="serve_success" />
    </div>
  </UCard>
</template>
