<template>
    <h1 class="text-center pb-4">Coming Soon</h1>
    <p class="text-center">Sign Up to get notified when you can begin your journey to improving your Volleyball Team with VolleyScope!</p>
    <UFormField label="Organisation" hint="Optional" size="xl" class="p-4">
        <UInput placeholder="Enter the Organisation Name" class="w-full"></UInput>
    </UFormField>
    <UFormField label="Email" description="We'll never share your email with anyone else." required size="xl" class="p-4 pt-0">
        <UInput placeholder="Enter your email" class="w-full" />
    </UFormField>
    <UButton type="submit" class="p-2 flex justify-center">
      Submit
    </UButton>
    <p class="text-sm">Disclaimer: There might be a small subscription for the service to cover the cost of hosting the site</p>
</template>