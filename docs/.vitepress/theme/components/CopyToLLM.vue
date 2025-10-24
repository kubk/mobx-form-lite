<template>
  <div class="VPNavBarMenuGroup" v-if="!screenMenu">
    <button
      class="copy-to-llm-btn VPButton medium brand"
      @click="copyToClipboard"
      title="Copy all documentation to LLM"
    >
      <span v-if="!copied">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy to LLM
      </span>
      <span v-else>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied!
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  screenMenu?: boolean
}>()

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    const response = await fetch('/mobx-form-lite/llms.txt')
    copied.value = true
    const text = await response.text()
    await navigator.clipboard.writeText(text)
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.VPNavBarMenuGroup {
  display: flex;
  align-items: center;
}

.copy-to-llm-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding-left: 28px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.copy-to-llm-btn span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.copy-to-llm-btn svg {
  flex-shrink: 0;
}
</style>
