<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn, TableRow } from '@nuxt/ui';
import type { Column } from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

    const isModalOpen = ref(false)
    const selectedPlayer = ref<Player | null>(null);

    type Player = {
        name: string
        position: string
        shirtNum: number
    }

    const data = ref<Player[]>([
        {
            name: 'Alan Atkins',
            position: 'Outside Hitter',
            shirtNum: 8
        },
        {
            name: 'Szandra Kovacs',
            position: 'Outside Hitter',
            shirtNum: 11
        },
        {
            name: 'Amin Khoshikibari',
            position: 'Setter',
            shirtNum: 16
        },
        {
            name: 'Georgia Pachygiannaki',
            position: 'Libero',
            shirtNum: 16
        },
        {
            name: 'Joseph Lovell',
            position: 'Libero',
            shirtNum: 11
        },
        {
            name: 'Nicholas Ciobanu',
            position: 'Opposite Hitter',
            shirtNum: 7
        },
        {
            name: 'Zu Ziolek',
            position: 'Libero',
            shirtNum: 3
        }
    ])

    const columns : TableColumn<Player>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => getHeader(column, 'Name'),
        },
        {
            accessorKey: 'position',
            header: ({ column }) => getHeader(column, 'Postion'),
        },
        {
            accessorKey: 'shirtNum',
            header: ({ column }) => getHeader(column, 'Shirt Number'),
        }
    ]

    function onSelect(row: TableRow<Player>, e?:Event){
        console.log(e)
        selectedPlayer.value = row.original;
        isModalOpen.value = true;
    }

    function getHeader(column: Column<Player>, label: string){
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
    <UTable ref="table" v-model:global-filter="globalFilter" v-model:column-visibility="columnVisibility" sticky :data="data" :columns="columns" class="flex-1" @select="onSelect"/>
    </div>

    <UModal title="Player Information" v-model:open="isModalOpen" close-icon="i-lucide-x">
        <template #body>
            <PlayerIndividualView/>
        </template>
    </UModal>
</template>