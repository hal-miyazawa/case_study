# Folder Guide

このファイルは、このフォルダ全体の中身を初めて見る人向けに説明したものです。
「どのファイルが何をしているか」「どこを編集すると画面の何が変わるか」をざっくり理解するための案内です。

## 全体の構成

このプロジェクトは、React + TypeScript + Vite で作られたフロントエンドアプリです。
今の段階では、防災・災害予防をテーマにした会話ノベル風の1画面デモになっています。

主なフォルダとファイルは次の通りです。

```text
case_study/
├─ docs/
│  ├─ app-notes.md
│  ├─ folder-guide.md
│  ├─ project-plan.md
│  └─ story-flow.md
├─ public/
│  ├─ favicon.svg
│  └─ icons.svg
├─ src/
│  ├─ assets/
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ App.css
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ dist/
├─ node_modules/
├─ index.html
├─ package.json
├─ package-lock.json
├─ vite.config.ts
└─ tsconfig.json
```

## docs の中身

`docs` は、アプリの企画や作業メモを置く場所です。
画面には直接表示されません。

### app-notes.md

このアプリの現在の状態をまとめたメモです。
どんな技術を使っているか、主要ファイルが何か、今の実装がどうなっているかが書かれています。

### project-plan.md

アプリ全体の企画書です。
防災ケーススタディとしてどんな体験にしたいか、ゲームの流れ、分岐、エンディング案、追加したい機能などが書かれています。

### story-flow.md

ストーリーの流れを詳しく書いた資料です。
どの画面で何が起きるか、選択肢によってどう分岐するか、最小版ではどんな判定にするかが書かれています。

### folder-guide.md

このファイルです。
フォルダ全体と、編集する場所の見方を説明しています。

## public の中身

`public` は、アプリからそのまま使える静的ファイルを置く場所です。
画像やアイコンなど、加工せずに配信したいファイルを入れます。

### favicon.svg

ブラウザのタブなどに表示されるアイコンです。
タブの小さいマークを変えたい場合は、このファイルを差し替えます。

### icons.svg

SVG アイコンをまとめたファイルです。
今後、画面内でアイコンを使うときの素材置き場として使えます。

## src の中身

`src` は、実際のアプリ画面を作っている中心部分です。
今の画面を変えたい場合は、基本的に `src` の中を編集します。

### main.tsx

React アプリの入口です。

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

このコードは、`index.html` にある `root` という場所へ `App` を表示する、という意味です。
普段の画面編集では、ここを触ることはあまりありません。

### App.tsx

今のアプリのメイン画面です。
セリフ、選択肢、クリックしたときの動きはここに書かれています。

今の `App.tsx` には、主に次の役割があります。

- `dialogues` にセリフの一覧を書く
- `useState` で、今どのセリフを表示しているかを覚える
- 最後のセリフまで進んだら選択肢を出す
- 選択肢を押したら、選んだ内容を表示する
- もう一度クリックしたら最初に戻る

たとえば、セリフを変えたい場合は `dialogues` の中を編集します。

```tsx
const dialogues: Dialogue[] = [
  {
    speaker: '主人公',
    text: '……今の夢、なんだったんだ。',
  },
]
```

`speaker` は名前欄に出る文字です。
`text` は黒いメッセージボックスに出る本文です。

選択肢の文字を変えたい場合は、次のような部分を編集します。

```tsx
onClick={() => handleSelectChoice('買い物に行く')}
```

ボタンに表示される文字も近くにあります。

```tsx
買い物に行く
```

選択肢の数を増やしたい場合も `App.tsx` を編集します。
ただし、数を増やすとボタン配置の調整が必要になることがあるので、その場合は `App.css` も一緒に確認します。

### App.css

`App.tsx` の見た目を決めているファイルです。
背景、部屋の家具、主人公、選択肢ボタン、メッセージボックスなどの見た目はここで調整します。

よく編集する場所は次の通りです。

| 変えたいもの | 編集する CSS |
| --- | --- |
| 画面全体の背景色 | `.game-screen` |
| 部屋の背景 | `.scene` |
| ランプ | `.lamp` |
| 時計 | `.clock` |
| ドア | `.door` |
| 窓 | `.window` |
| テレビ | `.tv` |
| テーブル | `.table` |
| 主人公 | `.character` |
| 植物 | `.plant`, `.plant-left`, `.plant-right` |
| 選択肢ボタン | `.choice-button` |
| 選択肢の置き場所 | `.choice-layer` |
| 黒いメッセージボックス | `.message-box` |
| 名前欄 | `.nameplate` |
| セリフ本文 | `.dialogue-text` |
| 右下の次へマーク | `.next-mark` |
| スマホ表示の調整 | `@media (max-width: 780px)` |

たとえば、黒いメッセージボックスの色を変えたい場合は `.message-box` の `background` を変えます。

```css
.message-box {
  background: #050505;
}
```

選択肢ボタンを大きくしたい場合は `.choice-button` の `min-height` や `padding` を変えます。

```css
.choice-button {
  min-height: 18vh;
  padding: 24px 44px;
}
```

