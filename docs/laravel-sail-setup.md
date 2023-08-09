# Laravel-sail

- [Laravel-sail](#laravel-sail)
  - [公式ドキュメント](#公式ドキュメント)
    - [Laravel Sail](#laravel-sail-1)
  - [laravel-sailとは](#laravel-sailとは)
  - [セットアップ](#セットアップ)
    - [laravel-sailのインストール](#laravel-sailのインストール)
    - [コンテナの起動](#コンテナの起動)
    - [Nodeパッケージのインストール](#nodeパッケージのインストール)
  - [sailコマンドのセットアップ](#sailコマンドのセットアップ)

## 公式ドキュメント

### [Laravel Sail](https://laravel.com/docs/10.x/sail)

## laravel-sailとは

docker-composeやnodejsなど、laravelを動作させるのに必要なパッケージを内包したコマンドラインインターフェースです。

例えば、

```bash
./vendor/bin/sail up -d
```

で、laravelのコンテナを立ち上げることができたり、

```bash
./vendor/bin/sail npm run dev
```

で、スクリプトの自動ビルドを行ったりできます。

## セットアップ

### laravel-sailのインストール

PROJECT_NAMEには任意のプロジェクト名を入力してください。
今回は、laravelフレームワークと、追加でmysqlコンテナを実装します。

追加できるサービスについては、[こちら](https://laravel.com/docs/10.x/installation#choosing-your-sail-services)を参照してください。

```bash
curl -s "https://laravel.build/${PROJECT_NAME}?with=mysql" | bash
```

### コンテナの起動

```bash
cd ${PROJECT_NAME} && ./vendor/bin/sail up -d
```

[localhost](http://localhost)

にアクセスして、laravelのデフォルト画面が表示されることを確認してください。

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
