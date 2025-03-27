<script setup lang="ts">
const block_types = ['Kill', 'Touch', 'Error']
const people = ['Alan Atkins', 'Amin Khoshikabari', 'Iker Irigoyen', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']

const selected = ref(people[0])
const block = ref(block_types[0])
</script>

<template>
    <UCard>
        <template #header>
            Block
        </template>
        Player Name 
        <USelectMenu
            searchable
            searchable-placeholder="Search a person..."
            class="w-full lg:w-48"
            v-model = "selected"
            placeholder="Select a person"
            :items="people"
        />  
        Block Type
        <USelect v-model="block" :items="block_types" />
    </UCard>
</template>