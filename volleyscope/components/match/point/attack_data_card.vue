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

const attack_types = ["Hit", "Tip"];
const attack_success = ["Normal", "Kill", "Error", "Blocked"];

const selected = ref<Player>();
const attack = ref(attack_types[0]);
const success = ref(attack_success[0]);
</script>

<template>
  <UCard class="mb-2">
    <template #header> Attack </template>
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
      <label class="font-bold">Attack Type</label>
      <USelect v-model="attack" :items="attack_types" />
      <label class="font-bold">Attack Success</label>
      <USelect v-model="success" :items="attack_success" />
    </div>
  </UCard>
</template>
