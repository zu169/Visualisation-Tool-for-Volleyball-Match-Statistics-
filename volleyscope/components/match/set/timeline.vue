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

onMounted(() => {
  if (setId !== undefined) {
    selectedPoints.value = Array(team + opponent).fill(Point.Unknown);
    fetchPoints();
  }
});

if (setId !== undefined) {
  selectedPoints.value = Array(team + opponent).fill(Point.Unknown);
  await fetchPoints();
}

function fetchPoints() {
  const { data: pointData } = useFetch<Points[]>(
    `/api/point/getPoints?set=${setId}`
  );
  if (pointData.value !== null) {
    pointData.value.forEach((point) => {
      if (point.side === "home") {
        selectedPoints.value[point.pointNum - 1] = Point.Home;
      } else if (point.side === "away") {
        selectedPoints.value[point.pointNum - 1] = Point.Away;
      }
    });
  }
}

watch(warningSuccess, async () => {
  if (warningSuccess.value === true) {
    warningModal.value = false;
    if (await deletePoint(pointNum.value)) {
      selectedPoints.value[pointNum.value - 1] = Point.Unknown;
    }
    warningSuccess.value = false;
    toast.add({
      title: "Point" + pointNum.value + " have been deleted!",
      color: "success",
      icon: "i-lucide-trash-2",
    });
  }
});

watch(fullDeleteSuccess, async () => {
  if (fullDeleteSuccess.value === true) {
    fullDeleteModal.value = false;
    // delete all future points from this point
    for (let i = pointNum.value - 1; i < selectedPoints.value.length; i++) {
      deletePoint(i + 1);
      selectedPoints.value[i] = Point.Unknown;
    }
    fullDeleteSuccess.value = false;
    toast.add({
      title: "All Points have been deleted!",
      color: "success",
      icon: "i-lucide-trash-2",
    });
  }
});

function checkTeamPoints(whichTeam: string) {
  let teamPoints = 0;
  let opponentPoints = 0;
  selectedPoints.value.forEach((point) => {
    if (point === Point.Home) {
      teamPoints++;
    } else if (point === Point.Away) {
      opponentPoints++;
    }
  });
  if (whichTeam === "home" && teamPoints <= team) {
    console.log("Home Team Points: " + teamPoints);
    return true;
  } else if (whichTeam === "home" && teamPoints > team) {
    toast.add({
      title: "Error",
      description: "You have already added all the points for your team!",
      color: "error",
    });
    return false;
  } else if (whichTeam === "away" && opponentPoints <= opponent) {
    console.log("Away Team Points: " + opponentPoints);
    return true;
  } else if (whichTeam === "away" && opponentPoints > opponent) {
    toast.add({
      title: "Error",
      description: "You have already added all the points for the opponent!",
      color: "error",
    });
    return false;
  }
}

const addPoint = (team: "home" | "away" | "unknown", index: number) => {
  // If both are visible: first click
  if (selectedPoints.value[index] === Point.Unknown) {
    if (team === "home") {
      if (checkTeamPoints(team)) {
        selectedPoints.value[index] = Point.Home;
      } else {
        return;
      }
    } else {
      if (checkTeamPoints(team)) {
        selectedPoints.value[index] = Point.Away;
      } else {
        return;
      }
    }
    console.log("Point Number" + index);
    pointNum.value = index + 1;
    side.value = team;
    addPointModal.value = true;
  } else {
    // Second click: reset both buttons to visible
    side.value = selectedPoints.value[index];
    pointNum.value = index + 1;
    console.log("Point Number" + pointNum.value);
    choiceModal.value = true;
  }
};

async function deletePoint(pointNumber: number) {
  const response = await $fetch(
    `/api/point/deletePoint?point=${pointNumber}&set=${setId}`
  );
  if (!response || response.message === "error") {
    toast.add({
      title: "Error",
      description: "There was an error deleting the Point " + pointNum.value,
      color: "error",
    });
    return false;
  } else if (response.message === "Point not found") {
    toast.add({
      title: "Error",
      description: "Point " + pointNumber + " does not exist!",
      color: "error",
    });
    return true;
  }
  toast.add({
    title: "Point " + pointNumber + " has been deleted!",
    color: "success",
    icon: "i-lucide-trash-2",
  });
  return true;
}
</script>

<template>
  <!-- Button Section -->
  <div class="flex w-full mt-3">
    <!-- Home team points -->
    <div class="flex flex-col gap-2 w-1/2 items-end">
      <template v-for="(value, index) in selectedPoints" :key="'home' + index">
        <UButton
          v-if="value === Point.Unknown"
          class="w-10 h-10"
          color="primary"
          variant="soft"
          @click="addPoint('home', index)"
          >{{ index + 1 }}</UButton
        >
        <UButton
          v-else-if="value === Point.Home"
          class="w-10 h-10"
          color="success"
          variant="soft"
          @click="addPoint('unknown', index)"
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
          v-if="value === Point.Unknown"
          class="w-10 h-10"
          color="primary"
          variant="soft"
          @click="addPoint('away', index)"
          >{{ index + 1 }}</UButton
        >
        <UButton
          v-else-if="value === Point.Away"
          class="w-10 h-10"
          color="success"
          variant="soft"
          @click="addPoint('unknown', index)"
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
