import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import * as path from "path";

export default defineConfig({
    server: {
        hmr: {
            host: 'localhost',
        },
    },
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/app.js',
                'resources/ts/app.ts'
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "resources/ts"),
        },
    },
});
