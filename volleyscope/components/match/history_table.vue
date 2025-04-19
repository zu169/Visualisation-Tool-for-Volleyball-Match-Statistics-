<script setup lang="ts">
import { h, resolveComponent } from "vue";
import { upperFirst } from "scule";
import type { TableColumn, TableRow } from "@nuxt/ui";
import type { Column, Row } from "@tanstack/vue-table";
import { useRouter } from "vue-router";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const router = useRouter();
const { teamId } = defineProps<{ teamId?: number }>();
const selectedMatch = ref<Match | null>(null);
const toast = useToast();

const deleteModal = ref(false);
let title = "";
let id = 0;

type Match = {
  matchId: number;
  teamId: number;
  opponentId: number;
  date: string;
  matchType: string;
};

type Team = {
  teamId: number;
  teamName: string;
  league: string;
  division: string;
};

const { data: teamData } = useAsyncData<Team[]>(() =>
  $fetch("/api/team/getAllTeamNames")
);

const { data: opponentData } = useAsyncData<Team[]>(() =>
  $fetch("/api/team/getAllOpponentsNames")
);

function getTeamName(id: number) {
  const selectedTeamName = teamData.value?.find(
    (t) => t.teamId === id
  )?.teamName;
  return selectedTeamName;
}

function getOpponentName(id: number) {
  const selectedTeamName = opponentData.value?.find(
    (t) => t.teamId === id
  )?.teamName;
  return selectedTeamName;
}

const sorting = ref([
  {
    id: "Date",
    desc: true,
  },
]);

const table = useTemplateRef("table");

const columnVisibility = ref({
  id: false,
});

const globalFilter = ref("");

const { data } = await useFetch<Match[]>(
  `/api/match/getAllMatches?team=${teamId}`,
  {
    key: "table",
    transform: (data) => {
      return (
        data?.map((match) => ({
          ...match,
        })) || []
      );
    },
  }
);

const columns: TableColumn<Match>[] = [
  {
    id: "Date",
    accessorKey: "date",
    header: ({ column }) => getHeader(column, "Date"),
  },
  {
    id: "Title",
    accessorKey: "teamId",
    header: ({ column }) => getHeader(column, "Team"),
    cell: ({ row }) =>
      getTeamName(row.original.teamId) +
      " vs " +
      getOpponentName(row.original.opponentId),
  },
  {
    id: "Type",
    accessorKey: "matchType",
    header: ({ column }) => getHeader(column, "Type"),
  },
  // {
  //   accessorKey: "result",
  //   header: ({ column }) => getHeader(column, "Result"),
  // },
  // {
  //   accessorKey: "mvp",
  //   header: ({ column }) => getHeader(column, "MVP"),
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
            "aria-label": "Actions dropdown",
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
              "aria-label": "Actions dropdown",
            })
        )
      );
    },
  },
];

function getRowItems(row: Row<Match>) {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      label: "View Match",
      icon: "i-lucide-eye",
      onSelect() {
        console.log(row.original);
        router.push({
          name: "singleMatchView",
          query: { match: row.original.matchId },
        });
      },
    },
    {
      label: "Edit Match",
      icon: "bitcoin-icons:edit-filled",

      onSelect() {
        console.log(row.original);
        router.push({
          name: "matchInput",
          query: { match: row.original.matchId },
        });
      },
    },
    {
      type: "separator",
    },
    {
      label: "Delete Match",
      icon: "i-lucide-trash-2",

      //   Display a modal to confirm deletion
      onSelect() {
        console.log(row.original);
        deleteModal.value = true;
        id = row.original.matchId;
        title =
          getTeamName(row.original.teamId) +
          " vs " +
          getOpponentName(row.original.opponentId);
      },
    },
  ];
}

async function deleteSuccess() {
  const response = await $fetch(`/api/match/deleteMatch?match=${id}`);
  if (!response || response.message === "error") {
    toast.add({
      title: "Error",
      description: "There was an error deleting the Team",
      color: "error",
    });
    return;
  }
  deleteModal.value = false;
  toast.add({
    title: "Match " + title + " has been deleted!",
    color: "error",
    icon: "i-lucide-trash-2",
  });
  await refreshNuxtData("table"); 
}

function onSelect(row: TableRow<Match>, e?: Event) {
  console.log(e);
  selectedMatch.value = row.original;
  router.push({
    name: "singleMatchView",
    query: { match: row.original.matchId },
  });
}

function getHeader(column: Column<Match>, label: string) {
  const isSorted = column.getIsSorted();

  return h(
    UDropdownMenu,
    {
      content: {
        align: "start",
      },
      "aria-label": "Actions dropdown",
      items: [
        {
          label: "Asc",
          type: "checkbox",
          icon: "i-lucide-arrow-up-narrow-wide",
          checked: isSorted === "asc",
          onSelect: () => {
            if (isSorted === "asc") {
              column.clearSorting();
            } else {
              column.toggleSorting(false);
            }
          },
        },
        {
          label: "Desc",
          icon: "i-lucide-arrow-down-wide-narrow",
          type: "checkbox",
          checked: isSorted === "desc",
          onSelect: () => {
            if (isSorted === "desc") {
              column.clearSorting();
            } else {
              column.toggleSorting(true);
            }
          },
        },
      ],
    },
    () =>
      h(UButton, {
        color: "neutral",
        variant: "ghost",
        label,
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5 data-[state=open]:bg-(--ui-bg-elevated)",
        "aria-label": `Sort by ${
          isSorted === "asc" ? "descending" : "ascending"
        }`,
      })
  );
}
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <div
      class="flex justify-between px-4 py-3.5 border-b border-(--ui-border-accented)"
    >
      <UInput v-model="globalFilter" class="max-w-sm" placeholder="Filter..." />
      <UDropdownMenu
        :items="
          table?.tableApi
            ?.getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => ({
              label: upperFirst(column.id),
              type: 'checkbox' as const,
              checked: column.getIsVisible(),
              onUpdateChecked(checked: boolean) {
                table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
              },
              onSelect(e?: Event) {
                e?.preventDefault()
              }
            }))"
        :content="{ align: 'end' }"
      >
        <UButton
          label="Columns"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>
    <UTable
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:sorting="sorting"
      v-model:column-visibility="columnVisibility"
      sticky
      :data="data ?? []"
      :columns="columns"
      class="flex-1"
      @select="onSelect"
    />
  </div>
  <UModal
    v-model:open="deleteModal"
    :dismissible="false"
    :close="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #header>
      <h3>Are you sure you want to delete this Match?</h3>
    </template>

    <template #body>
      <p>
        This action cannot be reversed and will affect existing leaderboard
        data!
      </p>
    </template>

    <template #footer>
      <UButton
        label="No"
        color="success"
        variant="soft"
        @click="deleteModal = false"
      />
      <UButton
        label="Yes, I'm sure!"
        color="error"
        variant="outline"
        @click="deleteSuccess()"
      />
    </template>
  </UModal>
</template>
