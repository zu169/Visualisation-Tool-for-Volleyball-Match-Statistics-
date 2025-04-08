<script setup lang="ts">
    import type { BreadcrumbItem } from '@nuxt/ui';

    // Variables which store the Player Information
    const name = "Something Something"
    const age = 21
    const main_position = "Setter"
    const height = 8
    const weight = 3
    const jump_height = 17.5
    const spike_speed = 54
    const serve_speed = 70
    const teams = ['Aber Mens', 'Aber Mens Bucs']
    const year_joined = 2022
    const positions = ['Setter', 'Outside Hitter', 'Opposite']
    const shirtNum = 3

    const history = ref<BreadcrumbItem[]>([
        {
            label:'Home',
            icon: 'i-lucide-house',
            to: '/'
        },
        {
            label: 'Player List',
            icon: 'solar:user-broken',
            to: '/playerData'
        },
        {
            label: 'Player View',
            to: '/individualPlayerView'
        }
    ])

    type Player = {
            name: string
            position: string
            shirtNum: number
        }

    const data = ref<Player[]>([
    {
        name: 'Alan Atkins',
        position: 'Outside Hitter',
        shirtNum: 8
    }])

    const props = defineProps<{ player : Player}>()
    console.log(props.player)



</script>

<template>
    <UContainer>
        <div class="flex justify-center p-2 pb-5">
            <UBreadcrumb :items="history"></UBreadcrumb>
        </div>
        <UCard>
            <template #header>
                <div class="flex justify-evenly">
                    <img src="~assets/img/playerPlaceholder.jpeg" class=" object-cover"/>
                    <div>
                        <h2>{{ data[0].name }}</h2>
                        <h3 v-if="age != null">Age: {{ age }}</h3>
                        <h3>Position: {{ data[0].position }}</h3>
                        <h3>Teams: {{ teams }}</h3>
                        <h3>Year Joined: {{ year_joined }}</h3>
                        <h3 v-if="shirtNum != null">Shirt Number: {{ data[0].shirtNum }}</h3>
                        <h3 v-if="positions != null">Other Postions: {{ positions }}</h3>
                    </div>
                </div>
                <div>
                    <h3 v-if="height != null">Height: {{ height }}</h3>
                    <h3 v-if="weight != null">Weight: {{ weight }}</h3>
                    <h3 v-if="jump_height != null">Jump Height: {{ jump_height }}</h3>
                    <h3 v-if="spike_speed != null">Spike Speed: {{ spike_speed }}</h3>
                    <h3 v-if="serve_speed != null">Serve Speed: {{ serve_speed }}</h3>
                </div>
            </template>
        </UCard>
        <div>
        
        </div>
        <!-- Table with player stats -->
        <!-- List of matches they have played in -->
    </UContainer>
</template>