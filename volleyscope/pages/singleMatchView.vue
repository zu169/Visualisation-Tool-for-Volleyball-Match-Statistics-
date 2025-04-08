<script lang="ts">
    const route = useRoute();
    const matchId = route.params.id;
</script>

<template>
    <UContainer>
        {{ matchId }}
    </UContainer>
</template>