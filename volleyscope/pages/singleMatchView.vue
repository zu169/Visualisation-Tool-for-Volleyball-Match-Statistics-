<script setup lang="ts">
    import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
    import type { TabsItem, BreadcrumbItem } from '@nuxt/ui';    
import { set } from '@nuxt/ui/runtime/utils/index.js';

    const history = ref<BreadcrumbItem[]>([
            {
                label:'Home',
                icon: 'i-lucide-house',
                to: '/'
            },
            {
                label: 'Match History',
                icon: 'solar:list-line-duotone',
                to: '/matchHistory'
            },
            {
                label: 'Match View',
                to: '/singleMatchView'
            }
        ]);

    const setScores = [[25,21], [20,25], [25,19]];

    const generateScore = () => {
        //Keep Track of each teams won sets
        var home = 0
        var opponent = 0
        setScores.forEach(score => {
            if (score[0] > score[1]){
                home += 1
            } else {
                opponent += 1
            }
        });
        console.log(home + ':' + opponent)
        return home + ':' + opponent
    }

    const sets = ref<TabsItem[]>([
        {
            label: 'Full View',
            id: 'all',
        },
        // {
        //     label: 'Set 1',
        //     id: 1,
        // },
        // {
        //     label: 'Set 2',
        //     id: 2,
        // },
        // {
        //     label: 'Set 3',
        //     id: 3
        // }
    ])

    const generateSets = () => {
        setScores.forEach(score => {
            sets.value.push({
                label: 'Set ' + (sets.value.length),
                id: sets.value.length - 1
            })
        })
    }

    const homeTeam = "Aber Mens 1"
    const opponentTeam = "Swansea 1"
    const score = generateScore()
    const set_generate = generateSets()
    const game_date = new CalendarDate(2024, 10, 3)
    const game_type = "BUCS"    

    const router = useRouter()
    const { query } = useRoute();
    const matchId = computed(() => parseInt(query.matchId?.toString() ?? "0"));
    const toast = useToast()
    const deleteModal = ref(false)

    function deleteSuccess(){
        router.push({ name: 'matchHistory'})
        toast.add({
          title: 'Match ' + matchId + ' has been deleted!',
          color: 'error',
          icon: 'i-lucide-trash-2'
        })
    }

    const sections = [{name : "Match Info", visible: true}, {name : "Timeline View", visible : true}, {name : "Player List", visible : true}, {name : "Match Stats", visible : true}]
</script>

<template>
    <UContainer>    
        <div class="flex justify-center p-2 pb-5">
            <UBreadcrumb :items="history"></UBreadcrumb>
        </div>
        <div class="flex justify-between items-center">
            <h2 class="p-2">Match Information</h2>
            <div>
                <UButton type="submit" class="h-10 m-2" color="success" variant="soft" :to="{ path: '/matchInput', query: { match: matchId } }">Edit Match</UButton>
                <UButton type="submit" class="h-10 m-2" color="error" variant="soft" @click="deleteModal = true">Delete Match</UButton>
            </div>
        </div>
        <div class="flex items-end">
            <UDropdownMenu
                :items="sections.filter((sections.values)).map((sections.values) => ({
                    label : sections.values.name,
                    type: 'checkbox' as const,

                },
                onselect(e?: Event) {
                    e?preventDefault()
                }))"
                :content="{ align: 'end' }"
            >
                <UButton
                label="Section Display"
                color="neutral"
                variant="outline"
                trailing-icon="i-lucide-chevron-down"
                />
            </UDropdownMenu>
        </div>
        <UCard>
            <template #header>
                <div v-if="sections[0].visible === true" class="flex">
                    <h2 class="w-[20%]">{{ game_date }}</h2>
                    <h2 class="w-[20%]">{{ game_type }}</h2>
                    <h2 class="w-[40%]">{{ homeTeam }} vs {{ opponentTeam }}</h2>
                    <h2 class="w-[20%]">{{ score }}</h2>
                </div>
            </template>
            <UTabs v-if="sections[1].visible === true" color="neutral" variant="link" :items="sets" class="w-full">
                <template #content="{ item }">
                    <h3 v-if="item.id === 'all'"> Full view of game</h3>
                    <h3 v-else>{{ setScores[item.id] }}</h3>
                </template>
            </UTabs>
            <template #footer>
                <div class="flex justify-between p-2">
                    <div v-if="sections[2].visible === true" class="w-[35%]">
                        <p>Player List</p>
                    </div>
                    <div v-if="sections[3].visible === true" class="w-[65%]">
                        <p>Game Data</p>
                        <UTabs color="neutral" variant="link" :items="sets" class="w-full">
                            <template #content=" { item }">
                                <h3>{{ item.id }}</h3>
                            </template>
                        </UTabs>
                    </div>
                </div>
            </template>
        </UCard>
        <UModal v-model:open="deleteModal" :dismissible="false" :close="false" :ui="{ footer: 'justify-end' }">
            <template #header>
            <h3>Are you sure you want to delete this Match?</h3>
            </template>
        
            <template #body>
                <p>This action cannot be reversed and will affect existing leaderboard data!</p>
            </template>

            <template #footer>
            <UButton label="No" color="success" variant="soft" @click="deleteModal = false" />
            <UButton label="Yes, I'm sure!" color="error" variant="outline" @click="deleteSuccess()"/>
            </template>
        </UModal>
    </UContainer>
</template>