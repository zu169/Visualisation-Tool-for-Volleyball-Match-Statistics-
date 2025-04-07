<script setup lang="ts">
const block_types = ['Kill', 'Touch', 'Error']
const people = ['Alan Atkins', 'Amin Khoshikabari', 'Iker Irigoyen', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']

const selected = ref(people[0])
const block = ref(block_types[0])
</script>

<template>
    <UCard class="w-md">
        <template #header>
            Block
        </template>
        <div class="flex flex-col space-y-1">
            <label class="font-bold">Player Name</label>
            <USelectMenu
                searchable
                searchable-placeholder="Search a person..."
                class="w-full lg:w-48"
                v-model = "selected"
                placeholder="Select a person"
                :items="people"
            />  
            <label class="font-bold">Block Type</label>
            <USelect v-model="block" :items="block_types" />
        </div>
    </UCard>
</template>