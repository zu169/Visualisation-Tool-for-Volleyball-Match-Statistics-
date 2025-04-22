<script setup lang="ts">
type Player = {
  playerId: number;
  playerName: string;
  position: string;
  shirtNumber: number;
};

const positions = [
  "Setter",
  "Outside Hitter",
  "Middle Blocker",
  "Opposite Hitter",
  "Libero",
  "Defensive Specialist",
  "Service Specialist",
  "Bench",
];

const selectedPlayers = ref<Player[]>([]);

// Fetch all players
const { data: players, status } = await useFetch<Player[]>(
  `/api/player/getAllPlayerInfo`,
  {
    key: "players",
    /**
     * Transform the raw player data into a format that's easier to consume
     * by the component. Add a `label` and `value` property to each player,
     * and return an array of the transformed players.
     */
    transform: (data) => {
      return (
        data?.map((player) => ({
          label: player.playerName,
          value: player.playerId,
          ...player,
        })) || []
      );
    },
    lazy: true,
  }
);

watch(selectedPlayers, () => {
  refreshNuxtData();
});
</script>

<template>
  <UContainer>
    <!-- Select a player to add to the list -->
    <USelectMenu
      v-model="selectedPlayers"
      multiple
      searchable
      :loading="status === 'pending'"
      label="Select Players"
      placeholder="Select a player..."
      :items?="players"
      class="w-full m-2"
      size="lg"
    />
    <!-- add the player to the list and allow user to edit information like position and shirt number -->
    <div class="space-y-4 max-w-2xl">
      <!-- Header Row -->
      <div
        class="grid grid-cols-12 gap-4 font-semibold text-gray-700 border-b pb-2"
      >
        <div class="col-span-5">Player Name</div>
        <div class="col-span-3">Shirt Number</div>
        <div class="col-span-4">Position</div>
      </div>

      <!-- Player Rows -->
      <div
        v-for="(player, index) in selectedPlayers"
        :key="index"
        class="grid grid-cols-12 gap-4 items-center"
      >
        <!-- Player Name -->
        <div class="col-span-5">
          {{ player.playerName || player }}
          <!-- Handle if player is string or object -->
        </div>

        <!-- Shirt Number -->
        <div class="col-span-3">
          <UInput
            v-model="player.shirtNumber"
            placeholder="Number..."
            class="w-full"
            type="number"
          />
        </div>

        <!-- Position -->
        <div class="col-span-4">
          <USelectMenu
            v-model="player.position"
            :items="positions"
            searchable
            placeholder="Select position..."
            class="w-full"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>
