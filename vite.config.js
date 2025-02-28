import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import autoprefixer from 'autoprefixer'
import postcssPxToRem from "postcss-pxtorem";
import path from 'node:path';

export default defineConfig({
    css: {
        postcss: {
            plugins: [
                autoprefixer,
                postcssPxToRem
            ],
        },
        preprocessorOptions: {
            scss: {
                additionalData: `@use "${path.resolve(__dirname, './src/styles/helpers')}" as *;`
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@images': path.resolve(__dirname, './src/assets/images'),
            '@icons': path.resolve(__dirname, './src/assets/icons'),
            '@fonts': path.resolve(__dirname, './src/assets/fonts'),
            '@blocks': path.resolve(__dirname, './src/styles/blocks'),
            '@components': path.resolve(__dirname, './src/styles/components')
        }
    }
})