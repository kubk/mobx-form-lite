import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text'],
        },
        typecheck: {
            enabled: true,
            include: ['**/*.test-d.ts'],
        },
    },
})