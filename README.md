# Poker Rating Bot v3

## 使い方
サーバー内で`help`コマンドを実行してください。

## configについて
```json:application-settings.json
{
  "commandPrefix": "./", 
  "permittedRole": "admin",
  "initialRate": 1500,
  "baseWeightedCoefficient": 4,
  "stackWeightedCoefficient": 1.5,
  "rateIgnoreingGameCount": 3
}
```
- `commandPrefix`: コマンドの頭に付ける記号です。複数文字も設定できます。
- `permittedRole`: 権限が必要なコマンドを実行できるロールです。完全一致する必要があります。
- `initialRate`: 初期レートです。この値から補正期間を挟みレートが決定します。
- `baseWeightedCoefficient`: レート変動値にかける係数です。詳しくは後述します。
- `stackWeightedCoefficient`: 初期スタックとレート変動値の関係を決定する係数です。詳しくは後述します。
- `rateIgnoreingGameCount`: 補正期間となるゲーム数です。初回からこの回数までは他の人のレートに影響を与えません。（補正期間のプレイヤー同士でのレート変動は発生します。）

## レート計算式
レートには拡張イロレーティングが適用されます。
n人が参加したゲームの場合、1位 vs 2位、1位 vs 3位、1位 vs 4位、…… n-1位 vs n位、全ての組み合わせについて上位者を勝者とし、それぞれでレート変動値を求め、全て加算して小数点以下を丸めた値を新たなレートとします。レート変動値は以下の式で計算されます。
```ts
const calculateDiff = (calc: Calculate): number => {
  const baseDiff =
    1 / (1 + Math.pow(10, (calc.winnerRate - calc.loserRate) / 400));
  return (
    baseDiff *
    BaseWeightedCoefficient *
    Math.pow(log100(calc.stack), StackWeightedCoefficient)
  );
};
```
