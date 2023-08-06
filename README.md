# vue-with-ts

Laravelフレームワーク上で、フロントエンドにVue composition api + Typescriptを使用する例

## Setup

- 依存関係のインストール
```bash
sudo apt update; \
sudo apt install -y composer 
    # \
    # php8.1-curl php8.1-xml
```

- laravelフレームワークのインストール

[choosing-your-sail-services](https://laravel.com/docs/10.x/installation#choosing-your-sail-services)
```bash
# PROJECT_NAMEは任意の名称
# with以降は必要なサービスを選択（`choosing-your-sail-services`参照）
curl -s "https://laravel.build/${PROJECT_NAME}?with=mysql" | bash
```

- コンテナの起動

```bash
# ブラウザで`localhost:80`にアクセスしてlaravelのデフォルト画面が出ることを確認する
cd ${PROJECT_NAME} && ./vendor/bin/sail up
```