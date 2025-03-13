<script setup lang="ts">
const receive_types = ['Normal', 'Serve', 'Dig', 'Error']
const receive_success = [0,1,2,3,4]
const people = ['Alan Atkins', 'Amin Khoshikabari', 'Iker Irigoyen', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']

const selected = ref(people[0])
const receive = ref(receive_types[0])
const success = ref(receive_success[0])
</script>

<template>
    <UCard>
        <template #header>
            Receive
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
        Receive Type
        <USelect v-model="receive" :options="receive_types" />
        <UTooltip text="0: Overpass, 1-4 Options available on Attack">
            <p>Receive Success</p>
        </UTooltip>
        <USelect v-model="success" :options="receive_success" />
    </UCard>
</template>