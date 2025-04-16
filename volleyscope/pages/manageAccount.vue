<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const options = ref<TabsItem[]>([
  {
    label: "Home Teams",
    slot: "home" as const,
  },
  {
    label: "Opponent Teams",
    slot: "opponent" as const,
  },
  {
    label: "All Players",
    slot: "players" as const,
  },
]);

const toast = useToast();
const homeInputView = ref(false);
const opponentInputView = ref(false);

function homeInput() {
  homeInputView.value = true;
}

function opponentInput() {
  opponentInputView.value = true;
}
</script>

<template>
  <UContainer>
    <div class="flex justify-between items-center">
      <h2 class="p-2">Account Management</h2>
      <h2 class="p-2">Aberystwyth University</h2>
    </div>
    <USeparator />
    <UTabs color="neutral" variant="link" :items="options" class="w-full">
      <template #home>
        <div class="flex justify-between items-center">
          <h2 class="p-2">Home Information</h2>
          <UButton type="submit" class="h-10" @click="homeInput"
            >Add New Team</UButton
          >
        </div>
        <USeparator />
        <p class="p-2 font-thin">
          You need to add all teams that your club manages to be able to add
          players to it and select them when add match information.
        </p>
        <TeamHomeDisplayTable />
      </template>
      <template #opponent>
        <div class="flex justify-between items-center">
          <h2 class="p-2">Opponent Information</h2>
          <UButton type="submit" class="h-10" @click="opponentInput"
            >Add New Team</UButton
          >
        </div>
        <USeparator />
        <p class="p-2 font-thin">
          You need to add all teams that your club plays against to be able to
          select them as opponents when adding a match. (You can add these as
          you go!)
        </p>
        <TeamOpponentDisplayTable />
      </template>
      <template #players>
        <div class="flex justify-between items-center">
          <h2 class="p-2">Player Information</h2>
          <UButton type="submit" class="h-10" to="/playerInput"
            >Add New Player</UButton
          >
        </div>
        <USeparator />
        <PlayerDisplayTable />
      </template>
    </UTabs>
  </UContainer>
</template>
