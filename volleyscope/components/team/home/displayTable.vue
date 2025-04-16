<script setup lang="ts">
import { h, resolveComponent } from "vue";
import { upperFirst } from "scule";
import type { TableColumn } from "@nuxt/ui";
import type { Row, Column } from "@tanstack/vue-table";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const deleteModal = ref(false);
let id = 0;
let name = "";
const toast = useToast();

type Team = {
  teamId: number;
  teamName: string;
  league: string;
  division: string;
};

const table = useTemplateRef("table");

const columnVisibility = ref({
  teamId: false,
});

const globalFilter = ref("");

const { data } = await useFetch<Team[]>("/api/team/getAllTeams", {
  key: "table",
  transform: (data) => {
    return (
      data?.map((team) => ({
        ...team,
      })) || []
    );
  },
  lazy: true,
});

const columns: TableColumn<Team>[] = [
  {
    accessorKey: "teamName",
    header: ({ column }) => getHeader(column, "Name"),
  },
  {
    accessorKey: "league",
    header: ({ column }) => getHeader(column, "League"),
  },
  {
    accessorKey: "division",
    header: ({ column }) => getHeader(column, "Division"),
  },
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

function getRowItems(row: Row<Team>) {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      label: "Edit Team ",
      icon: "bitcoin-icons:edit-filled",

      onSelect() {
        console.log(row.original);
        // Use Modal to edit
      },
    },
    {
      type: "separator",
    },
    {
      label: "Delete Team",
      icon: "i-lucide-trash-2",

      //   Display a modal to confirm deletion
      onSelect() {
        console.log(row.original);
        id = row.original.teamId;
        name = row.original.teamName;
        deleteModal.value = true;
      },
    },
  ];
}

async function deleteSuccess() {
  const response = await $fetch(`/api/team/deleteTeam?team=${id}`);
  if (!response || response.message === "error") {
    toast.add({
      title: "Error",
      description: "There was an error deleting the Team",
      color: "error",
    });
    return;
  }
  toast.add({
    title: "Team " + name + " has been deleted!",
    color: "success",
    icon: "i-lucide-trash-2",
  });
  deleteModal.value = false;
  await refreshNuxtData("table");
}

function getHeader(column: Column<Team>, label: string) {
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
  <div class="flex flex-col flex-1 w-full p-2">
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
            }))
        "
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
      v-model:column-visibility="columnVisibility"
      sticky
      :data?="data"
      :columns="columns"
      class="flex-1"
    />
  </div>

  <UModal
    v-model:open="deleteModal"
    :dismissible="false"
    :close="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #header>
      <h3>Are you sure you want to delete this Team?</h3>
    </template>

    <template #body>
      <p>
        This action cannot be reversed and may affect the integrity of
        previously recorded matches!
      </p>
      <p class="font-bold">
        You can rename the team or change other information instead.
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
