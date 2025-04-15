<script setup lang="ts">
import { h, resolveComponent } from "vue";
import { upperFirst } from "scule";
import type { TableColumn, TableRow } from "@nuxt/ui";
import type { Row, Column } from "@tanstack/vue-table";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const router = useRouter();

const deleteModal = ref(false);
const toast = useToast();
let name = "";

type Player = {
  id: number;
  name: string;
  position: string;
  shirtNum: number;
};

const data = ref<Player[]>([
  {
    id: 0,
    name: "Alan Atkins",
    position: "Outside Hitter",
    shirtNum: 8,
  },
  {
    id: 1,
    name: "Szandra Kovacs",
    position: "Outside Hitter",
    shirtNum: 11,
  },
  {
    id: 2,
    name: "Amin Khoshikibari",
    position: "Setter",
    shirtNum: 16,
  },
  {
    id: 3,
    name: "Georgia Pachygiannaki",
    position: "Libero",
    shirtNum: 16,
  },
  {
    id: 4,
    name: "Joseph Lovell",
    position: "Libero",
    shirtNum: 11,
  },
  {
    id: 5,
    name: "Nicholas Ciobanu",
    position: "Opposite Hitter",
    shirtNum: 7,
  },
  {
    id: 6,
    name: "Zu Ziolek",
    position: "Libero",
    shirtNum: 3,
  },
]);

const columns: TableColumn<Player>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => getHeader(column, "Name"),
  },
  {
    accessorKey: "position",
    header: ({ column }) => getHeader(column, "Postion"),
  },
  {
    accessorKey: "shirtNum",
    header: ({ column }) => getHeader(column, "Shirt Number"),
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

function getRowItems(row: Row<Player>) {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      label: "View Player",
      icon: "i-lucide-eye",
      onSelect() {
        console.log(row.original);
        router.push({
          name: "singlePlayerView",
          query: { player: row.original.id },
        });
      },
    },
    {
      label: "Edit Player ",
      icon: "bitcoin-icons:edit-filled",

      onSelect() {
        console.log(row.original);
        router.push({
          name: "playerInput",
          query: { player: row.original.id },
        });
      },
    },
    {
      type: "separator",
    },
    {
      label: "Delete Player",
      icon: "i-lucide-trash-2",

      //   Display a modal to confirm deletion
      onSelect() {
        console.log(row.original);
        name = row.original.name;
        deleteModal.value = true;
      },
    },
  ];
}

function deleteSuccess() {
  toast.add({
    title: "Player " + name + " has been deleted!",
    color: "error",
    icon: "i-lucide-trash-2",
  });

  deleteModal.value = false;
}

function onSelect(row: TableRow<Player>, e?: Event) {
  console.log(e);
  // go to single player view page
  router.push({ name: "singlePlayerView", query: { player: row.original.id } });
}

function getHeader(column: Column<Player>, label: string) {
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

const table = useTemplateRef("table");

const columnVisibility = ref({
  id: false,
});

const globalFilter = ref("");
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
      :data="data"
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
      <h3>Are you sure you want to delete this Player?</h3>
    </template>

    <template #body>
      <p>
        This action cannot be reversed and may affect the integrity of
        previously recorded matches!
      </p>
      <p class="font-bold">You can remove them from the team instead.</p>
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
