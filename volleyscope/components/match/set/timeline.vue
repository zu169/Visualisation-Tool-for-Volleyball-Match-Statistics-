<script setup lang="ts">
import { ref } from "vue";

const isModalOpen = ref(false)

const homeTeam = ref("Aberystwyth");
const awayTeam = ref("Cardiff Met");

const homePoints = ref()
const awayPoints = ref()

enum Point {
  Home = 'home',
  Away = 'away',
  Unknown = 'unknown'
}

const selectedPoints = ref<Point[]>([]);
const homeButtonsVisible = ref<boolean[]>([]);
const awayButtonsVisible = ref<boolean[]>([]);

/**
 * [HOME, AWAY, NULL, HOME, NULL]
 * 
 */

const updateHomeButtons = (count: number) => {
  homeButtonsVisible.value = Array(count).fill(true);
};

const updateAwayButtons = (count: number) => {
  awayButtonsVisible.value = Array(count).fill(true);
};

// Sync button arrays when number changes
watch(homePoints, (val) => {
  updateHomeButtons(val);
});

watch(awayPoints, (val) => {
  updateAwayButtons(val);
});

const addPoint = (team: 'home' | 'away', index: number) => {
  const homeVisible = homeButtonsVisible.value[index] ?? false;
  const awayVisible = awayButtonsVisible.value[index] ?? false;

  // If both are visible: first click
  if (homeVisible && awayVisible) {
    if (team === 'home') {
      awayButtonsVisible.value[index] = false;
    } else {
      homeButtonsVisible.value[index] = false;
    }

    // Ensure total visible count stays correct
    if (team === 'home') {
        const count = awayButtonsVisible.value.filter(Boolean).length;
        if (count <= awayPoints.value) awayButtonsVisible.value.push(true);
        if (count > awayPoints.value) awayButtonsVisible.value.pop();
    } else {
        const count = homeButtonsVisible.value.filter(Boolean).length;
        if (count < homePoints.value) homeButtonsVisible.value.push(true);
        if (count > homePoints.value) homeButtonsVisible.value.pop();
    }

    isModalOpen.value = true;
  } else {
    // Second click: reset both buttons to visible
    homeButtonsVisible.value[index] = true;
    awayButtonsVisible.value[index] = true;
    if (team === 'home') {
        const count = awayButtonsVisible.value.filter(Boolean).length;
        if (count > awayPoints.value) awayButtonsVisible.value.pop(), homeButtonsVisible.value.pop(), homeButtonsVisible.value.push(true);
    } else {
        const count = homeButtonsVisible.value.filter(Boolean).length;
        if (count > homePoints.value) homeButtonsVisible.value.pop(), awayButtonsVisible.value.pop(), awayButtonsVisible.value.push(true);
    }
  }
};

</script>

<template>
    <div class="flex justify-center space-x-4 p-4">
        <div class="flex flex-col">
            <label class="text-lg font-semibold p-2">{{ homeTeam }}</label>
            <UInputNumber class="size-sm" orientation="vertical" v-model="homePoints" :min="0"></UInputNumber>
        </div>
        <div class="flex flex-col">
            <label class="text-lg font-semibold p-2">{{ awayTeam }}</label>
            <UInputNumber class="size-sm" orientation="vertical" v-model="awayPoints" :min="0"></UInputNumber>
        </div>
    </div>
    <!-- Button Section -->
    <div class="flex w-full">
        <!-- Home team points -->
        <div class="flex flex-col gap-2 w-1/2 items-end">
            <template v-for="(visible, index) in homeButtonsVisible" :key="'home' + index">
                <UButton v-if="visible" class="w-10 h-10 bg-white" @click="addPoint('home', index)">{{ index +1 }}</UButton>
                <div v-else class="w-10 h-10 invisible"></div>
            </template>
        </div>

        <!-- Divider -->
        <div class="w-[2px] bg-gray-500 mx-4"></div>

        <!-- Away team points -->
        <div class="flex flex-col gap-2 w-1/2 items-start">
            <template v-for="(visible, index) in awayButtonsVisible" :key="'away' + index">
                <UButton v-if="visible" class="w-10 h-10 bg-white" @click="addPoint('away', index)">{{ index +1 }}</UButton>
                <div v-else class="w-10 h-10 invisible"></div>
            </template>
        </div>
    </div>  
    <UModal title="Add Point Actions" description="Enter all of the actions your team did during that point." v-model:open="isModalOpen" :close="false" :ui = {} size="xl">
        <template #body>
            <MatchPointInfoInput/>
        </template>

        <template #footer>
            <UButton label="Cancel" color="neutral" variant="outline" @click="isModalOpen = false" />
            <UButton label="Submit" color="neutral" />
        </template>
    </UModal>
</template>