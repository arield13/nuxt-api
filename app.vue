<template>
  <div>
    <NuxtLayout>
      <Header/>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  import 'primevue/resources/themes/aura-light-green/theme.css'
  useHead({
    script: [
        {
          // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
          tagPosition: 'bodyClose'
        }
      ]
   })
</script>
