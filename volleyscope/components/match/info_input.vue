<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

const { matchId } = defineProps<{ matchId: number }>();
console.log(matchId);

const df = new DateFormatter("en-UK", {
  dateStyle: "short",
});

const gameType = ref();
const gameDate = ref();
// add game data to database
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between p-2">
        <MatchTeamSelection :match-id="matchId" />
        <UPopover :content="{ align: 'center', side: 'bottom', sideOffset: 8 }">
          <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
            {{
              gameDate
                ? df.format(gameDate.toDate(getLocalTimeZone()))
                : "Select a date"
            }}
          </UButton>

          <template #content>
            <UCalendar
              v-model="gameDate"
              :default-value="new CalendarDate(2025, 4, 16)"
              class="p-2"
            />
          </template>
        </UPopover>
        <MatchTypeSelection v-model="gameType" />
      </div>
      <p>{{ gameType }}</p>
    </template>
  </UCard>
</template>
