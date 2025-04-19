<script setup lang="ts">
const toast = useToast();

type Set = {
  setId: number;
  matchId: number;
  teamScore: number;
  opponentScore: number;
  youtubeLink: string;
};

const { editView, matchId, setId } = defineProps<{
  editView: boolean;
  matchId: number;
  setId: number;
}>();

const original = ref<Set | undefined>();
const teamScore = ref();
const opponentScore = ref();
const youtube = ref();
const setExists = ref(false); // Flag to track if the set exists

if (editView) {
  const { data: setData } = useAsyncData<Set>(() =>
    $fetch(`/api/set/getSet?match=${matchId}&set=${setId}`)
  );

  watchEffect(() => {
    if (setData.value) {
      teamScore.value = setData.value?.teamScore;
      opponentScore.value = setData.value?.opponentScore;
      youtube.value = setData.value?.youtubeLink;

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
  if (!teamScore.value || !opponentScore.value || !youtube.value) return;

  if (!setExists.value) {
    // Create the set if it does not exist
    saveSet(0);
  } else if (setExists.value && hasChanged()) {
    // Edit the set if it exists and has changed
    saveSet(1);
  } 
  return;
});

async function saveSet(num: number) {
  const data: Set = {
    setId: setId,
    matchId: matchId,
    teamScore: teamScore.value,
    opponentScore: opponentScore.value,
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
      title: "Set " + setId + " has been added!",
      color: "success",
      icon: "bitcoin-icons:edit-filled",
    });
    setExists.value = true; // Mark the set as existing after creation
  } else if (num === 1) {
    const response = await $fetch(
      `/api/set/updateSet?match=${matchId}&set=${setId}`,
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
      title: "Set " + setId + " has been edited!",
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
      <!-- <MatchSetTimeline /> -->
    </div>
    <div class="flex-1">
      <UCard class="h-full">
        <template #header>
          <!-- Player Input -->
          <p>Select Player's and their positions for the set</p>
        </template>

        <MatchSetYoutubeInput v-model="youtube" />
      </UCard>
    </div>
  </div>
</template>
