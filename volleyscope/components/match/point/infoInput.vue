<script setup lang="ts">
const { pointId, listId, setId } = defineProps<{
  pointId: number;
  listId: number;
  setId: number;
}>();

type Player = {
  playerId: number;
  playerName: string;
  position: string;
  shirtNumber: number;
};

const { data: players } = await useFetch<Player[]>(
  `/api/playerList/getPlayerList?listId=${listId}`
);
if (players.value !== null) {
  players.value = players.value.map((player) => ({
    label: player.playerName,
    value: player.playerId,
    ...player,
  }));
  console.log("Player List in Point: ", players.value);
}

const addedActions = ref<string[]>([]);
const serveAdded = ref(false);

function addAction(action: string) {
  if (action === "Serve" && serveAdded.value) return;
  if (action === "Serve") serveAdded.value = true;

  addedActions.value.push(action);
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-evenly">
        <UButton @click="addAction('Serve')">Serve</UButton>
        <UButton @click="addAction('Attack')">Attack</UButton>
        <UButton @click="addAction('Receive')">Receive</UButton>
        <UButton @click="addAction('Set')">Set</UButton>
        <UButton @click="addAction('Block')">Block</UButton>
      </div>
    </template>
    <template v-for="(action, index) in addedActions" :key="index">
      <MatchPointServeDataCard
        v-if="action === 'Serve'"
        :list-id="listId"
        :players="players"
      />
      <MatchPointAttackDataCard
        v-else-if="action === 'Attack'"
        :list-id="listId"
        :players="players"
      />
      <MatchPointReceiveDataCard
        v-else-if="action === 'Receive'"
        :list-id="listId"
        :players="players"
      />
      <MatchPointSetDataCard
        v-else-if="action === 'Set'"
        :list-id="listId"
        players="players"
      />
      <MatchPointBlockDataCard
        v-else-if="action === 'Block'"
        :list-id="listId"
        :players="players"
      />
    </template>
  </UCard>
</template>
