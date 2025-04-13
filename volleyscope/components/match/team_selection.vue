<script setup lang="ts">

const {matchId} = defineProps<{matchId : number}>()
console.log(matchId)

const aberystwyth_teams = ['Aber Mens 1', 'Aber Womens 1', 'Aber Mens 2']
const other_teams = ['Cardiff Met', "Swansea 1"]

const home = ref()
const opponent = ref()

//Save home and opponent to database

</script>

<template>
    <div class="flex space-x-4">
        <div class="flex flex-col">
            <label class="mb-1 p-2">Team Selection</label>
            <USelectMenu
                required
                searchable
                searchable-placeholder="Search a Home Team..."
                v-model:model-value="home"
                class="w-full lg:w-48"
                placeholder="Select a team..."
                :items="aberystwyth_teams"
            /> 
        </div>
        <div class="flex flex-col">
            <label class="block mb-1 p-2">Opponent Selection</label>
            <USelectMenu
                searchable
                searchable-placeholder="Search a Opponent Team..."
                v-model:model-value="opponent"
                class="w-full lg:w-48"
                placeholder="Select a team..."
                :items="other_teams"
            />
        </div>
    </div>
</template>