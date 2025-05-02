<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  fromDate,
} from "@internationalized/date";

const toast = useToast();
const matchId = defineModel<number>();
console.log("Match Id: " + matchId.value);

type Match = {
  teamId: number;
  opponentId: number;
  date: string;
  matchType: string;
};

// Get current date (for max validation)
const today = new Date();
const currentDate = new CalendarDate(
  today.getFullYear(),
  today.getMonth() + 1,
  today.getDate()
);

const df = new DateFormatter("en-UK", {
  dateStyle: "short",
});

const isDateDisabled = (date: DateValue) => {
  return date > currentDate;
};

const original = ref<Match>();
const team = ref<number>();
const opponent = ref<number>();
const gameType = ref<string>();
const gameDate = shallowRef(new CalendarDate(2025, 4, 28));
const isoGameDate = ref<string>();

const { data: matchData, pending } = useAsyncData<Match>(
  () => $fetch(`/api/match/getMatch?match=${matchId.value}`)
  // {
  //   watch: [matchId],
  //   immediate: false, // Only fetch when matchId is available
  // }
);

/**
 * Initialize form when match data loads
 */
watchEffect(() => {
  if (!matchId.value) return;
  if (pending.value === true) return;
  if (matchData.value && matchId.value) {
    console.log("Match Data: ", matchData.value);
    team.value = matchData.value.teamId;
    opponent.value = matchData.value.opponentId;
    gameType.value = matchData.value.matchType;
    isoGameDate.value = matchData.value.date;

    // Convert ISO date to CalendarDate object
    console.log("ISO Date: " + matchData.value.date);
    gameDate.value = fromDate(new Date(isoGameDate.value));
    console.log("Game Date: ", gameDate.value);

    original.value = { ...matchData.value };
    console.log("Original: ", original.value);
  }
});

/**
 * Check if form has been modified
 */
const hasChanged = computed(() => {
  console.log("Original: ", original.value);
  if (!original.value) return true;

  // Normalize the date comparison
  const normalisedGameDate = gameDate.value
    ?.toDate(getLocalTimeZone())
    .toISOString()
    .split("T")[0];

  console.log("og date" + original.value.date);
  console.log("new date" + normalisedGameDate);
  return (
    original.value.teamId !== team.value ||
    original.value.opponentId !== opponent.value ||
    original.value.matchType !== gameType.value ||
    original.value.date !== normalisedGameDate
  );
});

watchEffect(() => {
  if (!team.value || !opponent.value || !gameType.value || !gameDate.value)
    return;

  if (isNaN(matchId.value)) {
    isoGameDate.value = gameDate.value
      .toDate(getLocalTimeZone())
      .toISOString()
      .split("T")[0];
    console.log("Date: " + isoGameDate.value);
    saveMatch(0);
    return;
    console.log(hasChanged.value);
  } else if (hasChanged.value === true && matchId.value !== undefined) {
    isoGameDate.value = gameDate.value
      .toDate(getLocalTimeZone())
      .toISOString()
      .split("T")[0];
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
