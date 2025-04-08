<script setup lang="ts">
    const props = defineProps<{ player : Player}>()

    type Player = {
            name: string
            position: string
            shirtNum: number
        }
</script>

<template>
    <UContainer>
        <UCard>
            <template #header>
                <div class="flex items-center space-x-4">
                    <img src="~assets/img/playerPlaceholder.jpeg" class="w-16 h-16 object-cover"/>
                    <div>
                        <h2>{{ player.name }}</h2>
                        <h3>Position: {{ player.position }}</h3>
                        <h3>Shirt Number: {{ player.shirtNum }}</h3>
                    </div>
                </div>
            </template>
        </UCard>
    </UContainer>
</template>