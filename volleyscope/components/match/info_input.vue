<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  fromDate,
} from "@internationalized/date";

import type { DateValue } from "@internationalized/date";

const toast = useToast();
const matchId = defineModel<number>();
console.log("Match Id: " + matchId.value);

type Match = {
  teamId: number;
  opponentId: number;
  date: string;
  matchType: string;
};

const original = ref<Match>();
const team = ref();
const opponent = ref();
const gameType = ref();
const gameDate = ref();
const isoGameDate = ref();

// Get current date (for max validation)
const today = new Date();
const currentDate = new CalendarDate(
  today.getFullYear(),
  today.getMonth() + 1,
  today.getDate()
);

const isDateDisabled = (date: DateValue) => {
  return date >= currentDate;
};
if (matchId.value !== undefined) {
  const { data: matchData } = useAsyncData<Match>(() =>
    $fetch(`/api/match/getMatch?match=${matchId.value}`)
  );

  watchEffect(() => {
    if (matchData.value) {
      team.value = matchData.value?.teamId;
      opponent.value = matchData.value?.opponentId;
      isoGameDate.value = matchData.value?.date;
      gameType.value = matchData.value?.matchType;

      gameDate.value = fromDate(
        new Date(isoGameDate.value),
        getLocalTimeZone()
      );

      original.value = { ...matchData.value };
      refreshNuxtData();
    }
  });
}

const df = new DateFormatter("en-UK", {
  dateStyle: "short",
});

function hasChanged(): boolean {
  if (!original.value) return true;

  return (
    original.value.teamId !== team.value ||
    original.value.opponentId !== opponent.value ||
    original.value.matchType !== gameType.value ||
    original.value.date !== isoGameDate.value
  );
}

watchEffect(() => {
  if (!team.value || !opponent.value || !gameType.value || !gameDate.value)
    return;
  if (matchId.value === undefined) {
    console.log(gameType.value);
    isoGameDate.value = gameDate.value.toDate(getLocalTimeZone()).toISOString();
    saveMatch(0);
    return;
  } else if (hasChanged()) {
    saveMatch(1);
  }
  return;
});

async function saveMatch(num: number) {
  const data: Match = {
    teamId: team.value,
    opponentId: opponent.value,
    date: isoGameDate.value,
    matchType: gameType.value,
  };

  if (num === 0) {
    const response = await $fetch("/api/match/matchInput", {
      method: "POST",
      body: data,
    });

    if (!response || response.message === "error") {
      toast.add({
        title: "Error",
        description: "There was an error submitting the match information",
        color: "error",
      });
      return;
    }
    matchId.value = response.data;
    toast.add({
      title: "Match " + matchId.value + " has been added!",
      color: "success",
      icon: "bitcoin-icons:edit-filled",
    });
  } else if (num === 1) {
    const response = await $fetch(
      `/api/match/matchUpdate?match=${matchId.value}`,
      {
        method: "PUT",
        body: data,
      }
    );

    if (!response || response.message === "error") {
      toast.add({
        title: "Error",
        description: "There was an error editting the match information",
        color: "error",
      });
      return;
    }
    toast.add({
      title: "Match " + matchId.value + " has been editted!",
      color: "success",
      icon: "bitcoin-icons:edit-filled",
    });
  }
  original.value = { ...data };
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between p-2">
        <MatchTeamSelection v-model:team="team" v-model:oppo="opponent" />
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
              class="p-2"
              :is-date-disabled="isDateDisabled"
            />
          </template>
        </UPopover>
        <MatchTypeSelection v-model="gameType" />
      </div>
    </template>
  </UCard>
</template>
