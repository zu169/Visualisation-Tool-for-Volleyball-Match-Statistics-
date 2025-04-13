<script setup lang="ts">
import { h, resolveComponent, warn } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn, TableRow } from '@nuxt/ui';
import type { Column } from '@tanstack/vue-table'
import type { Row } from '@tanstack/vue-table'
import { useRouter } from 'vue-router';

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

    const router = useRouter();
    const selectedMatch = ref<Match | null>(null);
    const toast = useToast()

    const deleteModal = ref(false)
    var id = 0;

    type Match = {
        match_id: number
        date: Date
        opponent: string
        result: string
        mvp: string
    }

    const data = ref<Match[]>([
        {
            match_id: 1,
            date: new Date(2023, 10, 3),
            opponent: "Cardiff Met",
            result: "1-3",
            mvp: "Alan Atkins",
        },
        {
            match_id: 2,
            date: new Date(2023, 11, 5),
            opponent: "Bristol",
            result: "3-0",
            mvp: "Alan Atkins",
        },
        {
            match_id: 3,
            date: new Date(2023, 11, 17),
            opponent: "Bath",
            result: "5-2",
            mvp: "Alan Atkins",
        },
        {
            match_id: 4,
            date: new Date(2023, 12, 3),
            opponent: "Bangor",
            result: "5-2",
            mvp: "Alan Atkins",
        }
    ])

    const columns : TableColumn<Match>[] = [
        {
            accessorKey: 'match_id',
            header: ({ column }) => getHeader(column, 'ID'),
        },
        {
            accessorKey: 'date',
            header: ({ column }) => getHeader(column, 'Date'),
        },
        {
            accessorKey: 'opponent',
            header: ({ column }) => getHeader(column, 'Opponent'),
        },
        {
            accessorKey: 'result',
            header: ({ column }) => getHeader(column, 'Result'),
        },
        {
            accessorKey: 'mvp',
            header: ({ column }) => getHeader(column, 'MVP'),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-right' },
                h(
                UDropdownMenu,
                {
                    content: {
                    align: 'end'
                    },
                    items: getRowItems(row),
                    'aria-label': 'Actions dropdown'
                },
                () =>
                    h(UButton, {
                    icon: 'i-lucide-ellipsis-vertical',
                    color: 'neutral',
                    variant: 'ghost',
                    class: 'ml-auto',
                    'aria-label': 'Actions dropdown'
                    })
                )
            )
            }
        }
    ]

    function getRowItems(row: Row<Match>) {
  return [
    {
      type: 'label',
      label: 'Actions'
    },
    {
      label: 'View Match',
      icon: 'i-lucide-eye',
      onSelect() {
        console.log(row.original)
        router.push({ name: 'singleMatchView', query: { match: row.original.match_id}})
      }
    },
    {
      label: 'Edit Match',
      icon: 'bitcoin-icons:edit-filled',

      onSelect() {
        console.log(row.original)
        router.push({ name: 'matchInput', query: { match: row.original.match_id}})
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Delete Match',
      icon: 'i-lucide-trash-2',

    //   Display a modal to confirm deletion
      onSelect() {
        console.log(row.original)
        deleteModal.value = true
        id = row.original.match_id
      }
    }
  ]
}

    function deleteSuccess() {
      deleteModal.value = false
      toast.add({
          title: 'Match ' + id + ' has been deleted!',
          color: 'error',
          icon: 'i-lucide-trash-2'
        })
    }

    function onSelect(row: TableRow<Match>, e?:Event){
        console.log(e)
        selectedMatch.value = row.original;
        router.push({ name: 'singleMatchView', query: { match: row.original.match_id}})
    }

    function getHeader(column: Column<Match>, label: string){
        const isSorted = column.getIsSorted()

        return h(
            UDropdownMenu,
            {
            content: {
                align: 'start'
            },
            'aria-label': 'Actions dropdown',
            items: [
                {
                label: 'Asc',
                type: 'checkbox',
                icon: 'i-lucide-arrow-up-narrow-wide',
                checked: isSorted === 'asc',
                onSelect: () => {
                    if (isSorted === 'asc') {
                    column.clearSorting()
                    } else {
                    column.toggleSorting(false)
                    }
                }
                },
                {
                label: 'Desc',
                icon: 'i-lucide-arrow-down-wide-narrow',
                type: 'checkbox',
                checked: isSorted === 'desc',
                onSelect: () => {
                    if (isSorted === 'desc') {
                    column.clearSorting()
                    } else {
                    column.toggleSorting(true)
                    }
                }
                }
            ]
            },
            () =>
            h(UButton, {
                color: 'neutral',
                variant: 'ghost',
                label,
                icon: isSorted
                ? isSorted === 'asc'
                    ? 'i-lucide-arrow-up-narrow-wide'
                    : 'i-lucide-arrow-down-wide-narrow'
                : 'i-lucide-arrow-up-down',
                class: '-mx-2.5 data-[state=open]:bg-(--ui-bg-elevated)',
                'aria-label': `Sort by ${isSorted === 'asc' ? 'descending' : 'ascending'}`
            })
        )
    }

    const sorting = ref([
        {
            id: 'match_id',
            desc: true
        }
    ])

    const table = useTemplateRef('table')

    const columnVisibility = ref({
    id: false
    })

    const globalFilter = ref('')
</script>

<template>
    <div class="flex flex-col flex-1 w-full">
    <div class="flex justify-between px-4 py-3.5 border-b  border-(--ui-border-accented)">
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
    <UTable ref="table" v-model:global-filter="globalFilter" v-model:sorting="sorting" v-model:column-visibility="columnVisibility" sticky :data="data" :columns="columns" class="flex-1" @select="onSelect"/>
    </div>

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
</template>