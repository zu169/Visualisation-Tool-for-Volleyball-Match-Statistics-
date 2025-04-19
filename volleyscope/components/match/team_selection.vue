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
const teamNames = ref<string[]>([]);
const { data: teamData } = useAsyncData<Team[]>(() =>
  $fetch("/api/team/getAllTeamNames")
);

watchEffect(() => {
  if (teamData.value) {
    teamNames.value = teamData.value.map((team) => team.teamName);
  }
});

// Fetch opponents
const opponentNames = ref<string[]>([]);
const { data: opponentData } = useAsyncData<Team[]>(() =>
  $fetch("/api/team/getAllOpponentsNames")
);

watchEffect(() => {
  if (opponentData.value) {
    opponentNames.value = opponentData.value.map((team) => team.teamName);
  }
});

if (team.value !== undefined && opponent.value !== undefined) {
  selectedTeamName.value = teamData.value?.find(
    (t) => t.teamId === team.value
  )?.teamName;
  selectedOpponentName.value = opponentData.value?.find(
    (t) => t.teamId === opponent.value
  )?.teamName;
}

watchEffect(() => {
  if (!teamData.value || !selectedTeamName.value) return;

  team.value = teamData.value?.find(
    (t) => t.teamName === selectedTeamName.value
  )?.teamId;
  console.log("Team Info: " + team.value);
});

watchEffect(() => {
  if (!opponentData.value || !selectedOpponentName.value) return;

  opponent.value = opponentData.value?.find(
    (t) => t.teamName === selectedOpponentName.value
  )?.teamId;
  console.log("Opponent Info: " + opponent.value);
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
