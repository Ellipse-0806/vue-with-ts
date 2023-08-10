# vue-with-ts

## 開発環境について

このプロジェクトでは、

WSL2 Ubuntu-22.04環境で開発を行っています。

laravel-sailのインストール等は前述環境を元に行っているので、開発環境によって適宜読み替えるようにしてください。

## 各機能に関するリンク

### セットアップ
- フレームワーク
  - [Laravel-sail](../docs/laravel-sail-setup.md)
- フロントエンド
  - [TypeScript](../docs/ts-setup.md)
  - [Vue](../docs/vue-setup.md)
    - [Vue-router](../docs/vue-router-setup.md)
    - [Vue-tsc(型チェック)](../docs/vue-tsc-setup.md)
  - [Jest(テスト環境)](../docs/ts-jest-setup.md)

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

### Nodeパッケージのインストール

```bash
./vendor/bin/sail npm install
```

package-lock.jsonが生成されます。

## sailコマンドのセットアップ

いちいち、**./vendor/bin/sail** と打つのも面倒なので、**sail** で起動するようにします。

```bash
echo "alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'" >> ~/.bashrc; \
source ~/.bashrc
```

- コンテナの起動
```bash
sail up -d
```

- コンテナの終了
```bash
sail stop
```

※**vendor**ディレクトリがある階層で実行する必要がある
