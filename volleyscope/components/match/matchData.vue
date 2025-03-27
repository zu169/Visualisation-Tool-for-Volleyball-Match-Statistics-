<script>
const aberystwyth_teams = ['Aber Mens 1', 'Aber Womens 1', 'Aber Mens 2']
const other_teams = ['Cardiff Met', "Swansea 1"]

const home = ref(aberystwyth_teams[0])
const opponent = ref(other_teams[0])
</script>

<template>
    <div>
        Team Selection
        <USelectMenu
            searchable
            searchable-placeholder="Search a Home Team..."
            class="w-full lg:w-48"
            v-model = "home"
            placeholder="Select a person"
            :options="aberystwyth_teams"
        />  
    </div>
    <div>
        Opponent Selection
        <USelectMenu
            searchable
            searchable-placeholder="Search a Enemy Team..."
            class="w-full lg:w-48"
            v-model = "opponent"
            placeholder="Select a person"
            :options="other_teams"
        />
    </div>
</template>