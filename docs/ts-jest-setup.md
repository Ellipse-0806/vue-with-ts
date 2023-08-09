# テスト環境のセットアップ

JavaScriptのテストフレームワークである [Jest](https://jestjs.io/ja/) は、JSまたはTSで記述されたコードであればテストすることができます。

- [テスト環境のセットアップ](#テスト環境のセットアップ)
  - [パッケージのインストール](#パッケージのインストール)
    - [各パッケージのリファレンス](#各パッケージのリファレンス)
  - [Jestの設定ファイルの作成](#jestの設定ファイルの作成)
  - [Jestの実行コマンドを定義](#jestの実行コマンドを定義)
  - [テストの実行](#テストの実行)
    - [tsファイル](#tsファイル)
    - [SFC(.vue)ファイル](#sfcvueファイル)


## パッケージのインストール

```bash
sail npm install --save-dev \
    jest \
    ts-jest \
    @vue/test-utils \
    @vue/vue3-jest \
    @types/jest \
    jest-environment-jsdom
```

### 各パッケージのリファレンス

- [ts-jest, @types/jest](https://typescript-jp.gitbook.io/deep-dive/intro-1/jest)

- [Vue Test Utils](https://test-utils.vuejs.org/)

## Jestの設定ファイルの作成

1. 設定ファイルの作成

```bash
touch jest.config.cjs
```

2. [jest.config.cjs](../jest.config.cjs) に以下の内容を記述 

```cjs
module.exports = {
    preset: "ts-jest",
    moduleFileExtensions: ["js", "json", "vue", "ts", "tsx"],
    testEnvironment: 'jest-environment-jsdom',  // v28以降は'jest-environment-jsdom'を指定する必要有
    transform: {
        '.*\\.(vue)$': '@vue/vue3-jest',
        '.*\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/resources/ts/$1',    // エイリアスパス'@/'を理解できるよう定義
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",  // メディアファイルを無視するように定義
    },
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],    // nodeをテスト環境で使うように指定
    },
    verbose: true,  // テストの詳細情報を表示する
}
```

3. メディアファイルを置き換えるためのモックを作成

```bash
mkdir resources/ts/__mocks__; \
touch resources/ts/__mocks__/fileMock.js; \
echo "module.exports = '';" >> resources/ts/__mocks__/fileMock.js
```

## Jestの実行コマンドを定義

[package.json](../package.json) のスクリプトに追記

```json
"scripts": {
    // ...
    "test": "jest" // 追加
},
```

## テストの実行

### tsファイル

1. テスト用ファイルの作成

```bash
touch resources/ts/foo.ts
touch resources/ts/foo.test.ts
```

1. テストを行うメソッドの記述

[foo.ts](../resources/ts/example/foo.ts) に以下の内容を記述

```ts
export const sum
  = (...a: number[]) =>
    a.reduce((acc, val) => acc + val, 0);
```

2. テストコードの記述

[foo.test.ts](../resources/ts/example/foo.test.ts) に以下の内容を記述

```ts
import { sum } from '@/foo';

test('basic', () => {
    expect(sum()).toBe(0);
});

test('basic again', () => {
    expect(sum(1, 2)).toBe(3);
});
```

3. テストの実行

```bash
sail npm run test
```

### SFC(.vue)ファイル

vueのセットアップで作成した [welcome.vue](../resources/ts/example/welcome.vue) を使用します。

1. テストファイルを作成

```bash
touch /resources/ts/welcome.spec.ts
```

2. テストコードの記述

[welcome.spec.ts](../resources/ts/example/welcome.spec.ts) に以下の内容を記述

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
