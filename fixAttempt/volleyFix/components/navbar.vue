<script setup lang="ts">

  const items = ref([
    {
      label: 'VolleyScope',
      icon: 'ph:volleyball-fill',
      children: [
        {
          label: 'About',
          description: 'Learn how you can use Volleyscope to it\'s full potential to optimise your team\'s progress!',
          icon: 'ix:about'
        },
        {
          label: 'Dashboard',
          description: 'Easily access all the features from one place!',
          icon: 'mage:dashboard-2'
        }
      ]
    }
  ])
  </script>
  
<template>
    <template>
      <UNavigationMenu orientation="horizontal" :items="items" class="data-[orientation=vertical]:w-48" />
  </template>
</template>

