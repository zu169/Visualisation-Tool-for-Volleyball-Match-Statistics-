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

const router = useRouter();
const { query } = useRoute();
const playerId = computed(() => parseInt(query.player?.toString() ?? "1"));
const id = playerId.value;
console.log("player id " + id);
const { data: playerData } = useAsyncData<Player>(() =>
  $fetch(`/api/getSinglePlayer?player=${id}`)
);
console.log(playerData);

const toast = useToast();
const deleteModal = ref(false);

function deleteSuccess() {
  router.push({ name: "playerData" });
  toast.add({
    title: "Player " + playerData?.value?.playerName + " has been deleted!",
    color: "error",
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
          :to="{ path: '/playerInput', query: { player: playerId } }"
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
            <h2>{{ playerData?.playerName }} - {{ playerData?.playerId }}</h2>
            <!-- <h3 v-if="age != null">Age: {{ age }}</h3> -->
            <h3>Position: {{ playerData?.position }}</h3>
            <!-- <h3>Teams: {{ teams }}</h3> -->
            <!-- <h3>Year Joined: {{ year_joined }}</h3> -->
            <h3 v-if="playerData?.shirtNumber != null">
              Shirt Number: {{ playerData?.shirtNumber }}
            </h3>
            <!-- <h3 v-if="playerData?.position != null">Other Postions: {{ positions }}</h3> -->
          </div>
        </div>
        <div>
          <h3 v-if="playerData?.playerHeight != null">
            Height: {{ playerData.playerHeight }}
          </h3>
          <h3 v-if="playerData?.playerWeight != null">
            Weight: {{ playerData.playerWeight }}
          </h3>
          <h3 v-if="playerData?.jumpHeight != null">
            Jump Height: {{ playerData.jumpHeight }}
          </h3>
          <h3 v-if="playerData?.hittingSpeed != null">
            Spike Speed: {{ playerData.hittingSpeed }}
          </h3>
          <h3 v-if="playerData?.serveSpeed != null">
            Serve Speed: {{ playerData.serveSpeed }}
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
