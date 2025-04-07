<script setup lang="ts">
import Youtube_input from './youtube_input.vue';

</script>

<template>
    <div class="flex gap-4">
        <div class="flex-1">
            <MatchSetTimeline/>
        </div>
        <div class="flex-1">
            <UCard class="h-full">
            <template #header>
                <!-- Player Input -->
                 <p>Select Player's and their positions for the set</p>
            </template>

            <Youtube_input/>

            <template #footer >
                <UButton type="submit" class="p-2">Save Progress</UButton>
            </template>
        </UCard>
        </div>
    </div>
</template>