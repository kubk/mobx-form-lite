<template>
  <div class="llms-txt">
    <VPButton
      text="llms.txt"
      :href="withBase('/llms.txt')"
      title="The whole library in one Markdown file for LLMs"
    />
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { VPButton } from 'vitepress/theme'
</script>

<style scoped>
.llms-txt {
  display: flex;
  align-items: center;
  padding-left: 28px;
}

@media (min-width: 768px) {
  .llms-txt {
    padding: 0 16px 0 0;
  }
}
</style>
