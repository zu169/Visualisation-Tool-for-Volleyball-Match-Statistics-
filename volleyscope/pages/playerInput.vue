<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import type { BreadcrumbItem, FormSubmitEvent } from "@nuxt/ui";
import * as v from "valibot";

const router = useRouter();
const { query } = useRoute();
const playerId = computed(() => query.player?.toString());

//if playerId null then create new player table and id
const editView = ref(false);
if (playerId.value) {
  editView.value = true;
}

// async function setupEdit(event: FormDataEventInit){

// };

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
const schema = v.object({
  playerName: v.pipe(
    v.string(),
    v.maxLength(100, "Cannot be more than 100 characters")
  ),
  position: v.pipe(v.string()),
  shirtNumber: v.pipe(v.number("Must be a number")),
  // birthday: v.pipe(v.date()),
  playerHeight: v.pipe(v.number()),
  playerWeight: v.pipe(v.number()),
  jumpHeight: v.pipe(v.number()),
  serveSpeed: v.pipe(v.number()),
  hittingSpeed: v.pipe(v.number()),
});

type Schema = v.InferOutput<typeof schema>;
// Add when team tables are made
// teams: "",
// year_joined: "",
// Data for Player Info Input
const state = reactive({
  playerName: undefined,
  position: undefined,
  shirtNumber: undefined,
  // birthday: new CalendarDate(2025, 10, 15),
  playerHeight: undefined,
  playerWeight: undefined,
  jumpHeight: undefined,
  serveSpeed: undefined,
  hittingSpeed: undefined,
});

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
    label: "Add Player",
    to: "/playerInput",
  },
]);

// const possible_teams = ["Mens 1", "Womens 1", "Mens BDVA"];

// const df = new DateFormatter("en-UK", {
//   dateStyle: "medium",
// });

const toast = useToast();
const editModal = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await $fetch("/api/playerInput", {
    method: "POST",
    body: state,
  });

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

function editSuccess() {
  router.push({ name: "playerData" });
  toast.add({
    title: "Player " + state.playerName + " has been edited!",
    color: "success",
    icon: "bitcoin-icons:edit-filled",
  });
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
          <!-- <UFormField
            label="Teams"
            required
            hint="Which team do they play for?"
            size="xl"
            class="p-2"
          >
            <USelect
              v-model="state.teams"
              multiple
              placeholder="Select a team..."
              :items="possible_teams"
              class="w-full"
            />
          </UFormField> -->
          <!-- <UFormField label="Club Member Since" required size="xl" class="p-2">
            <UPopover class="p-2">
              <UButton
                color="neutral"
                variant="subtle"
                icon="i-lucide-calendar"
              >
                {{
                  year_joined
                    ? df.format(year_joined.toDate(getLocalTimeZone()))
                    : "Select a date"
                }}
              </UButton>
              <template #content>
                <UCalendar v-model="year_joined" class="p-2" />
              </template>
            </UPopover>
          </UFormField> -->
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
    <UModal
      v-model:open="editModal"
      :dismissible="false"
      :close="false"
      :ui="{ footer: 'justify-end' }"
    >
      <template #header>
        <h3>Are you sure you want to save these changes?</h3>
      </template>

      <template #body>
        <p class="font-bold">Any changes saved can't be reverted!</p>
      </template>

      <template #footer>
        <UButton
          label="Yes I'm sure, Continue"
          color="success"
          variant="outline"
          @click="editSuccess()"
        />
        <UButton
          label="No, Cancel"
          color="error"
          variant="soft"
          @click="editModal = false"
        />
      </template>
    </UModal>
  </UContainer>
</template>
