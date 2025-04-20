<script setup lang="ts">
import { MatchInfoInput } from "#components";
import type { TabsItem } from "@nuxt/ui";

const toast = useToast();
const router = useRouter();
const { query } = useRoute();
const matchId = computed(() => {
  const match = query.match;
  return typeof match === "string" ? parseInt(match, 10) : undefined;
});

const id = ref<number | undefined>(matchId.value);
console.log(id);

const isContentDisabled = computed(() => {
  return typeof id.value !== "number" || isNaN(id.value);
});
const editView = matchId.value !== undefined;
const deleteModal = ref(false);
const unableToSave = ref(false);
const leaveModal = ref(false);

type Set = {
  setNumber: number;
};
const sets = ref<TabsItem[]>([
  {
    label: "Set 1",
    id: 1,
  },
]);
//load sets from database
const { data: setData } = useAsyncData<Set[]>(() =>
  $fetch(`/api/set/getAllSetNumbers?match=${id.value}`)
);

watchEffect(() => {
  if (setData.value !== null && sets.value.length === 1) {
    if (Array.isArray(setData.value)) {
      sets.value.pop();
      setData.value.forEach((set) => {
        sets.value.push({
          label: "Set " + set.setNumber,
          id: set.setNumber,
        });
      });
    }
    refreshNuxtData();
  }
});

const addSet = () => {
  //create new table for set
  sets.value.push({
    label: "Set " + (sets.value.length + 1),
    id: sets.value.length + 1,
  });
};

function deleteMatch() {
  //check if any data has been filled in
  const dataExist = ref(true);
  if (dataExist.value === true) {
    if (editView) {
      leaveModal.value = true;
    } else {
      //display a warning modal
      deleteModal.value = true;
    }
  } else {
    router.push({ name: "matchHistory" });
  }
}

function leaveSuccess() {
  leaveModal.value = false;
  router.push({ name: "matchHistory" });
  toast.add({
    title: "No changes to Match " + matchId.value + " have been made!",
    color: "success",
    icon: "bitcoin-icons:edit-filled",
  });
}

function deleteSuccess() {
  // delete all records with match id from database
  deleteModal.value = false;
  router.push({ name: "matchHistory" });
  toast.add({
    title: "Match " + matchId.value + " has been deleted!",
    color: "error",
    icon: "i-lucide-trash-2",
  });
}

function openMatchView() {
  unableToSave.value = false;
  //check if the required data has been added
  const required = ref(false);
  // make sure all the data has been saved
  const saved = ref(true);

  if (required.value && saved.value === true) {
    router.push({ name: "singleMatchView", query: { match: matchId.value } });
    toast.add({
      title: "Match " + matchId.value + " has been created!",
      color: "success",
      icon: "bitcoin-icons:edit-filled",
    });
  }
  unableToSave.value = true;
}

// function editSuccess() {
//   router.push({ name: "singleMatchView", query: { match: matchId.value } });
//   toast.add({
//     title: "Match " + matchId.value + " has been edited!",
//     color: "success",
//     icon: "bitcoin-icons:edit-filled",
//   });
// }
</script>

<template>
  <UContainer>
    <UAlert
      v-if="unableToSave"
      class="mb-4 flex justify-center"
      title="Unable to save Match!"
      description="Ensure all the required Match Data is filled out."
      variant="soft"
      close
      :ui="{ title: 'font-bold' }"
      @click="unableToSave = false"
    />
    <UCard :ui="{ footer: 'flex justify-end' }">
      <template #header>
        <h2 class="p-2">Add New Match</h2>
        <MatchInfoInput v-model="id" />
      </template>
      <div
        :class="{
          'opacity-50 pointer-events-none select-none': isContentDisabled,
        }"
      >
        <UButton
          label="Add Set"
          class="flex justify-self-end"
          variant="soft"
          color="primary"
          @click="addSet()"
        />
        <UTabs color="neutral" variant="link" :items="sets" class="w-full">
          <template #content="{ item }">
            <MatchSetInfoInput
              :edit-view="editView"
              :match-id="id"
              :set-num="item.id"
            />
          </template>
        </UTabs>
      </div>
      <template #footer>
        <UButton
          class="mr-2"
          label="Save Match"
          color="success"
          variant="outline"
          size="lg"
          @click="openMatchView()"
        />
        <UButton
          label="Cancel"
          color="error"
          variant="soft"
          size="lg"
          @click="deleteMatch()"
        />
      </template>
    </UCard>
    <UModal
      v-model:open="deleteModal"
      :dismissible="false"
      :close="false"
      :ui="{ footer: 'justify-end' }"
    >
      <template #header>
        <h3>Are you sure you want to leave without saving?</h3>
      </template>

      <template #body>
        <p>
          This action cannot be reversed and you will lose all the progress you
          have made!
        </p>
        <p class="font-bold">You can save your progress instead!</p>
        <p>
          Fill in the required match information: (Home Team, Opponenent Team,
          Game Date, Game Type)
        </p>
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
    <UModal
      v-model:open="leaveModal"
      :dismissible="false"
      :close="false"
      :ui="{ footer: 'justify-end' }"
    >
      <template #header>
        <h3>Are you sure you want to leave without saving?</h3>
      </template>

      <template #body>
        <p>
          This action cannot be reversed and you will lose all the changes you
          have made!
        </p>
        <p class="font-bold">
          The Player Information will go back to how it was before!
        </p>
      </template>

      <template #footer>
        <UButton
          label="No"
          color="success"
          variant="soft"
          @click="leaveModal = false"
        />
        <UButton
          label="Yes, I'm sure!"
          color="error"
          variant="outline"
          @click="leaveSuccess()"
        />
      </template>
    </UModal>
    <!-- <UModal
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
    </UModal> -->
  </UContainer>
</template>
