<script lang="ts">
    const { query } = useRoute();
    const matchId = computed(() => parseInt(query.matchId?.toString() ?? "0"));
</script>

<template>
    <UContainer>
        <h2>{{ matchId }}</h2>
    </UContainer>
</template>