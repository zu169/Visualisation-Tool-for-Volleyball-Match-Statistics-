<script setup lang="ts">
const set_types = ['Assist', 'Error', 'Negative']
const set_rating = [0,1,2] 
const people = ['Alan Atkins', 'Amin Khoshikabari', 'Iker Irigoyen', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']

const selected = ref(people[0])
const set = ref(set_types[0])
const score = ref(set_rating[0])
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
            :items="people"
        />  
        Set Type
        <USelect v-model="set" :items="set_types" />
        <UTooltip text="0: Failed Set, 1: Hitable, 2: Hit from Line">
            <p>Set Rating</p>
        </UTooltip>
        <USelect v-model="score" :items="set_rating" />
    </UCard>
</template>