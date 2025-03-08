<script setup lang="ts">
const set_types = ['Assist', 'Error', 'Negative']
const people = ['Alan Atkins', 'Amin Khoshikabari', 'Iker Irigoyen', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']

const selected = ref(people[0])
const set = ref(set_types[0])
</script>

<template>
    <UCard>
        <template #header>
            Set
        </template>
        Player Name 
        <USelectMenu
            searchable
            searchable-placeholder="Search a person..."
            class="w-full lg:w-48"
            v-model = "selected"
            placeholder="Select a person"
            :options="people"
        />  
        Set Type
        <USelect v-model="set" :options="set_types" />
    </UCard>
</template>