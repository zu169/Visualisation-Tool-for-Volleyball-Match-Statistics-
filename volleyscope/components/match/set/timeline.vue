<script setup lang="ts">

// Take these variables from match info input
const homeTeam = ref("Aberystwyth")
const awayTeam = ref("Cardiff Met")

</script>

<template>
    <div class="flex flex-col items-center justify-center p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
        <div class="flex justify-between w-full mb-4">
            <label class="text-lg font-semibold">{{ homeTeam }}</label>
            <UInputNumber placeholder="__" orientation="vertical"></UInputNumber>
        </div>
        <div class="flex justify-between w-full mb-4">
            <label class="text-lg font-semibold">{{ awayTeam }}</label>
            <UInputNumber placeholder="__" orientation="vertical"></UInputNumber>
        </div>
    </div>
</template>