# webpack で TypeScript を使用する方法　

参考サイト:https://ics.media/entry/16329/#webpack%2Btypescript%2B%E7%94%BB%E5%83%8F%E3%83%90%E3%83%B3%E3%83%89%E3%83%AB%E3%81%AE%E6%9C%80%E5%B0%8F%E6%A7%8B%E6%88%90

## 手順

1. npm モジュールのインストール
   「webpack」や「webpack-cli」と「typescript」など必要なモジュールをインストールしましょう。TypeScript を webpack で処理するために「ts-loader」をを利用します。

```
npm i -D webpack webpack-cli typescript ts-loader
```

2. TypeScript の設定ファイルを作成する。
   tsconfig.json のファイルをルートディレクトリに作成する。
   最低限の設定

```json
{
  "compilerOptions": {
    // ソースマップを有効化
    "sourceMap": true,
    // TSはECMAScript 5に変換
    "target": "ES5",
    // TSのモジュールはES Modulesとして出力
    "module": "ES2015",
    // 厳密モードとして設定
    "strict": true
  }
}
```

3. webpack に設定内容を記述する。
   webpack の設定ファイルには次のように記述します。

rules の部分で拡張子.ts には ts-loader を指定します
resolve.extensions に拡張子.ts を登録することで、TypeScript 内の import 文で拡張子を書く手間が省けます
webpack の import 文でコンパイルが通らないときは、resolve.extensions 配列の指定が漏れているケースが多いです。しっかりと記述しましょう

```js
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/ts/main.ts",

  // 出力の設定
  output: {
    // 出力先のパス（絶対パスを指定しないとエラーが出るので注意）
    // `__dirname + public`のように書くと、OS によって
    // パスが異なってしまうことがあるので、必ず`path`モジュールを利用する。
    path: path.resolve(__dirname, "public"),
    // 出力するファイル名
    filename: "js/bundle.js",
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [".ts", ".js"],
  },
};
```

以上で設定は完了なので、webpack を実行しビルドを行う
