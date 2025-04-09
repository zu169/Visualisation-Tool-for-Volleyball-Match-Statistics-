<script setup lang="ts">
import { MatchInfoInput } from '#components';
import type { TabsItem } from '@nuxt/ui'

    const sets = ref<TabsItem[]>([
        {
            label: 'Set 1',
            id: 1,
        },
        {
            label: 'Set 2',
            id: 2,
        },
        {
            label: 'Set 3',
            id: 3,
        }
    ])

    const addSet = () => {
        sets.value.push({
            label: 'Set ' + (sets.value.length + 1),
            id: sets.value.length + 1,
    })}
</script>

<template>
    <UContainer>
        <UCard>
            <template #header>
                <h2 class="p-2">Add New Match</h2>
                <MatchInfoInput/>
            </template>
            <UTabs color="neutral" variant="link" :items="sets"class="w-full">
                <template #content="{ item }">
                    <MatchSetInfoInput :setId = "item.id"/>
                </template>
            </UTabs>
            <UButton @click="addSet()">Add Set</UButton>
        </UCard>
    </UContainer>
    <div>Data Input</div>
    <MatchPointServeDataCard/>
    <MatchPointReceiveDataCard/>
    <MatchPointSetDataCard/>
    <MatchPointAttackDataCard/>
    <MatchPointBlockDataCard/>
</template>