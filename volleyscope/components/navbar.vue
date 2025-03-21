<template>
      <UNavigationMenu orientation="horizontal" :items="items" class="data-[orientation=vertical]:w-48" />
      <div class="flex items-center justify-center gap-2">
        <USwitch v-model="isDark" on-icon="i-heroicons-moon" off-icon="i-heroicons-sun" size="lg"/>
      </div>
  </template>
  
  <script setup lang="ts">
  const colorMode = useColorMode();
  const isDark = computed({
    get() {
      return colorMode.value === 'dark';
    },
    set() {
      colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
    },
  });

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
  