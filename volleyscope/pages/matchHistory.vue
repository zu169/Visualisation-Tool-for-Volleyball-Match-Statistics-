<script setup lang="ts">
    import type { TabsItem } from '@nuxt/ui'

    const teams = ref<TabsItem[]>([
        {
            label: 'View All',
            slot: 'all' as const
        },
        {
            label: 'Mens 1',
            slot: 'mens' as const
        },
        {
            label: 'Womens 1',
            slot: 'womens' as const
        },
        {
            label: 'Add New Team',
            slot: 'newteam' as const,
            to: '/TeamInput'
        }
    ])
</script>

<template>
    <UContainer>
        <h2 class="p-2">Match History</h2>
        <USeparator/>
        <UTabs color="neutral" variant="link" :items="teams"class="w-full">
            <template #all="{ item }">
                <MatchHistoryTable/>
            </template>
            <template #mens="{ item }">
                <p>This is the {{ item }}</p>
            </template>
            <template #womens="{ item }">
                <p>This is the {{ item }}</p>
            </template>
            <template #newteam="{ item }">
                <p>This is the {{ item }}</p>
            </template>
        </UTabs>
    </UContainer>
</template>