<template>
      <div class="max-h-16px">
        <UNavigationMenu orientation="horizontal" arrow :items="items" class="data-[orientation=vertical]:w-48" />
        <!-- Add Search bar -->
        <UDropdownMenu
         arrow 
         :items="userMenu" 
         :content="{
            align: 'end',
            side: 'bottom',
            sideOffset: 8
         }" 
         :ui="{content: 'w-48'}"
         >
          <img src="~assets/img/auvcLogo.png" alt="AUVC Logo"/>
        </UDropdownMenu>
      </div>
  </template>
      
  
  <script setup lang="ts">
  
  const userMenu = ref([
    {
      label: 'Account',
      icon: 'i-lucide-user',
      disabled: true
    },
    {
      label : 'Log In',
      disabled: true
    },
    {
      label: 'Sign Up',
    }
  ])

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
        },
        {
          label: 'Leaderboards',
          description: 'View your Player\'s Performance Statistics from the most recent data',
          icon: 'iconoir:leaderboard-star'
        },
        {
          label: 'Data Analysis',
          description: 'Analyse your recorded data through intuitive graphing and filtering!',
          icon: 'streamline:money-graph-analytics-business-product-graph-data-chart-analysis'
        }
      ]
    },
    {
      label: 'Aberystwyth Uni',
      icon : 'gg:organisation',
      children : [
        {
          label : 'Player List',
          description : 'View all the player\'s registered with the organisation and their information and stats',
          icon : 'solar:user-broken'
        },
        {
          label : 'Match History',
          description : 'Access all the recorded matches for the organisation!',
          icon : 'solar:list-line-duotone'
        },
        {
          label : 'Match Input',
          description : 'Add a match recording to the database!',
          icon : 'material-symbols:input-rounded',
          disabled : true
        },
        {
          label : 'Add Player',
          description : 'Register another player to the organisation',
          icon : 'icon-park-outline:data-user',
          disabled : true
        }
      ]
    }
  ])
  </script>
  