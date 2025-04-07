<script setup lang="ts">
import { MatchInfoInput } from '#components';
import type { TabsItem } from '@nuxt/ui'

    const sets = ref<TabsItem[]>([
        {
            label: 'Set 1',
            slot: 'one' as const
        },
        {
            label: 'Set 2',
            slot: 'two' as const
        },
        {
            label: 'Set 3',
            slot: 'three' as const
        },
        {
            label: 'Add Set',
            disabled: true,
            slot: 'set' as const
        }
    ])
</script>

<template>
    <UContainer>
        <UCard>
            <template #header>
                <h2 class="p-2">Add New Match</h2>
                <MatchInfoInput/>
            </template>
            <UTabs color="neutral" variant="link" :items="sets"class="w-full">
                <template #one="{ item }">
                    <MatchSetInfoInput/>
                </template>
                <template #two="{ item }">
                    <p>This is the {{ item }}</p>
                </template>
                <template #three="{ item }">
                    <p>This is the {{ item }}</p>
                </template>
                <template #set="{ item }">
                    <p>This is the {{ item }}</p>
                </template>
            </UTabs>
        </UCard>
    </UContainer>
    <div>Data Input</div>
    <MatchPointServeDataCard/>
    <MatchPointReceiveDataCard/>
    <MatchPointSetDataCard/>
    <MatchPointAttackDataCard/>
    <MatchPointBlockDataCard/>
</template>