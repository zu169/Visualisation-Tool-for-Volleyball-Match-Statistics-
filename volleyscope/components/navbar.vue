<template>
      <div class="flex justify-between h-24 p-2 ">  
        <a href="/">
        <img class="h-20" src="~assets/img/auvcLogo.png" alt="AUVC Logo"/>
        </a>
        <!-- Add Search bar -->
        <UNavigationMenu highlight-color="primary" orientation="horizontal" arrow :items="items" class="data-[orientation=vertical]:w-48" />
      </div>
  </template>
      
  
  <script setup lang="ts">

  const items = ref([
    {
      label: 'VolleyScope',
      icon: 'ph:volleyball-fill',
      to: '/',
      children: [
        {
          label: 'About',
          description: 'Learn how you can use Volleyscope to it\'s full potential to optimise your team\'s progress!',
          icon: 'ix:about',
          to: '/'
        },
        {
          label: 'Dashboard',
          description: 'Easily access all the features from one place!',
          icon: 'mage:dashboard-2',
          to: '/dashboard'
        },
        {
          label: 'Leaderboards',
          description: 'View your Player\'s Performance Statistics from the most recent data',
          icon: 'iconoir:leaderboard-star',
          to: '/leaderboard'
        },
        {
          label: 'Data Analysis',
          description: 'Analyse your recorded data through intuitive graphing and filtering!',
          icon: 'streamline:money-graph-analytics-business-product-graph-data-chart-analysis',
          to: '/dataAnalysis'
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
          icon : 'solar:user-broken',
          to: '/playerData'
        },
        {
          label : 'Match History',
          description : 'Access all the recorded matches for the organisation!',
          icon : 'solar:list-line-duotone',
          to: '/matchHistory'
        },
        {
          label : 'Match Input',
          description : 'Add a match recording to the database!',
          icon : 'material-symbols:input-rounded',
          to: '/matchInput'
        },
        {
          label : 'Add Player',
          description : 'Register another player to the organisation',
          icon : 'icon-park-outline:data-user',
          to: '/playerInput'
        }
      ]
    },
    {
      label: 'Account',
      icon: 'i-lucide-user',
      children: [
        {
          label : 'Log In',
          disabled: true
        },
        {
          label: 'Sign Up',
          to: '/'
        }
      ]
    }
  ])
  </script>
  