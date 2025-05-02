<script setup lang="ts">
import { ref, watch } from "vue";

const { matchId } = defineProps<{ matchId?: number }>();
const teamScore = defineModel<number>("team");
const opponentScore = defineModel<number>("oppo");
const team = ref<string | undefined>();
const opponent = ref<string | undefined>();

type Match = {
  teamId: number;
  opponentId: number;
  date: string;
  matchType: string;
};

type Team = {
  teamId: number;
  teamName: string;
  league: string;
  division: string;
};

// Use useAsyncData to fetch match, team, and opponent data
const { data: matchData } = useAsyncData("matchData", () =>
  $fetch<Match>(`/api/match/getMatch?match=${matchId}`)
);

const { data: teamData } = useFetch<Team>(
  `/api/team/getTeam?team=${matchData.value?.teamId}`
);
const { data: opponentData } = useFetch<Team>(
  `/api/team/getOpponent?team=${matchData.value?.opponentId}`
);
watch([teamData, opponentData], ([teamData, opponentData]) => {
  if (teamData && opponentData) {
    team.value = teamData.teamName;
    opponent.value = opponentData.teamName;
  }
});
</script>

<template>
  <UContainer>
    <div class="flex w-full">
      <div class="flex flex-row gap-4 w-full items-center justify-center">
        <div class="flex flex-col">
          <label class="text-lg font-semibold p-2">
            {{ team || "Loading..." }}
          </label>
          <UInputNumber
            v-model="teamScore"
            class="size-sm"
            orientation="vertical"
            :min="0"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-lg font-semibold p-2">
            {{ opponent || "Loading..." }}
          </label>
          <UInputNumber
            v-model="opponentScore"
            class="size-sm"
            orientation="vertical"
            :min="0"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>
