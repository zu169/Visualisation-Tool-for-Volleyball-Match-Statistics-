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

const set_types = ["Assist", "Error", "Negative"];
const set_rating = [0, 1, 2];

const selected = ref<Player>();
const set = ref(set_types[0]);
const score = ref(set_rating[0]);
</script>

<template>
  <UCard class="mb-2">
    <template #header> Set </template>
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

      <label class="font-bold">Set Type</label>
      <USelect v-model="set" :items="set_types" class="w-full" />

      <UTooltip text="0: Failed Set, 1: Hitable, 2: Hit from Line">
        <label class="font-bold">Set Rating</label>
      </UTooltip>
      <USelect v-model="score" :items="set_rating" class="w-full" />
    </div>
  </UCard>
</template>
