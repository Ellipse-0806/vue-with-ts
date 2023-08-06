# vue-with-ts

Laravelフレームワーク上で、フロントエンドにVue composition api + Typescriptを使用する例

## laravelフレームワークのセットアップ

### 依存関係のインストール
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
  - [おまけ](#おまけ)
    - [コンテナ名の変更](#コンテナ名の変更)

```bash
sudo apt update; \
sudo apt install -y composer
    # \
    # php8.1-curl php8.1-xml
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

## おまけ

### コンテナ名の変更
1. **docker-compose.yml**のサービス名`laravel.test`を変更する
2. **.env**ファイルに`APP_SERVICE`というパラメータを先ほどつけた名称で設定する
