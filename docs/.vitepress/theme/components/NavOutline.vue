<template>
  <div v-if="hasLocalNav" class="nav-outline">
    <VPLocalNavOutlineDropdown :headers="headers" :navHeight="navHeight" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLocalNav } from 'vitepress/theme'
import VPLocalNavOutlineDropdown from 'vitepress/dist/client/theme-default/components/VPLocalNavOutlineDropdown.vue'

// The "On this page" dropdown from VitePress' local nav, moved into the navbar
const { headers, hasLocalNav } = useLocalNav()
const navHeight = ref(0)

onMounted(() => {
  navHeight.value = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--vp-nav-height'),
  )
})
</script>

<style scoped>
.nav-outline {
  display: none;
}

/* Between these widths VitePress shows the outline in a separate bar under the navbar */
@media (min-width: 960px) and (max-width: 1279px) {
  .nav-outline {
    display: block;
    position: relative;
    order: -2;
    padding-left: 32px;
  }
}

.nav-outline :deep(.VPLocalNavOutlineDropdown) {
  padding: 0;
}

.nav-outline :deep(.items) {
  top: calc(100% + 24px);
  left: 28px;
}
</style>
