<script setup lang="ts">
const type = ['BUCS', 'BDVA', 'Tournament', 'Other']

</script>

<template>
    <div class="flex flex-col">
            <label class="mb-1 p-2">Game Type</label>
            <USelectMenu
                searchable
                searchable-placeholder="Search a Game Tyoe..."
                class="w-full lg:w-48"
                placeholder="Select a type..."
                :items="type"
            /> 
        </div>
</template>