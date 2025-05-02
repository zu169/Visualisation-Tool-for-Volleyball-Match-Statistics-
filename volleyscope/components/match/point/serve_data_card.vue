<script setup lang="ts">
const { pointId, players } = defineProps<{
  pointId: number;
  players: Player[];
}>();

console.log("Point ID: " + pointId);

type Player = {
  playerId: number;
  playerName: string;
  position: string;
  shirtNumber: number;
};

const toast = useToast();
const serve_types = ["Underhand", "Overhand", "Float", "Jump"];
const serve_success = ["Normal", "Ace", "Error"];
const selected = ref<Player>();

const serve = ref();
const success = ref();

const { data: serveData, pending } = await useFetch(`/api/point/getServe?point=${pointId}`,
  {
    watch: [pointId],
    immediate: true,
  }
);

watchEffect(() => {
  if (pending.value) return; // wait for fetch to finish
  if (!serveData.value || serveData.value.length === 0) return;

  const serveInfo = serveData.value[0];

  // Find the player object from the players array
  selected.value = players.find((p) => p.playerName === serveInfo.playerName);
  serve.value = serveInfo.type;
  success.value = serveInfo.success;
});

watchEffect(() => {
  if (!selected.value || !serve.value || !success.value) return;
  console.log(
    "Selected Player: " + selected.value?.playerName,
    "Serve Type: " + serve?.value,
    "Serve Success: " + success?.value
  );
  if (pointId) {
    saveServe();
  }
});

async function saveServe() {
  const serveData = {
    pointId: pointId,
    playerId: selected.value.playerId,
    type: serve.value,
    success: success.value,
  };
  console.log("Serve Data", serveData);
  const response = await $fetch("/api/point/createServe", {
    method: "POST",
    body: serveData,
  });
  if (!response || response.message === "error") {
    toast.add({
      title: "Error",
      description: "There was an error creating the Serve",
      color: "error",
    });
  } else {
    toast.add({
      title: "Serve Information has been Added!",
      color: "success",
      icon: "bitcoin-icons:edit-filled",
    });
  }
}
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
