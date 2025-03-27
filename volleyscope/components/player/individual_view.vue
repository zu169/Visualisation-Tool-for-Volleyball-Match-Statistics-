<script setup lang="ts">

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
    <div>
        <h1>{{ data[0].name }}</h1>
        <h3>Position: {{ data[0].position }}</h3>
        <h3>Shirt Number {{ data[0].position }}</h3>
    </div>
</template>