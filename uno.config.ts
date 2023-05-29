// uno.config.ts
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
    shortcuts: {
        'full': 'h-full w-full',
        'flex-center': 'flex items-center justify-center',
        'flex-between': 'flex items-center justify-between',
    },
    theme: {
        colors: {
            primary: 'var(--el-color-primary)',
        },
    },
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
        }),
    ],
})