<script lang="ts">
import { MatchPointServeDataCard } from '#components';
import Serve_data_card from './serve_data_card.vue';


    const addedActions = ref<string[]>([]);
    const serveAdded = ref(false);

    const addServe = () => {
        if (!serveAdded.value && !addedActions.value.includes('Serve')) {
            serveAdded.value = true;
            addedActions.value.push('Serve');
        }
    };

    const addAttack = () => {
      addedActions.value.push('Attack');
    };

    const addReceive = () => {
      addedActions.value.push('Receive');
    };

    const addSet = () => {
      addedActions.value.push('Set');
    };

    const addBlock = () => {
      addedActions.value.push('Block');
    };

</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-evenly">
                <UButton @click="addServe()">Serve</UButton>
                <UButton @click="addAttack()">Attack</UButton>
                <UButton @click="addReceive()">Receive</UButton>
                <UButton @click="addSet()">Set</UButton>
                <UButton @click="addBlock()">Block</UButton>
            </div>
        </template>

        <MatchPointAttackDataCard/>
        <template #body>
            <div v-for="(action, index) in addedActions" :key="index">
                <div v-if="action === 'Serve'">
                    <MatchPointServeDataCard/>
                </div>
                <MatchPointServeDataCard v-if="action === 'Serve'" />
                <MatchPointAttackDataCard v-if="action === 'Attack'" />
                <MatchPointReceiveDataCard v-if="action === 'Receive'" />
                <MatchPointSetDataCard v-if="action === 'Set'" />
                <LazyMatchPointBlockDataCard v-if="action === 'Block'" />
            </div>
        </template>

        <template #footer>
            <UButton>Submit Data</UButton>
        </template>
    </UCard>
</template>