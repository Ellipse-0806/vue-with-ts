# vue-router

vue-routerはSPA(Single Page Application)をVueで実現するための拡張ライブラリです。

[Vue Router](https://router.vuejs.org/)

## ライブラリのインストール

```bash
sail npm install --save vue-router
```

## ルーティングの作成

1. ルーティングを定義する [router.ts](../resources/ts/router/router.ts) を作成

```ts
import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/Home.vue";
import mypage from "@/views/Mypage.vue";

const routes = [
    {path: '/spa/home', name: 'home', component: home},
    {path: '/spa/mypage', name: 'mypage', component: mypage},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
```

コンポーネントの内容は以下を参照
- [Home.vue](../resources/ts/views/Home.vue)
- [Mypage.vue](../resources/ts/views/Mypage.vue)

2. コンポーネントをマウントするベースファイル [App.vue](../resources/ts/base/App.vue) を作成

```vue
<script setup lang="ts">

</script>

<template>
    <RouterView v-slot="{ Component, route }">
        <template v-if="Component">
            <Transition :duration="300" name="fade" mode="out-in">
                <Suspense timeout="0">  <!-- 非同期処理をする際に必要 -->
                    <template #default>
                        <div :key="route.path">　<!-- pathによって表示する要素を切り替える -->
                            <component :is="Component"></component> <!-- ここにマウントされる -->
                        </div>
                    </template>
                    <template #fallback>Loading...</template>
                </Suspense>
            </Transition>
        </template>
    </RouterView>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
```

3. エントリポイントとなる [app.ts](../resources/ts/app.ts) を作成

```ts
import { createApp } from "vue";
import router from "@/router/router";
import baseApp from "@/base/App.vue";

const app = createApp(baseApp);
app.use(router);    // vue-routerを使用する
app.mount('#app');  // idがappのタグにマウントする
```

4. vue-routerによって提供されるコンポーネントをマウントするための [spa.blade.php](../resources/views/spa.blade.php) を作成

```php
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>spa page</title>

        @vite([
            'resources/ts/app.ts'
        ])
    </head>
    <div id="app">
        <router-view/> // ここにApp.vueがマウントされる
    </div>
</html>
```

5. blade.phpにルーティングされるよう [web.php](../routes/web.php) をに追記

```php
Route::get('/spa/{any?}', function () {
    return view('spa');
});
```

## アクセステスト

[localhost/spa/home](http://localhost/spa/home)で、Home.vueの内容が表示されることを確認する
