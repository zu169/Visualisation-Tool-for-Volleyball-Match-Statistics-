<script setup lang="ts">
import { PlayerDisplayTable } from "#components";
import type { TabsItem } from "@nuxt/ui";

type Team = {
  teamId: number;
  teamName: string;
};

const teams = ref<TabsItem[]>([
  {
    label: "View All",
    slot: "all" as const,
  },
]);

const { data: teamData } = useAsyncData<Team[]>(() =>
  $fetch("/api/team/getAllTeamNames")
);

watchEffect(() => {
  if (teamData.value) {
    teams.value = teams.value.filter((t) => !t.id);

    teamData.value.forEach((team) => {
      teams.value.push({
        label: team.teamName,
        id: team.teamId,
      });
    });
  }
});
</script>
<template>
  <UContainer>
    <div class="flex justify-between items-center">
      <h2 class="p-2">Player Information</h2>
      <UButton type="submit" class="h-10" to="/playerInput"
        >Add New Player</UButton
      >
    </div>
    <USeparator />
    <UTabs color="neutral" variant="link" :items="teams" class="w-full">
      <template #all>
        <PlayerDisplayTable :team-id="0" />
      </template>
      <template #content="{ item }">
        <PlayerDisplayTable :team-id="item.id" />
      </template>
    </UTabs>
  </UContainer>
</template>
