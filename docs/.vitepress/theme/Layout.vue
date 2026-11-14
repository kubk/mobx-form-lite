<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-before>
      <NavOutline />
      <LlmsTxtLink />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LlmsTxtLink from './components/LlmsTxtLink.vue'
import NavOutline from './components/NavOutline.vue'
</script>
