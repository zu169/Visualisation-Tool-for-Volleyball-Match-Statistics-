<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as v from "valibot";

type Team = {
  teamId: number;
  teamName: string;
  league: string;
  division: string;
};

const state = reactive<{
  teamName: string | undefined;
  league: string | undefined;
  division: string | undefined;
}>({
  teamName: undefined,
  league: undefined,
  division: undefined,
});

const opponentViewModal = defineModel<boolean>();
const { teamId } = defineProps<{ teamId?: number }>();
console.log(teamId);
const editView = ref(false);

if (teamId) {
  editView.value = true;
  const { data: teamData } = useAsyncData<Team>(() =>
    $fetch(`/api/team/getOpponent?team=${teamId}`)
  );

  watchEffect(() => {
    if (editView.value && teamData.value) {
      state.teamName = teamData.value.teamName;
      state.league = teamData.value.league;
      state.division = teamData.value.division;
    }
  });
}

const leagues = ["BUCS", "BDVA", "NVL", "Regional", "Tournament", "Other"];
const divisions = ["Premier", "1", "2", "3"];

const schema = v.object({
  teamName: v.pipe(
    v.string(),
    v.maxLength(100, "Cannot be more than 100 characters")
  ),
  league: v.pipe(v.string()),
  division: v.pipe(v.string()),
});

type Schema = v.InferOutput<typeof schema>;

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (editView.value === true) {
    const response = await $fetch(`/api/team/updateOpponent?team=${teamId}`, {
      method: "PUT",
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
    opponentViewModal.value = false;
    toast.add({
      title: "Team " + state.teamName + " has been editted!",
      color: "success",
      icon: "bitcoin-icons:edit-filled",
    });
    refreshNuxtData();
    return;
  }

  const response = await $fetch("/api/team/opponentInput", {
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
  opponentViewModal.value = false;
  toast.add({
    title: "Team " + state.teamName + " has been added!",
    color: "success",
    icon: "bitcoin-icons:edit-filled",
  });
  refreshNuxtData();
  return;
}
</script>

<template>
  <UCard>
    <template #header>
      <h2>Add New Team</h2>
    </template>

    <h3 class="p-2">Required Information</h3>
    <USeparator />
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Team Name" required class="p-2">
        <UInput
          v-model="state.teamName"
          placeholder="Enter Name..."
          class="w-full"
          size="lg"
        />
      </UFormField>
      <UFormField
        label="Team's League"
        required
        hint="Enter the Team's Main League"
        size="lg"
        class="p-2"
      >
        <USelect
          v-model="state.league"
          placeholder="Select a League..."
          :items="leagues"
          class="w-full"
        />
      </UFormField>
      <UFormField
        label="Team's Division"
        required
        hint="Enter the Team's Division within the League"
        size="lg"
        class="p-2"
      >
        <USelect
          v-model="state.division"
          placeholder="Select a Division..."
          :items="divisions"
          class="w-full"
        />
      </UFormField>
      <div class="flex justify-center p-2">
        <UButton type="submit" class="p-2 flex justify-center w-sm" size="xl">
          Submit
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
