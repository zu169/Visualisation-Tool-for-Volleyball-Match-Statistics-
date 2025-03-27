<script setup lang="ts">
    import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

    const positions = ['Setter', 'Outside Hitter', 'Middle', 'Libero', 'Opposite Hitter']
    const teams = ['Mens 1', 'Womens 1', 'Mens BDVA']


    const df = new DateFormatter('en-UK', {
        dateStyle: 'medium'
    })

    const modelValue = shallowRef(new CalendarDate(2024, 10, 3))
    const birthdayValue = shallowRef(new CalendarDate(2007, 10, 3))

</script>
<template>
    <UContainer>
        <div class="justify-center">
            <UCard>
                <template #header>
                    <h2>Add New Player</h2>
                </template>
                
                <h3 class="p-2">Required Information</h3>
                <USeparator/>
                <UFormField label="Player Name" required size="xl" class="p-2">
                    <UInput placeholder="Enter Name..." class="w-full" />
                </UFormField>
                <UFormField label="Position" required hint="Enter the Player's main position." size="xl" class="p-2">
                    <USelect placeholder="Select a position..." :items="positions" class="w-full"/>
                </UFormField>
                <UFormField label="Shirt Number" size="xl" class="p-2">
                    <UInput placeholder="Enter Shirt Number..." class="w-full" />
                </UFormField>
                <UFormField label="Team" required hint="Which team do they play for?" size="xl" class="p-2">
                    <USelect placeholder="Select a team..." :items="teams" class="w-full"/>
                </UFormField>
                <UFormField label="Club Member Since" required size="xl" class="p-2">
                    <UPopover class="p-2">
                        <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                            {{  modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
                        </UButton>
                        <template #content>
                            <UCalendar v-model="modelValue" class="p-2"/>
                        </template>
                    </UPopover>
                </UFormField>
                <h3 class="p-2 pt-5">Additional Information</h3>
                <USeparator/>
                <UFormField label="Vertical Jump" size="xl" class="p-2">
                    <UInputNumber placeholder="Enter jump in inches..." :format-options="{style: 'unit', unit: 'inch'}" orientation="vertical" class="w-full" />
                </UFormField>
                <UFormField label="" hint="" size="xl" class="p-2">
                    <UInput placeholder="" class="w-full" />
                </UFormField>
                <UFormField label="" hint="" size="xl" class="p-2">
                    <UInput placeholder="" class="w-full" />
                </UFormField>
                <UFormField label="" hint="" size="xl" class="p-2">
                    <UInput placeholder="" class="w-full" />
                </UFormField>
                <UFormField label="Birthday" hint="Enter the Player's to display their age (Optional)" size="xl" class="p-2">
                    <UPopover class="p-2">
                        <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                            {{  birthdayValue ? df.format(birthdayValue.toDate(getLocalTimeZone())) : 'Select a date' }}
                        </UButton>
                        <template #content>
                            <UCalendar v-model="birthdayValue" class="p-2"/>
                        </template>
                    </UPopover>
                </UFormField>
            </UCard>
        </div>
    </UContainer>
</template>