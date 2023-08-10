# TypeScriptのセットアップ

※プロジェクトのrootディレクトリをカレントディレクトリとします。

- [TypeScriptのセットアップ](#typescriptのセットアップ)
  - [前提条件](#前提条件)
    - [Vite](#vite)
  - [ビルド環境の作成](#ビルド環境の作成)
    - [設定ファイルの作成](#設定ファイルの作成)
    - [viteの設定ファイル編集](#viteの設定ファイル編集)
    - [TypeScriptの実行テスト用ファイルの作成](#typescriptの実行テスト用ファイルの作成)
    - [テスト実行](#テスト実行)

## 前提条件

laravel-sail環境でのセットアップです。
sailではViteというビルドツールを採用しています。

### [Vite](https://ja.vitejs.dev/)

ViteはデフォルトでTypeScriptをサポートしているので、特別インストールするものはありません。

laravel-sailのインストールがまだの場合は、[こちら](./laravel-sail-setup.md)からセットアップを行ってください。

## ビルド環境の作成

### 設定ファイルの作成

```bash
touch tsconfig.json
```

[tsconfig.json](../tsconfig.json) の内容を以下の通りに編集してください。

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

各パラメータについては下記リンク先を参照してください。

[tsconfig](https://www.typescriptlang.org/ja/tsconfig)

### viteの設定ファイル編集

[vite.config.js](../vite.config.js) を以下のように編集

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

### TypeScriptの実行テスト用ファイルの作成

```bash
mkdir resources/ts; \
touch resources/ts/app.ts
```

[app.ts](../resources/ts/example/app.ts) ファイルの内容は以下の通りにしておく
```ts
const id: number = 1;
console.log(id);
```

### テスト実行

1. **resources/views/welcome.blade.php** のヘッダ内に下記コードを追加する

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
