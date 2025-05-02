<script setup lang="ts">
const toast = useToast();
const { matchId, setNum } = defineProps<{ matchId: number; setNum: number }>();
const playerListId = defineModel<number>();

console.log("Match Id: " + matchId);
console.log("Set Number: " + setNum);

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
const { data: players, status } = await useAsyncData<Player[]>(() => {
  return $fetch(`/api/player/getAllPlayerInfo`).then((data) => {
    return (
      data?.map((player) => ({
        label: player.playerName,
        value: player.playerId,
        ...player,
      })) || []
    );
  });
});

// Fetch the player list based on playerListId
const { data: playerList } = useFetch<Player[]>(
  `/api/playerList/getPlayerList?listId=${playerListId.value}`
);

console.log("Player List: ", playerList);
watch(playerList, () => {
  if (playerList.value && Array.isArray(playerList.value)) {
  selectedPlayers.value = playerList.value.map((player) => ({
    label: player.playerName,
    value: player.playerId,
    ...player,
  }));
} else if (playerList.value === 0) {
  toast.add({
    title: "Error",
    description: "There was an error fetching the player list",
    color: "error",
  });
}
})


function approvePositions() {
  const positions: string[] = [];
  selectedPlayers.value.forEach((player) => {
    positions.push(player.position);
  });

  //Check for minimum number of setters
  const setterCount = positions.filter(
    (position) => position === "Setter"
  ).length;
  if (setterCount < 1) {
    toast.add({
      title: "Not Enough Setters",
      description: "Please select at least 1 setter for the lineup.",
      color: "warning",
    });
    return false;
  }
  //Check for minimum number of outside hitters
  const outsideHitterCount = positions.filter(
    (position) => position === "Outside Hitter"
  ).length;
  if (outsideHitterCount < 2) {
    toast.add({
      title: "Not Enough Outside Hitters",
      description: "Please select at least 2 outside hitters for the lineup.",
      color: "warning",
    });
    return false;
  }
  //Check for minimum number of middle blockers
  const middleBlockerCount = positions.filter(
    (position) => position === "Middle Blocker"
  ).length;
  if (middleBlockerCount < 2) {
    toast.add({
      title: "Not Enough Middle Blockers",
      description: "Please select at least 2 middle blocker for the lineup.",
      color: "warning",
    });
    return false;
  }
  //Check for minimum number of opposite hitters
  const oppositeHitterCount = positions.filter(
    (position) => position === "Opposite Hitter"
  ).length;
  if (oppositeHitterCount < 1) {
    toast.add({
      title: "Not Enough Opposite Hitters",
      description: "Please select at least 1 opposite hitter for the lineup.",
      color: "warning",
    });
    return false;
  }
  return true;
}

async function savePlayers() {
  if (selectedPlayers.value.length < 6) {
    toast.add({
      title: "Not Enough Players",
      description: "Please select at least 6 players for the lineup.",
      color: "warning",
    });
    return;
  } else if (!approvePositions()) {
    return;
  }
  if (playerListId.value !== undefined && selectedPlayers.value !== null) {
    console.log("Updating existing player list");
    selectedPlayers.value.forEach(async (player) => {
      const response = await $fetch(
        `/api/playerList/updateListPlayer?listId=${playerListId.value}`,
        {
          method: "PUT",
          body: player,
        }
      );
      if (!response || response.message === "error") {
        toast.add({
          title: "Error",
          description: "There was an error updating the Lineup information",
          color: "error",
        });
        return;
      }
    });
    toast.add({
      title: "Lineup has been updated!",
      color: "success",
      icon: "bitcoin-icons:edit-filled",
    });
    return;
  }
  console.log("Creating new player list");
  const { data: listId, message: response } = await $fetch(
    `/api/playerList/createPlayerList?match=${matchId}&set=${setNum}`,
    {
      method: "POST",
    }
  );
  selectedPlayers.value.forEach((player) => {
    $fetch(`/api/playerList/addPlayerToList?listId=${listId}`, {
      method: "POST",
      body: player,
    });
  });
  if (!response || response === "error") {
    toast.add({
      title: "Error",
      description: "There was an error submitting the Lineup information",
      color: "error",
    });
    return;
  }
  playerListId.value = listId;
  toast.add({
    title: "Lineup has been added!",
    color: "success",
    icon: "bitcoin-icons:edit-filled",
  });
}
</script>

<template>
  <UContainer>
    <!-- Select a player to add to the list -->
    <div class="flex justify-between">
      <p class="mb-2 text-sm font-semibold">Set Lineup</p>
      <p class="mb-2 text-xs">Minimum 6 Players</p>
    </div>
    <USelectMenu
      v-model="selectedPlayers"
      multiple
      searchable
      :loading="status === 'pending'"
      label="Select Players"
      placeholder="Select a player..."
      :items="players"
      class="w-full max-w-md mb-2"
      size="lg"
    />
    <!-- add the player to the list and allow user to edit information like position and shirt number -->
    <div class="space-y-4">
      <!-- Header Row -->
      <div
        class="grid grid-cols-12 gap-4 font-semibold text-white text-sm border-b pb-2"
      >
        <div class="col-span-5">Player Name</div>
        <div class="col-span-3">Shirt Number</div>
        <div class="col-span-4">Position</div>
      </div>

      <!-- Player Rows -->
      <div
        v-for="player in selectedPlayers"
        :key="player.playerId"
        class="grid grid-cols-12 gap-4 items-center"
      >
        <!-- Player Name -->
        <div class="col-span-5">
          {{ player.playerName }}
          <!-- Handle if player is string or object -->
        </div>

        <!-- Shirt Number -->
        <div class="col-span-3">
          <UInput
            v-model.number="player.shirtNumber"
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
    <div class="flex justify-end">
      <UButton label="Confirm Line Up" class="mt-3" @click="savePlayers()" />
    </div>
  </UContainer>
</template>
