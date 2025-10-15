<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-before>
      <CopyToLLM />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import CopyToLLM from './components/CopyToLLM.vue'
</script>
