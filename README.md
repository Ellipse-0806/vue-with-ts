# vue-with-ts

Laravelフレームワーク上で、フロントエンドにVue composition api + Typescriptを使用する例

- [vue-with-ts](#vue-with-ts)
  - [リポジトリをクローンして開始する場合](#リポジトリをクローンして開始する場合)
    - [必要なパッケージのインストール](#必要なパッケージのインストール)
  - [laravelフレームワークのセットアップ](#laravelフレームワークのセットアップ)
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
    - [vueパッケージのインストール](#vueパッケージのインストール)
    - [vueプラグインのインストール](#vueプラグインのインストール)
    - [vite設定ファイルの編集](#vite設定ファイルの編集)
    - [TypeScript用の型定義の提供](#typescript用の型定義の提供)
    - [SFCを含めた型チェックが行えるライブラリの追加](#sfcを含めた型チェックが行えるライブラリの追加)
    - [vueファイルを実装してみる](#vueファイルを実装してみる)
  - [Vueのテスト環境構築](#vueのテスト環境構築)
    - [パッケージのインストール](#パッケージのインストール)
    - [jestの設定](#jestの設定)
    - [.vueファイルでテストを実行する](#vueファイルでテストを実行する)
  - [おまけ](#おまけ)
    - [コンテナ名の変更](#コンテナ名の変更)

****

## リポジトリをクローンして開始する場合
最初からセットアップを行う場合は、[こちら](#laravelフレームワークのセットアップ)から始めてください。

### 必要なパッケージのインストール

1. 依存関係のインストールに必要なパッケージをインストール

```bash
sudo apt update; \
sudo apt install composer php8.1-curl php8.1-xml
```

2. 依存パッケージのインストール

```bash
composer install
```

3. **.env**ファイルの作成
```bash
cp -p .env.example .env
```

4. イメージのビルド

```bash
./vendor/bin/sail up -d
```

5. アプリケーションキーの生成

```bash
./vendor/bin/sail artisan key:generate
```

ここまで来たら、[こちら](#npmのセットアップ)からセットアップに復帰してください。

## laravelフレームワークのセットアップ

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
        "target": "ESNext",
        "module": "ESNext",
        "moduleResolution": "node",
        "baseUrl": ".",
        "strict": true,
        "skipLibCheck": true,
        "noImplicitAny": false,
        "sourceMap": true,
        "isolatedModules": true,
        "experimentalDecorators": true,
        "paths": {
            "@/*": ["./resources/ts/*"]
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
    // インポート時のパス設定（@/がresources/ts/に置き換えられる）
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/ts"),
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

### vueパッケージのインストール

```bash
sail npm install --save vue
```

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
            "@": path.resolve(__dirname, "resources/ts"),
        },
    },
});
```

### TypeScript用の型定義の提供
.vueファイルをインポートする際に、型チェックでエラーが発生しないようにする

1. 型定義ファイルを作成

```bash
mkdir resources/ts/@types
touch resources/ts/@types/shims-vue.d.ts
```

2. 型定義ファイルの内容を編集

```ts
declare module "*.vue" {
    import {defineComponent} from "vue";
    const component: ReturnType<typeof defineComponent>;
    export default component;
}
```

### SFCを含めた型チェックが行えるライブラリの追加

1. vue-tscを開発用ライブラリとしてインストール

```bash
sail npm install --save-dev vue-tsc
```

2. package.jsonにコマンドを追加する

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "type:check": "vue-tsc --noEmit" // 追加
},
```

### vueファイルを実装してみる

1. vueファイルを作成

```bash
touch resources/ts/welcome.vue
```

2. **welcome.vue**ファイルの内容を以下に変更

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

3. **app.ts**ファイルを以下の内容に変更

```ts
import { createApp } from 'vue';
import welcome from '@/welcome.vue';

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

5. 型チェックを行う

```bash
sail npm run type:check
```

6. 開発モードでコンパイルを実行する

```bash
sail npm run dev
```

コンソールに **Hello Vue!!** の文字と、ページ上部に赤色の **Hello Vue!!** が表示されていればOK！

## Vueのテスト環境構築
Vueのテストライブラリとしてよく挙げられるjestを利用してテスト環境を構築する

### パッケージのインストール

```bash
sail npm install --save-dev
    jest \
    ts-jest \
    @vue/test-utils \
    @vue/vue3-jest \
    @types/jest \
    jest-environment-jsdom
```

### jestの設定

1. **jest.config.cjs**を作成し以下の内容を記述

```bash
touch jest.config.cjs
```

```cjs
module.exports = {
    preset: "ts-jest",
    moduleFileExtensions: ["js", "json", "vue", "ts", "tsx"],
    // v28以降は'jest-environment-jsdom'を指定する必要有
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '.*\\.(vue)$': '@vue/vue3-jest',
        '.*\\.(ts|tsx)$': 'ts-jest'
    },
    // エイリアスパス'@/'を理解できるよう定義
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/resources/ts/$1'
    },
}
```

2. tsconfig.jsonにコンパイルオプションを追加

```json
{
    "compilerOptions": {
        // ...
        "esModuleInterop": true, // CommonJSでのデフォルトインポート有効化
    }
}
```

3. package.jsonにコマンドを追加

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "type:check": "vue-tsc --noEmit",
    "test": "jest" // 追加
},
```

4. テスト実行用のファイル作成

```bash
touch resources/ts/foo.ts
touch resources/ts/foo.test.ts
```

- foo.ts

```ts
export const sum
  = (...a: number[]) =>
    a.reduce((acc, val) => acc + val, 0);
```

- foo.test.ts

```ts
import { sum } from '@/foo';

test('basic', () => {
    expect(sum()).toBe(0);
});

test('basic again', () => {
    expect(sum(1, 2)).toBe(3);
});
```

5. テストを実行する

```bash
sail npm run test
```

### .vueファイルでテストを実行する

1. jest.config.cjsにテストオプションを追記


```cjs
// 定義しないと`ReferenceError: Vue is not defined`というエラーが発生する
module.exports = {
    // ...
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],    // nodeをテスト環境で使うように指定
    },
}
```

1. テストファイルを作成

```bash
touch /resources/ts/welcome.spec.ts
```

- welcome.spec.tsの内容を以下の通りに変更

```ts
import { mount } from "@vue/test-utils";
import welcomeVue from "./welcome.vue";

describe('welcome.vue', () => {
    it("renders the correct message", () => {
        const wrapper = mount(welcomeVue);
        expect(wrapper.text()).toBe('Hello Vue!!');
    });
});
```

3. テストの実行

```bash
sail npm run test
```

**resources/ts/welcome.spec.ts**がテストされていることを確認する

## おまけ

### コンテナ名の変更
1. **docker-compose.yml**のサービス名`laravel.test`を変更する
2. **.env**ファイルに`APP_SERVICE`というパラメータを先ほどつけた名称で設定する
