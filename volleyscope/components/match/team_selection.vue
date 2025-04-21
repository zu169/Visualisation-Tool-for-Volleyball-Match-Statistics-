<script setup lang="ts">
const team = defineModel<number>("team");
const opponent = defineModel<number>("oppo");

type Team = {
  teamId: number;
  teamName: string;
};

const selectedTeamName = ref<string>();
const selectedOpponentName = ref<string>();

// Fetch teams
const { data: teamData } = useAsyncData<Team[]>("teamNames", () =>
  $fetch("/api/team/getAllTeamNames")
);

const teamNames = computed(
  () => teamData.value?.map((team) => team.teamName) || []
);

// Fetch opponents
const { data: opponentData } = useAsyncData<Team[]>(() =>
  $fetch("/api/team/getAllOpponentsNames")
);

const opponentNames = computed(
  () => opponentData.value?.map((team) => team.teamName) || []
);

watch(
  [teamData, opponentData],
  () => {
    if (team.value !== undefined && teamData.value) {
      selectedTeamName.value = teamData.value.find(
        (t) => t.teamId === team.value
      )?.teamName;
    }

    if (opponent.value !== undefined && opponentData.value) {
      selectedOpponentName.value = opponentData.value.find(
        (t) => t.teamId === opponent.value
      )?.teamName;
    }
  },
  { immediate: true }
);

// Update team ID when name selection changes
watch(selectedTeamName, (newName) => {
  if (!newName || !teamData.value) {
    team.value = undefined;
    return;
  }

  const foundTeam = teamData.value.find((t) => t.teamName === newName);
  team.value = foundTeam?.teamId;
  console.log("Team Info:", team.value);
});

// Update opponent ID when name selection changes
watch(selectedOpponentName, (newName) => {
  if (!newName || !opponentData.value) {
    opponent.value = undefined;
    return;
  }

  const foundOpponent = opponentData.value.find((t) => t.teamName === newName);
  opponent.value = foundOpponent?.teamId;
  console.log("Opponent Info:", opponent.value);
});
</script>

<template>
  <div class="flex space-x-4">
    <div class="flex flex-col">
      <label class="mb-1 p-2">Team Selection</label>
      <USelectMenu
        v-model="selectedTeamName"
        :items="teamNames"
        searchable
        class="w-full lg:w-48"
        placeholder="Select a team..."
      />
    </div>
    <div class="flex flex-col">
      <label class="block mb-1 p-2">Opponent Selection</label>
      <USelectMenu
        v-model="selectedOpponentName"
        :items="opponentNames"
        searchable
        class="w-full lg:w-48"
        placeholder="Select a team..."
      />
    </div>
  </div>
</template>
