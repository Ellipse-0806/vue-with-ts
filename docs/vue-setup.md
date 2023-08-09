# Vueのセットアップ

- [Vueのセットアップ](#vueのセットアップ)
  - [前提条件](#前提条件)
    - [Vite](#vite)
    - [アセットの構築（Vite） --Vue](#アセットの構築vite---vue)
  - [パッケージのインストール](#パッケージのインストール)
  - [Vite設定ファイルの編集](#vite設定ファイルの編集)
  - [TypeScript用の型定義の提供](#typescript用の型定義の提供)
  - [SFCファイルでのテスト](#sfcファイルでのテスト)


## 前提条件

laravel-sail環境でのセットアップです。
sailではViteというビルドツールを採用しています。

### [Vite](https://ja.vitejs.dev/)

laravel-sailのインストールがまだの場合は、[こちら](./laravel-sail-setup.md)からセットアップを行ってください。

下記手順は、以下のページを参考にしています。

### [アセットの構築（Vite） --Vue](https://readouble.com/laravel/10.x/ja/vite.html#vue)

## パッケージのインストール

```bash
sail npm install --save vue; \
sail npm install --save-dev @vitejs/plugin-vue
```
## Vite設定ファイルの編集

[vite.config.js](../vite.config.js)を以下のように編集

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';   // インポートパスの追加
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
        // Vueプラグインを使用するよう指定
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/ts"),
        },
    },
});
```

## TypeScript用の型定義の提供
.vueファイルをインポートする際に、型チェックでエラーが発生しないようにする

1. 型定義ファイルを作成

```bash
mkdir resources/ts/@types; \
touch resources/ts/@types/shims-vue.d.ts
```

2. 型定義ファイルの内容を編集

[shims-vue.d.ts](../resources/ts/@types/shims-vue.d.ts) を以下のように編集

```ts
declare module "*.vue" {
    import {defineComponent} from "vue";
    const component: ReturnType<typeof defineComponent>;
    export default component;
}
```

## SFCファイルでのテスト

SFCとは Single File Component の略です。

[Vue.js --SFC構文仕様](https://ja.vuejs.org/api/sfc-spec.html)

1. vueファイルを作成

```bash
touch resources/ts/welcome.vue
```

2. [welcome.vue](../resources/ts/example/welcome.vue) ファイルの内容を以下に変更

```html
<script setup lang="ts">
const msg: string = "Hello Vue!!";
</script>
<template>
    <div class="hello">{{ msg }}</div>
</template>
<style>
.hello {
    color: red;
}
</style>
```

3. [app.ts](../resources/ts/example/app.ts)ファイルを以下の内容に変更

```ts
import { createApp } from 'vue';
import welcome from '@/welcome.vue';

const id: number = 1;
console.log(id);

const app = createApp(welcome);
app.mount('#app');
```

4. [welcome.blade.php](../resources/views/welcome.blade.php)ファイルのbodyタグ内に以下の内容を追加

```php
// ...
<body class="antialiased">
    <div id="app"></div>
    // ...
</body>
```

5. 開発モードでコンパイルを実行する

```bash
sail npm run dev
```

[localhost](http://localhost) を開いたときに、コンソールに **Hello Vue!!** の文字と、ページ上部に赤色の **Hello Vue!!** が表示されていればOK！
