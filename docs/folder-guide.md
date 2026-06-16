# Folder Guide

このファイルは、このフォルダ全体の中身を初めて見る人向けに説明したものです。
「どのファイルが何をしているか」「どこを編集すると画面の何が変わるか」をざっくり理解するための案内です。

## 全体の構成

このプロジェクトは、React + TypeScript + Vite で作られたフロントエンドアプリです。
現在は、地震が起こる前に防災対策を選ぶノベルゲーム風のデモです。

主な構成は次の通りです。

```text
case_study/
├─ docs/
│  ├─ ai-api-setup.md
│  ├─ app-notes.md
│  ├─ folder-guide.md
│  ├─ project-plan.md
│  └─ story-flow.md
├─ public/
│  ├─ favicon.svg
│  └─ icons.svg
├─ src/
│  ├─ assets/
│  │  ├─ backgrounds/
│  │  └─ icons/
│  ├─ App.css
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ index.html
├─ package.json
├─ package-lock.json
├─ vite.config.ts
└─ tsconfig.json
```

## docs の中身

`docs` は、企画や作業メモを置く場所です。
画面には直接表示されません。

- `app-notes.md`: 現在の実装状態のメモ
- `story-flow.md`: ストーリー、画面、分岐、AI活用方針
- `project-plan.md`: 企画全体のメモ
- `folder-guide.md`: このファイル
- `ai-api-setup.md`: OpenAI API の確認方法とチームでの扱い方

## public の中身

`public` は、ブラウザからそのまま参照する静的ファイルを置く場所です。

- `favicon.svg`: ブラウザタブのアイコン
- `icons.svg`: SVG アイコンスプライト

通常のゲーム背景やボタン用アイコンは、`public` ではなく `src/assets` に置きます。

## src の中身

`src` は、実際のアプリ画面を作っている中心部分です。

### main.tsx

React アプリの入口です。
基本的に画面を作る作業では触りません。

### App.tsx

現在のメイン実装です。

ここに書かれている主なもの:

- 画面状態 `Screen`
- 予告本画面のセリフ
- 通常部屋画面の導入セリフ
- 対策フェーズの表示
- ショップ / リュックアイコン
- リュック画面への遷移
- リュック画面の仮アイテム一覧
- アイテムホバー時の説明表示
- アイテムクリック時の `はい` / `いいえ`
- テキストログ
- UI非表示ボタン

今の画面遷移は次の流れです。

```text
予告本画面
↓
通常部屋画面
↓
-対策フェーズ開始-
↓
対策フェーズ
↓
リュック画面
```

### App.css

`App.tsx` の見た目を決めているファイルです。

よく編集する場所:

| 変えたいもの | 編集するCSS |
| --- | --- |
| 背景の表示方法 | `.scene` |
| 暗転演出 | `.scene-transition`, `.transition-title` |
| 左上の対策フェーズ表示 | `.phase-hud` |
| 右上の残り日数 | `.day-counter` |
| ショップ / リュックアイコン | `.action-icons`, `.action-icon-button` |
| テキストログ / UI非表示ボタン | `.log-toggle`, `.ui-toggle` |
| リュック画面の戻るボタン | `.backpack-top-actions`, `.back-button` |
| リュックのアイテム一覧 | `.inventory-panel` |
| アイテムの行 | `.inventory-panel li button` |
| アイテム用アイコン枠 | `.item-icon-slot` |
| はい / いいえ | `.confirm-actions` |
| テキストログ画面 | `.text-log-overlay`, `.text-log-panel`, `.text-log-body` |
| テキストボックス | `.message-box` |
| 名前欄 | `.nameplate` |
| セリフ本文 | `.dialogue-text` |
| 次へマーク | `.next-mark` |

今はスマホ用の `@media` は一旦削除しています。
デスクトップ画面を優先して調整中です。

### index.css

アプリ全体に共通する基本スタイルです。

現在は次のような設定があります。

- フォント指定
- body の余白削除
- ボタンのフォント継承
- テキスト選択防止
- 画像ドラッグ防止

長押しやドラッグで文字や画像が青く選択されないようにする設定もここにあります。

## assets の中身

### backgrounds

画面背景画像を置く場所です。

現在ある主な背景:

- `予告本画面.png`
- `通常部屋画面.png`
- `リュック画面.png`
- `ショップ画面.png`
- `災害後画面.png`
- `BadEnd.png`
- `TrueEnd.png`

背景を追加したら、基本的には `src/App.tsx` で import して使います。

例:

```tsx
import shopBackground from './assets/backgrounds/ショップ画面.png'
```

### icons

自由行動フェーズなどで使う UI アイコンを置く場所です。

現在あるアイコン:

- `ショップicon.png`
- `リュックicon.png`
- `item.png`

アイコンを追加したら、`src/App.tsx` で import してボタン画像として使います。

## どこを編集すると何が変わるか

### セリフを変えたい

編集するファイル:

```text
src/App.tsx
```

見る場所:

- `bookWarningDialogues`
- `roomIntroDialogues`
- `roomDialogue`

### 画面を増やしたい

編集するファイル:

```text
src/App.tsx
src/App.css
```

`Screen` 型に画面名を追加し、背景画像を import して、表示条件を追加します。

### 背景画像を差し替えたい

編集する場所:

```text
src/assets/backgrounds/
src/App.tsx
```

画像ファイルを `backgrounds` に置き、`App.tsx` の import を変えます。

### UIの位置や大きさを変えたい

編集するファイル:

```text
src/App.css
```

例:

- テキストボックス位置: `.message-box`
- ログ/UIボタン位置: `.log-toggle`, `.ui-toggle`
- ショップ/リュック位置: `.action-icons`
- リュック一覧位置: `.inventory-panel`

### リュックのアイテムを変えたい

編集するファイル:

```text
src/App.tsx
```

見る場所:

```tsx
const backpackItems = [
```

今は仮で18項目すべてを表示しています。
今後はショップで購入したアイテムだけを表示する形に変える想定です。

### テキストログを変えたい

編集するファイル:

```text
src/App.tsx
src/App.css
```

ログに追加する処理は `addDialogueLog`。
見た目は `.text-log-*` のCSSです。

### AI連携を確認したい

見るファイル:

```text
docs/ai-api-setup.md
vite.config.ts
```

今はショップ到達前まではAIを使わない方針ですが、開発用API `/api/ai-scene` は残っています。

## 触る頻度が低いファイル

- `src/main.tsx`: React の起動部分
- `index.html`: HTML の土台
- `vite.config.ts`: Vite 設定と開発用API
- `tsconfig*.json`: TypeScript 設定
- `eslint.config.js`: ESLint設定
- `package-lock.json`: 依存関係の固定情報

通常の画面作成では、まず `App.tsx`、`App.css`、`src/assets` を見れば大丈夫です。
