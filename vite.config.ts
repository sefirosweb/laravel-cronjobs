import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin';
import path from 'path'

export default defineConfig({
    base: '/vendor/laravel-cronjobs/',
    server: {
        host: '0.0.0.0',
        port: 5180,
        hmr: {
            host: 'localhost'
        },
    },
    plugins: [
        react({ fastRefresh: false }),
        laravel({
            hotFile: '../../storage/app/vite_laravel_cronjobs.hot',
            buildDirectory: 'bundle',
            input: ['resources/js/app.tsx'],
        }),
    ],


    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources', 'js'),
            '@sass': path.resolve(__dirname, 'resources/sass'),
        }
    }
});
