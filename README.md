# vue-with-ts

Laravelフレームワーク上で、フロントエンドにVue composition api + Typescriptを使用する例

- [vue-with-ts](#vue-with-ts)
  - [laravelフレームワークのセットアップ](#laravelフレームワークのセットアップ)
    - [依存関係のインストール](#依存関係のインストール)
    - [laravelフレームワークのインストール](#laravelフレームワークのインストール)
    - [コンテナの起動テスト](#コンテナの起動テスト)
    - [npmのセットアップ](#npmのセットアップ)
    - [sailコマンドのセットアップ](#sailコマンドのセットアップ)
  - [TypeScriptのセットアップ](#typescriptのセットアップ)
    - [TypeScriptの実行テスト用ファイルの作成](#typescriptの実行テスト用ファイルの作成)
    - [設定ファイルの作成](#設定ファイルの作成)
    - [viteの設定ファイル編集](#viteの設定ファイル編集)
    - [テスト実行](#テスト実行)
  - [Vueのセットアップ](#vueのセットアップ)
    - [vueプラグインのインストール](#vueプラグインのインストール)
    - [vite設定ファイルの編集](#vite設定ファイルの編集)
    - [TypeScript用の型定義の提供](#typescript用の型定義の提供)
    - [vueファイルを実装してみる](#vueファイルを実装してみる)
  - [おまけ](#おまけ)
    - [コンテナ名の変更](#コンテナ名の変更)

****
## laravelフレームワークのセットアップ

### 依存関係のインストール
```bash
sudo apt update; \
sudo apt install -y composer
```

### laravelフレームワークのインストール

[choosing-your-sail-services](https://laravel.com/docs/10.x/installation#choosing-your-sail-services)
```bash
# PROJECT_NAMEは任意の名称
# with以降は必要なサービスを選択（`choosing-your-sail-services`参照）
curl -s "https://laravel.build/${PROJECT_NAME}?with=mysql" | bash
```

### コンテナの起動テスト

```bash
# ブラウザで`localhost`にアクセスしてlaravelのデフォルト画面が出ることを確認する
cd ${PROJECT_NAME} && ./vendor/bin/sail up -d
```

### npmのセットアップ

```bash
# package-lock.jsonが生成される
./vendor/bin/sail npm install
```

### sailコマンドのセットアップ

```bash
echo "alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'" >> ~/.bashrc; \
source ~/.bashrc
```

※下記コマンドは**vendor**ディレクトリがある階層で実行する必要がある

- コンテナの起動
```bash
sail up -d
```

- コンテナの終了
```bash
sail stop
```

## TypeScriptのセットアップ

※プロジェクトのrootディレクトリをカレントディレクトリとする

### TypeScriptの実行テスト用ファイルの作成

```bash
mkdir resources/ts; \
touch resources/ts/app.ts
```

app.tsファイルの内容は以下の通りにしておく
```ts
const id: number = 1;
console.log(id);
```

### 設定ファイルの作成
```bash
touch tsconfig.json
```

- 作成したファイルに下記内容を記述する

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ES2022",
        "moduleResolution": "node",
        "baseUrl": ".",
        "strict": true,
        "skipLibCheck": true,
        "noImplicitAny": false,
        "sourceMap": true,
        "isolatedModules": true,
        "experimentalDecorators": true,
        // "typeRoots": ["./resources/ts/@types"], // vueを使用する際に必要
        "paths": {
            "~/*": ["./resources/ts/*"]
        }
    },
    "include": ["resources/ts/**/*"]
}
```

### viteの設定ファイル編集

./vite.config.jsを以下のように編集

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import * as path from "path";

export default defineConfig({
  　// hmr(Hot Module Replacement)のホスト指定
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
                'resources/ts/app.ts' // ビルド対象に追加
            ],
            refresh: true,
        }),
    ],
    // インポート時のパス設定（~/がresources/ts/に置き換えられる）
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "resources/ts"),
        },
    },
});
```

### テスト実行

1. **resources/views/welcome.blade.php**のヘッダ内に下記コードを追加する

```php
<head>
    // ...
    @vite(['resources/ts/app.ts'])
</head>
```

2. 開発モードでコンパイルを実行する

```bash
sail npm run dev
```

3. ブラウザでlocalhostを開いて、コンソール出力を確認する
    
    コンソールに1が出力されていればOK！

## Vueのセットアップ

[アセットの構築（Vite） --Vue](https://readouble.com/laravel/10.x/ja/vite.html#vue)

### vueプラグインのインストール

```bash
sail npm install --save-dev @vitejs/plugin-vue
```

### vite設定ファイルの編集

./vite.config.jsを以下のように編集

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
            "~": path.resolve(__dirname, "resources/ts"),
        },
    },
});
```

### TypeScript用の型定義の提供
.vueファイルをインポートする際に、型チェックでエラーが発生しないようにする

1. **tsconfig.json**のTypeRootsのコメントアウトを外す
2. 型定義ファイルを作成

```bash
mkdir resources/ts/@types
touch resources/ts/@types/shims-vue.d.ts
```

3. 型定義ファイルの内容を編集

```ts
declare module "*.vue" {
    import {defineComponent} from "vue";
    const component: ReturnType<typeof defineComponent>;
    export default component;
}
```

### vueファイルを実装してみる

1. vueファイルを作成

```bash
touch resources/ts/welcome.vue
```

2. **welcome.vue**ファイルの内容を以下に変更

```html
<script setup lang="ts">
console.log("hello Vue!!");
</script>
<template>
    <div class="hello">Hello Vue!!</div>
</template>
<style>
.hello {
    color: red;
}
</style>
```

3. **app.ts**ファイルを以下の内容に変更

```ts
import { createApp } from 'vue';
import welcome from '~/example/welcome.vue';

const id: number = 1;
console.log(id);

const app = createApp(welcome);
app.mount('#app');
```

4. **welcome.blade.php**ファイルのbodyタグ内に以下の内容を追加

```php
<body class="antialiased">
    <div id="app"></div>
    // ...
</body>
```

5. 開発モードでコンパイルを実行する

```bash
sail npm run dev
```

コンソールに **Hello Vue!!** の文字と、ページ上部に赤色の **Hello Vue!!** が表示されていればOK！

## おまけ

### コンテナ名の変更
1. **docker-compose.yml**のサービス名`laravel.test`を変更する
2. **.env**ファイルに`APP_SERVICE`というパラメータを先ほどつけた名称で設定する
