<script setup lang="ts">

const {matchId} = defineProps<{matchId : number}>()

//maybe make this an enum??
const type = ['BUCS', 'BDVA', 'Tournament', 'Other']

const selectedType = ref()
// add selected type to match database

</script>

<template>
    <div class="flex flex-col">
            <label class="mb-1 p-2">Game Type</label>
            <USelectMenu
                searchable
                searchable-placeholder="Search a Game Type..."
                v-model:model-value="selectedType"
                class="w-full lg:w-48"
                placeholder="Select a type..."
                :items="type"
            /> 
        </div>
</template>