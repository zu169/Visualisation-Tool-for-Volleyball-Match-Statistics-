<script setup lang="ts">
const addedActions = ref<string[]>([]);
const serveAdded = ref(false);

// function updateActions() {}
// watch(addedActions, (val) => {});

function addServe() {
  if (!serveAdded.value && !addedActions.value.includes("Serve")) {
    serveAdded.value = true;
    addedActions.value.push("Serve");
  }
}

function addAttack() {
  addedActions.value.push("Attack");
}

function addReceive() {
  addedActions.value.push("Receive");
}

function addSet() {
  addedActions.value.push("Set");
}

function addBlock() {
  addedActions.value.push("Block");
}
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

    <!-- <MatchPointAttackDataCard /> -->
    <template #body>
      <div v-for="(action, index) in addedActions" :key="index">
        <div v-if="action === 'Serve'">
          <MatchPointServeDataCard />
        </div>
        <MatchPointServeDataCard v-show="action === 'Serve'" />
        <MatchPointAttackDataCard v-show="action === 'Attack'" />
        <MatchPointReceiveDataCard v-if="action === 'Receive'" />
        <MatchPointSetDataCard v-if="action === 'Set'" />
        <MatchPointBlockDataCard v-if="action === 'Block'" />
      </div>
    </template>
  </UCard>
</template>
