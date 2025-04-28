<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import { ClientOnly } from "#components";

type Team = {
  teamId: number;
  teamName: string;
};

// Fetch teams data on page load
const { data: teamData } = await useAsyncData<Team[]>("teams", () =>
  $fetch("/api/team/getAllTeamNames")
);

const teams = ref<TabsItem[]>([]);

// Populate teams dynamically after data is fetched
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
      <h2 class="p-2">Player Information</h2>
      <UButton type="submit" class="h-10" to="/playerInput"
        >Add New Player</UButton
      >
    </div>
    <USeparator />

    <!-- Tabs component for each team -->
    <UTabs color="neutral" variant="link" :items="teams" class="w-full">
      <template #all>
        <!-- Use ClientOnly to avoid SSR rendering issues -->
        <ClientOnly>
          <PlayerDisplayTable :team-id="0" />
        </ClientOnly>
      </template>

      <template #content="{ item }">
        <ClientOnly>
          <PlayerDisplayTable :team-id="item.id" />
        </ClientOnly>
      </template>
    </UTabs>
  </UContainer>
</template>
