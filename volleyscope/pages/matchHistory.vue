<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

type Team = {
  teamId: number;
  teamName: string;
};
const { data: teamData } = await useAsyncData<Team[]>("teams", () =>
  $fetch("/api/team/getAllTeamNames")
);

const teams = ref<TabsItem[]>([]);

if (teamData.value) {
  teams.value = [
    {
      label: "View All",
      slot: "all" as const,
    },
    ...teamData.value.map((team) => ({
      label: team.teamName,
      id: team.teamId,
    })),
  ];
}
</script>

<template>
  <UContainer>
    <div class="flex justify-between items-center">
      <h2 class="p-2">Match History</h2>
      <UButton type="submit" class="h-10" to="/matchInput"
        >Add New Match</UButton
      >
    </div>
    <USeparator />
    <UTabs color="neutral" variant="link" :items="teams" class="w-full">
      <template #all>
        <ClientOnly>
          <MatchHistoryTable :team-id="0" />
        </ClientOnly>
      </template>

      <template #content="{ item }">
        <ClientOnly>
          <MatchHistoryTable :team-id="item.id" />
        </ClientOnly>
      </template>
    </UTabs>
  </UContainer>
</template>
