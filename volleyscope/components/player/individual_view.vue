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
        <h2>{{ data[0].name }}</h2>
        <h3>Position: {{ data[0].position }}</h3>
        <h3>Shirt Number: {{ data[0].shirtNum }}</h3>
        </div>
    </UContainer>
</template>