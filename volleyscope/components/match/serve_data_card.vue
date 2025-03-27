<script setup lang="ts">
const serve_types = ['Underhand', 'Overhand', 'Float', 'Jump']
const serve_success = ['Normal', 'Ace', 'Error']
const people = ['Alan Atkins', 'Amin Khoshikabari', 'Iker Irigoyen', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']

const selected = ref(people[0])
const serve = ref(serve_types[0])
const success = ref(serve_success[0])
</script>

<template>
    <UCard>
        <template #header>
            Serve
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
        Serve Type
        <USelect v-model="serve" :items="serve_types" />
        Serve Success
        <USelect v-model="success" :items="serve_success" />
    </UCard>
</template>