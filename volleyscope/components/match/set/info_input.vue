<script setup lang="ts">
const toast = useToast();

type Set = {
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

const original = ref<Set | undefined>();
const teamScore = ref();
const opponentScore = ref();
const playerListId = ref();
const youtube = ref();
const setExists = ref(false); // Flag to track if the set exists

if (editView) {
  const { data: setData, pending } = useAsyncData<Set>(() =>
    $fetch(`/api/set/getSet?match=${matchId}&set=${setNum}`)
  );

  watchEffect(() => {
    if (pending.value === true) return; // Wait until the data is fully loaded
    if (setData.value && !setExists.value) {
      console.log("setData", setData.value);
      teamScore.value = setData.value.teamScore;
      opponentScore.value = setData.value.opponentScore;
      playerListId.value = setData.value.playerListId;
      youtube.value = setData.value.youtubeLink;
      console.log("Player List ID: " + playerListId.value);
      original.value = { ...setData.value };
      setExists.value = true; // Mark the set as existing
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

  if (setExists.value === false) {
    // Create the set if it does not exist
    saveSet(0);
  } else if (setExists.value === true && hasChanged()) {
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
    const response = await $fetch("/api/set/setInput", {
      method: "POST",
      body: data,
    });

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
    setExists.value = true; // Mark the set as existing after creation
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
      <div v-if="setExists">
        <MatchSetTimeline :team="teamScore" :opponent="opponentScore" />
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
