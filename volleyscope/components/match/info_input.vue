<script setup lang="ts">
    import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

    const df = new DateFormatter('en-UK', {
    dateStyle: 'short'
    })

    const modelValue = shallowRef(new CalendarDate(2025, 4, 16))
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between p-2">
                <MatchTeamSelection/>
                <UPopover :content="{align: 'center', side: 'bottom', sideOffset: 8}">
                    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                    {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
                    </UButton>

                    <template #content>
                    <UCalendar v-model="modelValue" class="p-2" />
                    </template>
                </UPopover>
                <MatchTypeSelection/>
            </div>
        </template>

        
    </UCard>
</template>