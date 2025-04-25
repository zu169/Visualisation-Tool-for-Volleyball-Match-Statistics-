<script setup lang="ts">
import { ref } from "vue";

const addPointModal = ref(false);
const warningModal = ref(false);
const warningSuccess = ref(false);

const { team, opponent } = defineProps<{ team: number; opponent: number }>();

enum Point {
  Home = "home",
  Away = "away",
  Unknown = "unknown",
}

const selectedPoints = ref<Point[]>([]);

/**
 * [HOME, AWAY, NULL, HOME, NULL]
 *
 */
watchEffect(() => {
  selectedPoints.value = Array(team + opponent).fill(Point.Unknown);
});

const addPoint = (team: "home" | "away", index: number) => {
  // If both are visible: first click
  if (selectedPoints.value[index] === Point.Unknown) {
    if (team === "home") {
      selectedPoints.value[index] = Point.Home;
    } else {
      selectedPoints.value[index] = Point.Away;
    }
    addPointModal.value = true;
  } else {
    // Second click: reset both buttons to visible
    warningModal.value = true;
  }

  watch(warningSuccess, () => {
    if (warningSuccess.value) {
      warningModal.value = false;
      //Delete the point
      selectedPoints.value[index] = Point.Unknown;
      warningSuccess.value = false;
    }
  });
};
</script>

<template>
  <!-- Button Section -->
  <div class="flex w-full mt-3">
    <!-- Home team points -->
    <div class="flex flex-col gap-2 w-1/2 items-end">
      <template v-for="(value, index) in selectedPoints" :key="'home' + index">
        <UButton
          v-if="value === Point.Unknown || value === Point.Home"
          class="w-10 h-10 bg-white"
          @click="addPoint('home', index)"
          >{{ index + 1 }}</UButton
        >
        <div v-else-if="value === Point.Away" class="w-10 h-10 invisible" />
      </template>
    </div>

    <!-- Divider -->
    <div class="w-[2px] bg-gray-500 mx-4" />

    <!-- Away team points -->
    <div class="flex flex-col gap-2 w-1/2 items-start">
      <template v-for="(value, index) in selectedPoints" :key="'home' + index">
        <UButton
          v-if="value === Point.Unknown || value === Point.Away"
          class="w-10 h-10 bg-white"
          @click="addPoint('away', index)"
          >{{ index + 1 }}</UButton
        >
        <div v-else-if="value === Point.Home" class="w-10 h-10 invisible" />
      </template>
    </div>
  </div>
  <UModal
    v-model:open="addPointModal"
    title="Add Point Actions"
    description="Enter all of the actions your team did during that point."
    :close="false"
    :ui="{}"
    size="xl"
  >
    <template #body>
      <MatchPointInfoInput />
    </template>

    <template #footer>
      <UButton
        label="Cancel"
        color="neutral"
        variant="outline"
        @click="addPointModal = false"
      />
      <UButton label="Submit" color="neutral" @click="addPointModal = false" />
    </template>
  </UModal>
  <UModal
    v-model:open="warningModal"
    :dismissible="false"
    :close="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #header>
      <h3>Are you sure you want to delete this Point?</h3>
    </template>

    <template #body>
      <p>
        This action cannot be reversed and you will lose any data you added to
        the point!
      </p>
    </template>

    <template #footer>
      <UButton
        label="No"
        color="success"
        variant="soft"
        @click="warningModal = false"
      />
      <UButton
        label="Yes, I'm sure!"
        color="error"
        variant="outline"
        @click="warningSuccess = true"
      />
    </template>
  </UModal>
</template>