スマホだけ見た目を変えたい場合は、下の方にある `@media (max-width: 780px)` の中を編集します。

### index.css

アプリ全体に共通する基本スタイルです。
フォント、背景、body の余白、button の文字設定などがあります。

今の内容では、次のようなことをしています。

- アプリ全体のフォントを決める
- body の余白を消す
- ボタンの文字が周囲と同じフォントになるようにする
- `#root` が画面の高さを持つようにする

アプリ全体の文字の雰囲気を変えたい場合は、ここを見ます。
ただし、特定のボタンやメッセージボックスだけを変えたい場合は `App.css` を編集します。

### assets

画像や SVG など、アプリ内で読み込む素材を置く場所です。

今は次のファイルがあります。

- `hero.png`
- `react.svg`
- `vite.svg`

今の `App.tsx` では、これらの画像は直接使われていません。
今後、背景画像やキャラクター画像を使いたい場合は、`src/assets` に入れて `App.tsx` から読み込む形にできます。

## src のどこを編集すると何が変わるか

初心者の場合は、まず次のように考えると分かりやすいです。

### セリフを変えたい

編集するファイル:

```text
src/App.tsx
```

見る場所:

```tsx
const dialogues: Dialogue[] = [
```

`speaker` を変えると名前欄が変わります。
`text` を変えるとセリフ本文が変わります。

### 選択肢の文字を変えたい

編集するファイル:

```text
src/App.tsx
```

見る場所:

```tsx
handleSelectChoice('買い物に行く')
```

ボタンに表示されている文字と、選択後に表示される文字の両方を確認します。

### 選択肢を増やしたい

編集するファイル:

```text
src/App.tsx
src/App.css
```

まず `App.tsx` でボタンを追加します。
そのあと、ボタンがきれいに並ばない場合は `App.css` の `.choice-layer` や `.choice-button` を調整します。

### 背景や部屋の見た目を変えたい

編集するファイル:

```text
src/App.css
```

背景色なら `.game-screen` や `.scene` を見ます。
家具の位置や大きさなら `.door`、`.window`、`.tv`、`.table` などを見ます。

### 主人公の位置や大きさを変えたい

編集するファイル:

```text
src/App.css
```

見る場所:

```css
.character {
```

`right` や `bottom` を変えると位置が変わります。
`width` や `height` を変えると大きさが変わります。

### メッセージボックスの見た目を変えたい

編集するファイル:

```text
src/App.css
```

見る場所:

```css
.message-box {
```

黒いボックス自体を変えるなら `.message-box`。
名前欄を変えるなら `.nameplate`。
セリフ本文を変えるなら `.dialogue-text`。
右下のマークを変えるなら `.next-mark` を見ます。

### 画面全体のフォントを変えたい

編集するファイル:

```text
src/index.css
```

見る場所:

```css
:root {
  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
}
```

全体に効く設定なので、変えるとアプリ全体の文字に影響します。

### スマホ表示を直したい

編集するファイル:

```text
src/App.css
```

見る場所:

```css
@media (max-width: 780px) {
```

この中に書かれている設定は、画面幅が 780px 以下のときに使われます。
スマホでボタンが大きすぎる、文字がはみ出る、配置がずれる、という場合はここを確認します。

## そのほかのファイル

### index.html

ブラウザが最初に読む HTML ファイルです。
React アプリを表示するための `root` があります。
通常の画面編集ではあまり触りません。

### package.json

プロジェクトの設定と、使っているライブラリ、実行コマンドが書かれています。

よく使うコマンドは次の通りです。

```bash
npm run dev
npm run build
npm run lint
```

### package-lock.json

インストールされたライブラリの正確なバージョン情報です。
基本的に手で編集しません。

### node_modules

インストールされたライブラリ本体が入っています。
基本的に手で編集しません。

### dist

ビルド後のファイルが入る場所です。
`npm run build` を実行すると作られます。
基本的に手で編集しません。

### vite.config.ts

Vite の設定ファイルです。
開発サーバーやビルドの設定を変えたいときに使います。
今の段階では、触ることは少ないです。

### tsconfig.json / tsconfig.app.json / tsconfig.node.json

TypeScript の設定ファイルです。
今の段階では、触ることは少ないです。

### eslint.config.js

コードの書き方をチェックする ESLint の設定ファイルです。
今の段階では、触ることは少ないです。

## 初心者向けの編集順

最初は、次の順番で触ると理解しやすいです。

1. `src/App.tsx` の `dialogues` を編集して、セリフを変える
2. `src/App.tsx` の選択肢ボタンの文字を変える
3. `src/App.css` の `.message-box` や `.choice-button` を編集して見た目を変える
4. `src/App.css` の `.character` や `.tv` を編集して、部屋の配置を変える
5. 画面が崩れたら `@media (max-width: 780px)` も確認する

最初から `main.tsx`、`vite.config.ts`、`tsconfig` 系を触る必要はほとんどありません。
画面の内容や見た目を変えたい場合は、まず `App.tsx` と `App.css` を見れば大丈夫です。
