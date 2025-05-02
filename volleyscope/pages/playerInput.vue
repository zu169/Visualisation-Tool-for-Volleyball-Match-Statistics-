<script setup lang="ts">
import type { BreadcrumbItem, FormSubmitEvent } from "@nuxt/ui";
import * as v from "valibot";

// Router and route setup
const router = useRouter();
const { query } = useRoute();

// Extract playerId from route query
const playerId = computed(() => {
  const player = query.player;
  return typeof player === "string" ? parseInt(player, 10) : null;
});

// Define types
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

// Form state
const state = reactive<{
  playerName: string | undefined;
  position: string | undefined;
  shirtNumber: number | undefined;
  teamNames: string[] | undefined;
  teams: number[] | undefined;
  yearJoined: string | undefined;
  playerHeight: number | undefined;
  playerWeight: number | undefined;
  jumpHeight: number | undefined;
  serveSpeed: number | undefined;
  hittingSpeed: number | undefined;
}>({
  playerName: undefined,
  position: undefined,
  shirtNumber: undefined,
  teamNames: undefined,
  teams: undefined,
  yearJoined: undefined,
  playerHeight: undefined,
  playerWeight: undefined,
  jumpHeight: undefined,
  serveSpeed: undefined,
  hittingSpeed: undefined,
});

// Fetch and populate team names
const teamNames = ref<string[]>([]);
const { data: teamData } = useAsyncData<Team[]>(() =>
  $fetch("/api/team/getAllTeamNames")
);

watchEffect(() => {
  if (teamData.value) {
    teamNames.value = teamData.value.map((team) => team.teamName);
  }
});

// If playerId exists, we're in edit mode
const editView = ref(false);
if (playerId.value) {
  editView.value = true;

  const { data: playerData } = await useAsyncData<PlayerResponse>(() =>
    $fetch(`/api/player/getSinglePlayer?player=${playerId.value}`)
  );

  watchEffect(() => {
    if (editView.value && playerData.value) {
      const player = computed(() => playerData.value?.player ?? null);
      const teamInfo = computed(() => playerData.value?.teamInfo ?? []);
      const message = computed(() => playerData.value?.message ?? "");

      if (player.value) {
        // Populate state with existing player data
        state.playerName = player.value.playerName;
        state.position = player.value.position;
        state.shirtNumber = player.value.shirtNumber;
        state.playerHeight = player.value.playerHeight;
        state.playerWeight = player.value.playerWeight;
        state.jumpHeight = player.value.jumpHeight;
        state.serveSpeed = player.value.serveSpeed;
        state.hittingSpeed = player.value.hittingSpeed;

        // Map team info to state
        state.teams = teamInfo.value.map((team) => team.teamId);
        state.yearJoined = teamInfo.value[0].yearJoined || undefined;
        state.teamNames = (state.teams || [])
          .map((teamId: number) => {
            const foundTeam = teamData.value?.find(
              (team) => team.teamId === teamId
            );
            return foundTeam?.teamName;
          })
          .filter((name): name is string => name !== undefined);
      } else {
        console.warn("Message:", message.value || "Player not found");
      }
    }
  });
}

// Dropdown options
const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
const positions = [
  "Setter",
  "Outside Hitter",
  "Middle Blocker",
  "Opposite Hitter",
  "Libero",
  "Defensive Specialist",
  "Service Specialist",
  "Bench",
];

// Form validation schema
const schema = v.object({
  playerName: v.pipe(
    v.string(),
    v.maxLength(100, "Cannot be more than 100 characters")
  ),
  position: v.pipe(v.string()),
  shirtNumber: v.pipe(
    v.number("Must be a number"),
    v.toMinValue(0)
  ),
  teams: v.array(v.number()),
  yearJoined: v.pipe(v.string()),
  playerHeight: v.pipe(v.number()),
  playerWeight: v.pipe(v.number()),
  jumpHeight: v.pipe(v.number()),
  serveSpeed: v.pipe(v.number()),
  hittingSpeed: v.pipe(v.number()),
});

type Schema = v.InferOutput<typeof schema>;

// Breadcrumb navigation
const history = ref<BreadcrumbItem[]>([
  { label: "Home", icon: "i-lucide-house", to: "/" },
  { label: "Player List", icon: "solar:user-broken", to: "/playerData" },
  { label: "Add Player", to: "/playerInput" },
]);

const toast = useToast();

