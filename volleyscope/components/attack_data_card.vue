<script setup lang="ts">
const attack_types = ['Hit', 'Tip']
const attack_success = ['Normal', 'Kill', 'Error', 'Blocked']
const people = ['Alan Atkins', 'Amin Khoshikabari', 'Iker Irigoyen', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']

const selected = ref(people[0])
const attack = ref(attack_types[0])
const success = ref(attack_success[0])
</script>

<template>
    <UCard>
        <template #header>
            Attack
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
        Attack Type
        <USelect v-model="attack" :options="attack_types" />
        Attack Success
        <USelect v-model="success" :options="attack_success" />
    </UCard>
</template>