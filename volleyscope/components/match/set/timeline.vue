<script setup lang="ts">
import { ref } from "vue";

const pointNum = ref<number>();
const side = ref<string>();
const addPointModal = ref(false);
const choiceModal = ref(false);
const warningModal = ref(false);
const warningSuccess = ref(false);
const fullDeleteModal = ref(false);
const fullDeleteSuccess = ref(false);
const toast = useToast();

const { team, opponent, listId, setId } = defineProps<{
  team: number;
  opponent: number;
  listId: number;
  setId: number;
}>();

enum Point {
  Home = "home",
  Away = "away",
  Unknown = "unknown",
}

type Points = {
  pointId: number;
  setId: number;
  pointNum: number;
  side: string;
  playerId: number;
};

const selectedPoints = ref<Point[]>([]);

watchEffect(() => {
  selectedPoints.value = Array(team + opponent).fill(Point.Unknown);
});

if (setId !== undefined) {
  // Fetch the points for the current set
  const { data: setPoints } = await useFetch<Points[]>(
    `/api/point/getPoints?set=${setId}`
  );
  console.log("Points: ", setPoints);
  if (setPoints.value !== null) {
    setPoints.value.forEach((point, index) => {
      if (point.side === "home") {
        selectedPoints.value[index] = Point.Home;
      } else if (point.side === "away") {
        selectedPoints.value[index] = Point.Away;
      } else {
        selectedPoints.value[index] = Point.Unknown;
      }
    });
  }
}

const addPoint = (team: "home" | "away", index: number) => {
  // If both are visible: first click
  if (selectedPoints.value[index] === Point.Unknown) {
    if (team === "home") {
      selectedPoints.value[index] = Point.Home;
    } else {
      selectedPoints.value[index] = Point.Away;
    }
    console.log("Point Number" + index);
    pointNum.value = index + 1;
    side.value = team;
    addPointModal.value = true;
  } else {
    // Second click: reset both buttons to visible
    pointNum.value = index + 1;
    choiceModal.value = true;
  }

  watch(warningSuccess, () => {
    if (warningSuccess.value) {
      warningModal.value = false;
      //Delete the point
      if (deletePoint() !== false) {
        selectedPoints.value[pointNum.value] = Point.Unknown;
      }
      warningSuccess.value = false;
    }
  });

  async function deletePoint() {
    const response = await $fetch(
      `/api/point/deletePoint?point=${pointNum.value}&set=${setId}`
    );
    if (!response || response.message === "error") {
      toast.add({
        title: "Error",
        description: "There was an error deleting the Point " + pointNum.value,
        color: "error",
      });
      return false;
    }
    toast.add({
      title: "Point " + pointNum.value + " has been deleted!",
      color: "success",
      icon: "i-lucide-trash-2",
    });
    return true;
  }

  watch(fullDeleteSuccess, () => {
    if (fullDeleteSuccess.value) {
      fullDeleteModal.value = false;
      //Delete all future points
      for (let i = pointNum.value; i < selectedPoints.value.length; i++) {
        selectedPoints.value[i] = Point.Unknown;
      }
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
      <MatchPointInfoInput
        :point-num="pointNum"
        :side="side"
        :list-id="listId"
        :set-id="setId"
      />
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
    v-model:open="choiceModal"
    :dismissible="true"
    :close="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #header>
      <h3>Do you want to edit or delete this Point?</h3>
    </template>

    <template #body>
      <p>To cancel the action, click outside the modal or press the ESC key.</p>
    </template>

    <template #footer>
      <UButton
        label="Edit!"
        color="success"
        variant="soft"
        @click="(choiceModal = false), (addPointModal = true)"
      />
      <UButton
        label="Delete!"
        color="error"
        variant="outline"
        @click="(choiceModal = false), (warningModal = true)"
      />
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
        This action cannot be reversed, you will lose any data you added to the
        point and any points following that on!
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
        @click="(warningModal = false), (fullDeleteModal = true)"
      />
    </template>
  </UModal>
  <UModal
    v-model:open="fullDeleteModal"
    :dismissible="false"
    :close="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #header>
      <h3>Would you like to delete all the following points?</h3>
    </template>

    <template #body>
      <p>
        This action cannot be reversed, you will lose any data you added to the
        points following the current point!
      </p>
    </template>

    <template #footer>
      <UButton
        label="No"
        color="success"
        variant="soft"
        @click="(fullDeleteModal = false), (warningSuccess = true)"
      />
      <UButton
        label="Yes, Delete!"
        color="error"
        variant="outline"
        @click="fullDeleteSuccess = true"
      />
    </template>
  </UModal>
</template>
