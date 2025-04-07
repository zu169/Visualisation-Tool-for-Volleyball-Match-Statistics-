<script setup lang="ts">
const receive_types = ['Normal', 'Serve', 'Dig', 'Error']
const receive_success = [0,1,2,3,4]
const people = ['Alan Atkins', 'Amin Khoshikabari', 'Iker Irigoyen', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']

const selected = ref(people[0])
const receive = ref(receive_types[0])
const success = ref(receive_success[0])
</script>

<template>
    <UCard class="w-md">
        <template #header>
            Receive
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
            <label class="font-bold">Receive Type</label>
            <USelect v-model="receive" :items="receive_types" />
            <UTooltip text="0: Overpass, 1-4 Options available on Attack">
                <label class="font-bold">Receive Success</label>
            </UTooltip>
            <USelect v-model="success" :items="receive_success" />
        </div>
    </UCard>
</template>