import { defineConfig } from 'vite'
import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vueSetupExtend from 'vite-plugin-vue-setup-extend'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueSetupExtend(),
        UnoCSS(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            eslintrc: { // 自动引入报错
                enabled: true,
            },
            // dts: true,
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
            // dts: true,
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@/styles/element/index.scss" as *;',
            },
        },
    },
    base: './', // 设置打包路径
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
    // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
        host: '0.0.0.0',
        port: 8080,
        open: true,
        // cors: true,
    
        // 跨域代理配置
        proxy: {
            '/api': {
                target: 'http://localhost:8888/',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
})
