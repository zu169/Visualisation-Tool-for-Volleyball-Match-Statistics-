<script setup lang="ts">
import { ref, onMounted } from "vue";

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

onMounted(async () => {
  if (matchId !== undefined) {
    const { data: matchData } = await useFetch<Match>(
      `/api/match/getMatch?match=${matchId}`
    );
    if (matchData.value) {
      const { data: teamData } = await useFetch<Team>(
        `/api/team/getTeam?team=${matchData.value.teamId}`
      );
      team.value = teamData.value?.teamName;

      const { data: opponentData } = await useFetch<Team>(
        `/api/team/getOpponent?team=${matchData.value.opponentId}`
      );
      opponent.value = opponentData.value?.teamName;
    }
  }
  refreshNuxtData();
});
</script>

<template>
  <UContainer>
    <div class="flex w-full">
      <div class="flex flex-col gap-2 w-1/2 items-end">
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
