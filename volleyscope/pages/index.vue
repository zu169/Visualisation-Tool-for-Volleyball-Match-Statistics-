<template>
    <UContainer>
        <section>
        <div class="flex items-center justify-center p-5 ">
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-4">
                    Welcome to VolleyScope
                </h1>
                <p class="text-lg mb-6">
                    Intuitive Visualisation tool for Volleyball Match Statistics            
                </p>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <UCard variant="soft">
            <template #header>
                <Placeholder class="h-8"/>
                <h3 class="text-lg font-bold text-secondary-100">Data Management</h3>
            </template>

            <Placeholder class="h-32"/>
            <p>Efficient Handling of Match Statistic data with Timeline Game View and Player Information</p>

        </UCard>
        <UCard variant="soft">
            <template #header>
                <Placeholder class="h-8"/>
                <h3 class="text-lg font-bold text-secondary-100">Match Insights</h3>
            </template>

            <Placeholder class="h-32"/>
            <p>View of the Timeline of the game allow you to gain a detailed outline of each set and what happened on each point!</p>

        </UCard>
        <UCard variant="soft">
            <template #header>
                <Placeholder class="h-8"/>
                <h3 class="text-lg font-bold text-secondary-100">Leaderboards</h3>
            </template>

            <Placeholder class="h-32"/>
            <p>Encourage Competitive Spirit, Give players good understanding of their volleyball skill progress </p>
        </UCard>
        <UCard variant="soft">
            <template #header>      
                <Placeholder class="h-8"/>
                <h3 class="text-lg font-bold text-secondary-100">Data Analysis</h3>
            </template>

            <Placeholder class="h-32"/>
            <p>Visualise Match data in our intuitive Graph Display! Gain valuable match and player insights using our advanced data filtering and graphing tool!</p>
        </UCard>
        </div> 
    </section>
    <section>
        <CardsUsageInstructions/>
    </section>
    <section>
        <CardsRegisterInterest />
    </section>
    </UContainer>
  </template>
  