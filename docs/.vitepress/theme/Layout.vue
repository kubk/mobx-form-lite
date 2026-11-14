<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-before>
      <LlmsTxtLink />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LlmsTxtLink from './components/LlmsTxtLink.vue'
</script>