// Submit new or updated player info
async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (editView.value === true) {
    const response = await $fetch(
      `/api/player/updatePlayer?player=${playerId.value}`,
      {
        method: "PUT",
        body: state,
      }
    );

    if (!response || response.message === "error") {
      toast.add({
        title: "Error",
        description: "There was an error submitting the form",
        color: "error",
      });
      return;
    } else if (response.message === "missing") {
      toast.add({
        title: "Error",
        description: "Required values are missing!",
        color: "error",
      });
      return;
    }
    router.push({ name: "playerData" });
    toast.add({
      title: "Player " + state.playerName + " has been edited!",
      color: "success",
      icon: "bitcoin-icons:edit-filled",
    });
    return;
  }

  // Map team names to team IDs
  state.teams = (state.teamNames || [])
    .map((teamName: string) => {
      const foundTeam = teamData.value?.find(
        (team) => team.teamName === teamName
      );
      return foundTeam?.teamId;
    })
    .filter((id): id is number => id !== undefined);

  const response = await $fetch("/api/player/playerInput", {
    method: "POST",
    body: state,
  });

  // Handle errors and success
  if (!response || response.message === "error") {
    toast.add({
      title: "Error",
      description: "There was an error submitting the form",
      color: "error",
    });
    return;
  } else if (response.message === "missing") {
    toast.add({
      title: "Error",
      description: "Required values are missing!",
      color: "error",
    });
    return;
  }

  router.push({ name: "playerData" });
  toast.add({
    title: "Player " + state.playerName + " has been added!",
    color: "success",
    icon: "bitcoin-icons:edit-filled",
  });

  console.log(event.data);
}
</script>

<template>
  <UContainer>
    <UBreadcrumb :items="history" class="p-2 pb-5 flex justify-center" />
    <div class="flex justify-center">
      <UCard class="w-[80%]">
        <template #header>
          <h2>Add New Player</h2>
        </template>

        <h3 class="p-2">Required Information</h3>
        <USeparator />
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField
            label="Player Name"
            required
            size="xl"
            class="p-2"
            name="name"
          >
            <UInput
              v-model="state.playerName"
              placeholder="Enter Name..."
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Main Position"
            required
            hint="Enter the Player's main position."
            size="xl"
            class="p-2"
          >
            <USelect
              v-model="state.position"
              placeholder="Select a position..."
              :items="positions"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Shirt Number" size="xl" class="p-2">
            <UInput
              v-model="state.shirtNumber"
              placeholder="Enter Shirt Number..."
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Teams"
            required
            hint="Which team do they play for?"
            size="xl"
            class="p-2"
          >
            <USelect
              v-model="state.teamNames"
              multiple
              placeholder="Select a team..."
              :items="teamNames"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Club Member Since" required size="xl" class="p-2">
            <USelect
              v-model="state.yearJoined"
              placeholder="Select a Year..."
              :items="years"
              class="w-full"
            />
          </UFormField>
          <h3 class="p-2 pt-5">Additional Information</h3>
          <USeparator />
          <UFormField label="Vertical Jump" size="xl" class="p-2">
            <UInputNumber
              v-model="state.jumpHeight"
              placeholder="Enter jump in inches..."
              :format-options="{ style: 'unit', unit: 'inch' }"
              orientation="vertical"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Serve Speed" size="xl" class="p-2">
            <UInputNumber
              v-model="state.serveSpeed"
              placeholder="Enter speed in km/h"
              :format-options="{ style: 'unit', unit: 'kilometer-per-hour' }"
              orientation="vertical"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Spike Speed" size="xl" class="p-2">
            <UInputNumber
              v-model="state.hittingSpeed"
              placeholder="Enter speed in km/h"
              :format-options="{ style: 'unit', unit: 'kilometer-per-hour' }"
              orientation="vertical"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Height" size="xl" class="p-2">
            <UInputNumber
              v-model="state.playerHeight"
              placeholder="Enter height in cm"
              :format-options="{ style: 'unit', unit: 'centimeter' }"
              orientation="vertical"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Weight" size="xl" class="p-2">
            <UInputNumber
              v-model="state.playerWeight"
              placeholder="Enter weight in kg"
              :format-options="{ style: 'unit', unit: 'kilogram' }"
              orientation="vertical"
              class="w-full"
            />
          </UFormField>
          <!-- <UFormField
            label="Birthday"
            hint="Enter the Player's to display their age (Optional)"
            size="xl"
            class="p-2"
          >
            <UPopover class="p-2">
              <UButton
                color="neutral"
                variant="subtle"
                icon="i-lucide-calendar"
              >
                {{
                  state.birthday
                    ? df.format(state.birthday.toDate(getLocalTimeZone()))
                    : "Select a date"
                }}
              </UButton>
              <template #content>
                <UCalendar
                  v-model="state.birthday"
                  :default-value="new CalendarDate(2007, 11, 8)"
                  class="p-2"
                />
              </template>
            </UPopover>
          </UFormField> -->
          <USeparator class="pt-5 pb-5" />
          <div class="flex justify-center p-2">
            <!-- Add Toast to confirm new player has been added -->
            <UButton
              type="submit"
              class="p-2 flex justify-center w-sm"
              size="xl"
              @click="onSubmit"
            >
              Submit
            </UButton>
          </div>
        </UForm>
      </UCard>
    </div>
  </UContainer>
</template>
