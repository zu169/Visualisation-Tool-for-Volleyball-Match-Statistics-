<script setup lang="ts">
const toast = useToast();

type Set = {
  setId: number;
  matchId: number;
  setNumber: number;
  teamScore: number;
  opponentScore: number;
  playerListId: number;
  youtubeLink: string;
};

const { editView, matchId, setNum } = defineProps<{
  editView: boolean;
  matchId: number;
  setNum: number;
}>();

console.log("Match ID: " + matchId);
console.log("Set Number: " + setNum);
console.log("Edit View: " + editView);

const setId = ref<number | undefined>(undefined);

const original = ref<Set | undefined>();
const teamScore = ref(0);
const opponentScore = ref(0);
const playerListId = ref();
const youtube = ref();

if (editView) {
  const { data: setData, pending } = useFetch<Set>(
    `/api/set/getSet?match=${matchId}&set=${setNum}`
  );

  watchEffect(() => {
    if (pending.value === true) return; // Wait until the data is fully loaded
    if (setData.value && setId.value === undefined) {
      console.log("setData", setData.value);
      setId.value = setData.value.setId;
      teamScore.value = setData.value.teamScore;
      opponentScore.value = setData.value.opponentScore;
      playerListId.value = setData.value.playerListId;
      youtube.value = setData.value.youtubeLink;
      console.log("Player List ID: " + playerListId.value);
      original.value = { ...setData.value };
    } else if (setData.value === null) {
      console.log("No existing set — starting fresh.");
      setId.value = undefined;
      // No data to populate; keep fresh inputs
    }
  });
}

function hasChanged(): boolean {
  if (!original.value) return true;

  return (
    original.value.teamScore !== teamScore.value ||
    original.value.opponentScore !== opponentScore.value ||
    original.value.youtubeLink !== youtube.value
  );
}

watchEffect(() => {
  if (
    !teamScore.value ||
    !opponentScore.value ||
    !youtube.value ||
    !playerListId.value
  )
    return;

  if (setId.value === undefined) {
    // Create the set if it does not exist
    saveSet(0);
  } else if (setId.value && hasChanged()) {
    // Edit the set if it exists and has changed
    saveSet(1);
  }
  return;
});

async function saveSet(num: number) {
  const data: Set = {
    matchId: matchId,
    setNumber: setNum,
    teamScore: teamScore.value,
    opponentScore: opponentScore.value,
    playerListId: playerListId.value,
    youtubeLink: youtube.value,
  };

  if (num === 0) {
    const { data: setId, message: response } = await $fetch(
      "/api/set/setInput",
      {
        method: "POST",
        body: data,
      }
    );
    if (!response || response.message === "error") {
      toast.add({
        title: "Error",
        description: "There was an error submitting the set information",
        color: "error",
      });
      return;
    }
    toast.add({
      title: "Set " + setNum + " has been added!",
      color: "success",
      icon: "bitcoin-icons:edit-filled",
    });
    setId.value = setId;
  } else if (num === 1) {
    const response = await $fetch(
      `/api/set/updateSet?match=${matchId}&set=${setNum}`,
      {
        method: "PUT",
        body: data,
      }
    );
    if (!response || response.message === "error") {
      toast.add({
        title: "Error",
        description: "There was an error updating the set information",
        color: "error",
      });
      return;
    }
    toast.add({
      title: "Set " + setNum + " has been edited!",
      color: "success",
      icon: "bitcoin-icons:edit-filled",
    });
  }
}
</script>

<template>
  <div class="flex gap-4">
    <div class="flex-1">
      <MatchSetScoreInput
        v-model:team="teamScore"
        v-model:oppo="opponentScore"
        :match-id="matchId"
      />
      <div v-if="setId !== undefined">
        <MatchSetTimeline
          :team="teamScore"
          :opponent="opponentScore"
          :list-id="playerListId"
          :set-id="setId"
        />
      </div>
    </div>
    <div class="flex-1">
      <UCard class="h-full">
        <template #header>
          <!-- Player Input -->
          <MatchSetPlayerTable
            v-model="playerListId"
            :match-id="matchId"
            :set-num="setNum"
          />
        </template>

        <MatchSetYoutubeInput v-model="youtube" />
      </UCard>
    </div>
  </div>
</template>
