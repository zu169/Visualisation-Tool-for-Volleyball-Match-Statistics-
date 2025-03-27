<script setup lang="ts">
    import type { BreadcrumbItem } from '@nuxt/ui';

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


    const props = defineProps<{ data : Player}>()
    console.log(props.data)

    const data = ref<Player[]>([
        {
            name: 'Alan Atkins',
            position: 'Outside Hitter',
            shirtNum: 8
        }
    ])
</script>

<template>
    <UContainer>
        <div>
            <UBreadcrumb :items="history"></UBreadcrumb>
        </div>
        <div>
        <h1>{{ data[0].name }}</h1>
        <h3>Position: {{ data[0].position }}</h3>
        <h3>Shirt Number: {{ data[0].shirtNum }}</h3>
        </div>
        <!-- Table with player stats -->
        <!-- List of matches they have played in -->
    </UContainer>
</template>