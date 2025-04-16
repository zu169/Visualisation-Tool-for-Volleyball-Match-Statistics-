<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as v from "valibot";

const homeInputView = defineModel<boolean>();

const leagues = ["BUCS", "BDVA", "NVL", "Regional"];
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

const state = reactive({
  teamName: undefined,
  league: undefined,
  division: undefined,
});

const toast = useToast();   

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await $fetch("/api/team/homeInput", {
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
  homeInputView.value = false;
  toast.add({
    title: "Team " + state.teamName + " has been added!",
    color: "success",
    icon: "bitcoin-icons:edit-filled",
  });
  console.log(event.data);
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
</template>
