# 実行順番

1. プロジェクトの設定情報が記述された package.json ファイルを生成する
2. webpack をインストールする
3. 外部モジュール（サードパーティのモジュール）をインストールする
4. webpack を npm scripts で実行できるようにする
5. webpack の設定ファイル（webpack.config.js）を作成する
6. モジュールを作成する
7. エントリーポイントを作成し、モジュールを読み込む
8. webpack を実行してモジュールをバンドルしたファイルを出力する
9. 出力したファイルが動作しているか確認

## 手順

1. package.json ファイルを作成する
   以下のコマンドを実行し npm プロジェクトの初期構築を行う

```
npm init
```

2. webpack をインストール
   webpack を利用するためには、webpack と webpack-cli というパッケージが必要ですので、それらをインストールする。

```
npm install --save-dev webpack webpack-cli
```

3. 外部モジュール（サードパーティのモジュール）をインストール

今回、外部モジュールは jquery を利用すると仮定

```
npm install --save jquery
```

4. webpack を npm scripts で実行できるようにする

npm scripts を利用するためには、package.json の scripts フィールドに webpack コマンドを追加する

```
"build":"webpack"
```

今回は webpack コマンドだけを実行するようにしましたが、次のようにオプションがついたコマンドも指定できます。

```
{
  "scripts": {
    "dev": "webpack --mode development --watch --hide-modules"
  }
}
```

5. webpack の設定ファイル（webpack.config.js）を作成する

エントリーポイントや出力の設定をしたいため、webpack.config.js という設定ファイルを作成します。

今回の設定は次の通りです。

```js
// Node.js に組み込まれているモジュール。出力先などの指定をするために利用する。
const path = require("path");

module.exports = {
  // モード
  mode: "development",
  // エントリーポイント
  entry: "./src/js/app.js",
  // 出力の設定
  output: {
    // 出力先のパス（絶対パスを指定しないとエラーが出るので注意）
    // `__dirname + public`のように書くと、OS によって
    // パスが異なってしまうことがあるので、必ず`path`モジュールを利用する。
    path: path.resolve(__dirname, "public"),
    // 出力するファイル名
    filename: "js/bundle.js",
  },
};
```

##### mode

webpack のモードを指定します。

'development'、'production'、'none'のいずれかのモードを指定します。

選択したモードによって webpack の動作が異なります。

'development'にすれば、ソースマップを生成したり再ビルド時間を短縮するなど設定が有効になるため、開発時にはこちらのモードを利用します。

また、'production'にすれば、ファイルの圧縮や、モジュールの最適化などの設定が有効になるため、本番用のファイルの出力にはこちらのモードを利用します。

今回は開発用のモードである 'development'を指定します。

モードを指定しないと webpack を実行時に警告が出るため、必ず指定してください。

##### entry

エントリーポイントを指定します。

今回指定している./src/js/app.js は後ほど追加します。

##### output

ファイルの出力先や出力するファイル名など、出力に関する指定をします。

output.path には絶対パスを指定をしないとエラーが発生するため、path モジュールを利用して絶対パスを指定してください。

今回の設定だと public/js ディレクトリに bundle.js が出力されます。

6. モジュールを作成する

src/js/modules/math.js というモジュールを作成し、２つの関数を定義します。

今回、これらの関数をエントリーポイントで利用できるようにしたいので、次のように function の前に export 文を記述します。

```js
export function add(number1, number2) {
  return number1 + number2;
}

export function subtract(number1, number2) {
  return number1 - number2;
}
```

7. エントリーポイントを作成し、モジュールを読み込む

jquery と src/js/modules/math.js をインポートして利用する src/js/app.js というエントリーポイントを作成します。

モジュールを読み込むには import 文を利用します。

```js
import $ from "jquery";
import { add, subtract } from "./modules/math";

const item1Price = 400;
const item2Price = 600;
const coupon = 300;
const totalPrice = add(item1Price, item2Price);
const priceAfterApplyCoupon = subtract(totalPrice, coupon);

$("body").text(priceAfterApplyCoupon);
```

8. webpack を実行してモジュールをバンドルしたファイルを出力する

今回、npm scripts を利用するため、次のコマンドで webpack を実行します。

```
npm run build
```

9. 出力されたファイルの動作確認
   出力された public/js/bundle.js が動作しているか確認するために、それを読み込む public/index.html を作成し、ブラウザで開きます。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>getting started webpack</title>
  </head>
  <body>
    <script src="js/bundle.js"></script>
  </body>
</html>
```
