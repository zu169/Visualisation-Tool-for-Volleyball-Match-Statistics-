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

const receive_types = ["Normal", "Serve", "Dig", "Error"];
const receive_success = [0, 1, 2, 3, 4];

const selected = ref<Player>();
const receive = ref(receive_types[0]);
const success = ref(receive_success[0]);
</script>

<template>
  <UCard class="mb-2">
    <template #header> Receive </template>
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
      <label class="font-bold">Receive Type</label>
      <USelect v-model="receive" :items="receive_types" />
      <UTooltip text="0: Overpass, 1-4 Options available on Attack">
        <label class="font-bold">Receive Success</label>
      </UTooltip>
      <USelect v-model="success" :items="receive_success" />
    </div>
  </UCard>
</template>
