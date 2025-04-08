<script setup lang="ts">
    import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { setup } from '@nuxt/test-utils';
    import type { BreadcrumbItem } from '@nuxt/ui';

    const props = defineProps<{
        isEditMode : boolean
    }>()

    // Data for Player Info Input
    const name = ref('')
    const position = ref('')
    const shirtNum = ref()
    const teams = ref()
    const year_joined = ref()
    const jump_height = ref()
    const spike_speed = ref()
    const serve_speed= ref()
    const height = ref()
    const weight = ref()
    const birthday = ref()

    const history = ref<BreadcrumbItem[]>([
        {
            label:'Home',
            icon: 'i-lucide-house',
            to: '/'
        },
        {
            label: 'Player List',
            icon: 'solar:user-broken',
            to: '/playerData'
        },
        {
            label: 'Add Player',
            to: '/playerInput'
        }
    ])

    const positions = ['Setter', 'Outside Hitter', 'Middle', 'Libero', 'Opposite Hitter']
    const possible_teams = ['Mens 1', 'Womens 1', 'Mens BDVA']


    const df = new DateFormatter('en-UK', {
        dateStyle: 'medium'
    })

    const modelValue = shallowRef(new CalendarDate(2024, 10, 3))
    const birthdayValue = shallowRef(new CalendarDate(2007, 10, 3))

    const toast = useToast()

    function successNotif() {
        toast.add({
          title: 'Player ' + name + ' has been added!',
          color: 'success',
          icon: 'bitcoin-icons:edit-filled'
        })
    }
</script>
<template>
    <UContainer>
        <UBreadcrumb :items="history" class="p-2 pb-5 flex justify-center"></UBreadcrumb>
        <div class="justify-center">
            <UCard>
                <template #header>
                    <h2>Add New Player</h2>
                </template>
                
                <h3 class="p-2">Required Information</h3>
                <USeparator/>
                <UFormField label="Player Name" required size="xl" class="p-2">
                    <UInput v-model:model-value="name" placeholder="Enter Name..." class="w-full" />
                </UFormField>
                <UFormField label="Main Position" required hint="Enter the Player's main position." size="xl" class="p-2">
                    <USelect v-model:model-value="position" placeholder="Select a position..." :items="positions" class="w-full"/>
                </UFormField>
                <UFormField label="Shirt Number" size="xl" class="p-2">
                    <UInput v-model:model-value="shirtNum" placeholder="Enter Shirt Number..." class="w-full" />
                </UFormField>
                <UFormField label="Teams" required hint="Which team do they play for?" size="xl" class="p-2">
                    <USelect v-model:model-value="teams" multiple placeholder="Select a team..." :items="possible_teams" class="w-full"/>
                </UFormField>
                <UFormField label="Club Member Since" required size="xl" class="p-2">
                    <UPopover class="p-2">
                        <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                            {{  modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
                        </UButton>
                        <template #content>
                            <UCalendar v-model="year_joined" class="p-2"/>
                        </template>
                    </UPopover>
                </UFormField>
                <h3 class="p-2 pt-5">Additional Information</h3>
                <USeparator/>
                <UFormField label="Vertical Jump" size="xl" class="p-2">
                    <UInputNumber v-model:model-value="jump_height" placeholder="Enter jump in inches..." :format-options="{style: 'unit', unit: 'inch'}" orientation="vertical" class="w-full" />
                </UFormField>
                <UFormField label="Serve Speed" size="xl" class="p-2">
                    <UInputNumber v-model:model-value="serve_speed" placeholder="Enter speed in km/h" :format-options="{style: 'unit', unit: 'kilometer-per-hour'}" orientation="vertical" class="w-full" />
                </UFormField>
                <UFormField label="Spike Speed" size="xl" class="p-2">
                    <UInputNumber v-model:model-value="spike_speed" placeholder="Enter speed in km/h" :format-options="{style: 'unit', unit: 'kilometer-per-hour'}" orientation="vertical"  class="w-full" />
                </UFormField>
                <UFormField label="Height" size="xl" class="p-2">
                    <UInputNumber v-model:model-value="height" placeholder="Enter height in cm" :format-options="{style: 'unit', unit: 'centimeter'}" orientation="vertical" class="w-full" />
                </UFormField>
                <UFormField label="Weight" size="xl" class="p-2">
                    <UInputNumber v-model:model-value="weight" placeholder="Enter weight in kg" :format-options="{style: 'unit', unit: 'kilogram'}" orientation="vertical" class="w-full" />
                </UFormField>
                <UFormField label="Birthday" hint="Enter the Player's to display their age (Optional)" size="xl" class="p-2">
                    <UPopover class="p-2">
                        <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                            {{  birthdayValue ? df.format(birthdayValue.toDate(getLocalTimeZone())) : 'Select a date' }}
                        </UButton>
                        <template #content>
                            <UCalendar v-model="birthday" class="p-2"/>
                        </template>
                    </UPopover>
                </UFormField>
                <USeparator class="pt-5 pb-5"/>
                <div class="flex justify-center p-2">
                    <!-- Add Toast to confirm new player has been added -->
                    <UButton type="submit" class="p-2 flex justify-center w-sm" to="/playerData" size="xl" @click="successNotif">
                        Submit
                    </UButton>
                </div>
            </UCard>
        </div>
    </UContainer>
</template>