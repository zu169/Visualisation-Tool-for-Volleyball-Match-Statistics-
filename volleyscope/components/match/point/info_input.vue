<script setup lang="ts">
const { pointNum, side, listId, setId } = defineProps<{
  pointNum: number;
  side: string;
  listId: number;
  setId: number;
}>();

console.log("Point Number: " + pointNum);
console.log("List ID: " + listId);
console.log("Set ID: " + setId);
console.log("Side: " + side);

const toast = useToast();
const pointId = ref<number>();

type Player = {
  playerId: number;
  playerName: string;
  position: string;
  shirtNumber: number;
};

type Points = {
  pointId: number;
  setId: number;
  pointNum: number;
  side: string;
  playerId: number;
};

async function checkServeExists() {
  if (!pointId.value) return;
  const response = await $fetch(`/api/point/getServe?point=${pointId.value}`);

  if (response.message === "success") {
    if (!serveAdded.value) {
      serveAdded.value = true;
      addedActions.value.push("Serve");
    }
  }
}

async function checkPointExists() {
  console.log("Checking if point exists");
  const response = await useFetch(
    `/api/point/getPoint?point=${pointNum}&set=${setId}`
  );

  if (!response.message || response.message === "error") {
    console.log("Error fetching point");
    return false;
  }
  if (response.data != null) {
    pointId.value = data.value.pointId;
    console.log("Point ID: " + pointId.value);
    await checkServeExists();
    return true;
  }
  return false;
}

watchEffect(() => {
  if (!pointNum || !listId || !setId || !side) return;
  if (!checkPointExists()) {
    console.log("Point does not exist, creating new point");
    setPoint();
      }
});

async function setPoint() {
  console.log("Creating Point");
  const { data: point, message: response } = await $fetch(
    `/api/point/createPoint?point=${pointNum}&list=${listId}&set=${setId}&side=${side}`
  );
  if (!response || response === "error") {
    toast.add({
      title: "Error",
      description: "There was an error creating the Point",
      color: "error",
    });
  }
  pointId.value = point.pointId;
  console.log("Point ID: " + pointId.value);
  toast.add({
    title: "Point has been Added!",
    color: "success",
    icon: "bitcoin-icons:edit-filled",
  });
}

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
        :point-id="pointId"
        :players="players"
      />
      <MatchPointAttackDataCard
        v-else-if="action === 'Attack'"
        :point-id="pointId"
        :players="players"
      />
      <MatchPointReceiveDataCard
        v-else-if="action === 'Receive'"
        :point-id="pointId"
        :players="players"
      />
      <MatchPointSetDataCard
        v-else-if="action === 'Set'"
        :point-id="pointId"
        :players="players"
      />
      <MatchPointBlockDataCard
        v-else-if="action === 'Block'"
        :point-id="pointId"
        :players="players"
      />
    </template>
  </UCard>
</template>
