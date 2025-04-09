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
            id: number
            name: string
            position: string
            shirtNum: number
        }

    const data = ref<Player[]>([
    {
        id: 0,
        name: 'Alan Atkins',
        position: 'Outside Hitter',
        shirtNum: 8
    },
    {
        id: 1,
        name: 'Szandra Kovacs',
        position: 'Outside Hitter',
        shirtNum: 11
    },
    {
        id: 2,
        name: 'Amin Khoshikibari',
        position: 'Setter',
        shirtNum: 16
    },
    {
        id: 3,
        name: 'Georgia Pachygiannaki',
        position: 'Libero',
        shirtNum: 16
    },
    {
        id: 4,
        name: 'Joseph Lovell',
        position: 'Libero',
        shirtNum: 11
    },
    {
        id: 5,
        name: 'Nicholas Ciobanu',
        position: 'Opposite Hitter',
        shirtNum: 7
    },
    {
        id: 6,
        name: 'Zu Ziolek',
        position: 'Libero',
        shirtNum: 3
    }
    ])

    const { query } = useRoute();
    const playerId = computed(() => parseInt(query.player?.toString() ?? "0"));
    const playerData = computed(() => data.value.find(player => player.id == playerId.value));


</script>

<template>
    <UContainer>
        <div class="flex justify-center p-2 pb-5">
            <UBreadcrumb :items="history"></UBreadcrumb>
        </div>
        <div class="flex justify-between items-center">
            <h2 class="p-2">Player Information</h2>
            <UButton type="submit" class="h-10" :to="{ path: '/playerInput', query: { player: playerId } }">Edit Player</UButton>
        </div>
        <USeparator />
        <UCard>
            <template #header>
                <div class="flex justify-evenly">
                    <img src="~assets/img/playerPlaceholder.jpeg" class=" object-cover"/>
                    <div>
                        <h2>{{ playerData?.name }} - {{ playerId }}</h2>
                        <h3 v-if="age != null">Age: {{ age }}</h3>
                        <h3>Position: {{ playerData?.position }}</h3>
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