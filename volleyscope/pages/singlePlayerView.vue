<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const history = ref<BreadcrumbItem[]>([
  {
    label: "Home",
    icon: "i-lucide-house",
    to: "/",
  },
  {
    label: "Player List",
    icon: "solar:user-broken",
    to: "/playerData",
  },
  {
    label: "Player View",
    to: "/singlePlayerView",
  },
]);

type Player = {
  playerId: number;
  playerName: string;
  position: string;
  shirtNumber: number;
  birthday: Date;
  playerHeight: number;
  playerWeight: number;
  jumpHeight: number;
  serveSpeed: number;
  hittingSpeed: number;
};

type PlayerResponse = {
  player: Player | null;
  teamInfo: {
    teamId: number;
    yearJoined: string;
  }[];
  message?: string;
};

type Team = {
  teamId: number;
  teamName: string;
};

const router = useRouter();
const { query } = useRoute();
const playerId = computed(() => {
  const player = query.player;
  return typeof player === "string" ? parseInt(player, 10) : null;
});
const id = playerId.value;

// Fetch and populate team names
const teamNames = ref<string[]>([]);
const { data: teamData } = useFetch<Team[]>("/api/team/getAllTeamNames");

watchEffect(() => {
  if (teamData.value) {
    teamNames.value = teamData.value.map((team) => team.teamName);
  }
});

console.log("player id " + id);
const { data: playerData } = await useFetch<PlayerResponse>(
  `/api/player/getSinglePlayer?player=${id}`
);

const player = computed(() => playerData.value?.player ?? null);
const teamInfo = computed(() => playerData.value?.teamInfo ?? []);

const teams = teamInfo.value.map((team) => team.teamId);
const yearJoined = teamInfo.value[0].yearJoined || undefined;
const names = (teams || [])
  .map((teamId: number) => {
    const foundTeam = teamData.value?.find((team) => team.teamId === teamId);
    return foundTeam?.teamName;
  })
  .filter((name): name is string => name !== undefined);

const toast = useToast();
const deleteModal = ref(false);

async function deleteSuccess() {
  const response = await $fetch(`/api/player/deletePlayer?player=${id}`);

  if (!response || response.message === "error") {
    toast.add({
      title: "Error",
      description: "There was an error deleting the Player " + name,
      color: "error",
    });
    return;
  }
  router.push({ name: "playerData" });
  toast.add({
    title: "Player " + player?.value?.playerName + " has been deleted!",
    color: "success",
    icon: "i-lucide-trash-2",
  });
}
</script>

<template>
  <UContainer>
    <div class="flex justify-center p-2 pb-5">
      <UBreadcrumb :items="history" />
    </div>
    <div class="flex justify-between items-center">
      <h2 class="p-2">Player Information</h2>
      <div>
        <UButton
          type="submit"
          class="h-10 m-2"
          color="success"
          variant="soft"
          :to="{ path: '/playerInput', query: { player: String(playerId) } }"
          >Edit Player</UButton
        >
        <UButton
          type="submit"
          class="h-10 m-2"
          color="error"
          variant="soft"
          @click="deleteModal = true"
          >Delete Player</UButton
        >
      </div>
    </div>
    <UCard>
      <template #header>
        <div class="flex justify-evenly">
          <img src="~assets/img/playerPlaceholder.jpeg" class="object-cover" />
          <div>
            <h2>{{ player?.playerName }} - {{ player?.playerId }}</h2>
            <!-- <h3 v-if="age != null">Age: {{ age }}</h3> -->
            <h3>Position: {{ player?.position }}</h3>
            <h3>Teams: {{ names }}</h3>
            <h3>Year Joined: {{ yearJoined }}</h3>
            <h3 v-if="player?.shirtNumber != null">
              Shirt Number: {{ player?.shirtNumber }}
            </h3>
            <!-- <h3 v-if="playerData?.position != null">Other Postions: {{ positions }}</h3> -->
          </div>
        </div>
        <div>
          <h3 v-if="player?.playerHeight != null">
            Height: {{ player.playerHeight }}
          </h3>
          <h3 v-if="player?.playerWeight != null">
            Weight: {{ player.playerWeight }}
          </h3>
          <h3 v-if="player?.jumpHeight != null">
            Jump Height: {{ player.jumpHeight }}
          </h3>
          <h3 v-if="player?.hittingSpeed != null">
            Spike Speed: {{ player.hittingSpeed }}
          </h3>
          <h3 v-if="player?.serveSpeed != null">
            Serve Speed: {{ player.serveSpeed }}
          </h3>
        </div>
      </template>
    </UCard>
    <!-- Table with player stats -->
    <!-- List of matches they have played in -->
    <UModal
      v-model:open="deleteModal"
      :dismissible="false"
      :close="false"
      :ui="{ footer: 'justify-end' }"
    >
      <template #header>
        <h3>Are you sure you want to delete this Player?</h3>
      </template>

      <template #body>
        <p>
          This action cannot be reversed and may affect the integrity of
          previously recorded matches!
        </p>
        <p class="font-bold">You can remove them from the team instead.</p>
      </template>

      <template #footer>
        <UButton
          label="No"
          color="success"
          variant="soft"
          @click="deleteModal = false"
        />
        <UButton
          label="Yes, I'm sure!"
          color="error"
          variant="outline"
          @click="deleteSuccess()"
        />
      </template>
    </UModal>
  </UContainer>
</template>
