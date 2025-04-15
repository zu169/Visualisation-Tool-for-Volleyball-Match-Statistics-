<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.maxLength(30, "Cannot be more than 30 characters")
  ),
  email: v.pipe(v.string(), v.email("Invalid email")),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  name: "",
  email: "",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await $fetch("/api/register_interest", {
    method: "POST",
    body: state,
  });

  if (!response || response.message === "error") {
    toast.add({
      title: "Error",
      description: "There was an error submitting the form.",
      color: "error",
    });
    return;
  } else if (response.message === "duplicate") {
    toast.add({
      title: "Error",
      description: "This email has already been registered",
      color: "error",
    });
    return;
  }
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <div>
    <h1 class="text-center pb-4">Coming Soon</h1>
    <p class="text-center pb-2">
      Sign Up to get notified when you can begin your journey to improving your
      Volleyball Team with VolleyScope!
    </p>
  </div>
  <div class="flex flex-col items-center">
    <div class="p-2 w-[60%]">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Organisation"
          required
          size="xl"
          class="p-2"
          name="name"
        >
          <UInput
            v-model="state.name"
            placeholder="Enter the Organisation Name"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Email"
          description="We'll never share your email with anyone else."
          required
          size="xl"
          class="p-2 pb-0 pt-0"
          name="email"
        >
          <UInput
            v-model="state.email"
            placeholder="Enter your email"
            class="w-full"
          />
        </UFormField>
        <p class="text-sm p-2 pt-2">
          Disclaimer: There might be a small subscription for the service to
          cover the cost of hosting the site
        </p>
        <div class="flex justify-center p-2">
          <UButton type="submit" class="p-2 flex justify-center w-sm">
            Submit
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
