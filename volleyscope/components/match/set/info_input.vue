<script setup lang="ts">
import Youtube_input from './youtube_input.vue';

const {setId} = defineProps<{setId : number}>()
console.log(setId)
</script>

<template>
    <div class="flex gap-4">
        <div class="flex-1">
            <MatchSetTimeline :setId = "setId"/>
        </div>
        <div class="flex-1">
            <UCard class="h-full">
            <template #header>
                <!-- Player Input -->
                 <p>Select Player's and their positions for the set</p>
            </template>

            <Youtube_input :setId = "setId"/>
        </UCard>
        </div>
    </div>
</template>