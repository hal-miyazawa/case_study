# Folder Guide

このファイルは、プロジェクトのフォルダ構成と「どこを編集すると何が変わるか」を確認するための案内です。

このアプリは React + TypeScript + Vite で作られた、防災対策をテーマにしたノベルゲーム風のデモです。

## 全体構成

```text
case_study/
├─ docs/
│  ├─ ai-api-setup.md
│  ├─ app-notes.md
│  ├─ folder-guide.md
│  ├─ git-workflow.md
│  ├─ project-plan.md
│  └─ story-flow.md
├─ public/
├─ src/
│  ├─ assets/
│  │  ├─ backgrounds/
│  │  │  ├─ news/
│  │  │  └─ shelter/
│  │  ├─ bgm/
│  │  └─ icons/
│  ├─ features/
│  │  └─ escape/
│  │     ├─ EscapeControls.tsx
│  │     ├─ escapeSteps.ts
│  │     ├─ types.ts
│  │     └─ useEscapeFlow.ts
│  ├─ screens/
│  │  ├─ Shop.css
│  │  └─ ShopScreen.tsx
│  ├─ App.css
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ package.json
├─ vite.config.ts
└─ tsconfig.json
```

## docs

`docs` は企画、作業メモ、開発ルールを置く場所です。画面には直接表示されません。

- `folder-guide.md`: このファイル。フォルダ構成の案内
- `story-flow.md`: ストーリー、画面、分岐のメモ
- `project-plan.md`: 企画全体のメモ
- `app-notes.md`: 実装状態や注意点のメモ
- `git-workflow.md`: Git 作業のメモ
- `ai-api-setup.md`: OpenAI API の確認方法と扱い方

## src/App.tsx

アプリ全体の中心です。

現在ここに残している主な役割:

- 大きな画面状態 `Screen`
- メインの画面遷移
- BGM / 効果音の切り替え
- 共通のテキストログ
- 共通のスマホ画面表示
- リュック画面
- 振り返り / 現実のあなたへ / 終了画面
- 各 feature / screen の呼び出し

今後は、脱出パートのように大きくなった処理から `src/features/` や `src/screens/` に切り出していく方針です。

## src/features

機能単位で分けたコードを置く場所です。

### features/escape

脱出パート専用の処理を置いています。

- `types.ts`: 脱出ステップの型定義
- `escapeSteps.ts`: 脱出画面ごとの背景、セリフ、次の行き先
- `useEscapeFlow.ts`: 現在の脱出ステップ、次へ進む処理、リセット処理
- `EscapeControls.tsx`: 脱出パート右側のスマホ / リュックアイコンUI

脱出パートの背景やセリフを変える場合は、まず `escapeSteps.ts` を見ます。

現在の脱出ルート:

```text
脱出画面
↓
脱出画面2
↓
脱出画面3
↓
安全道
↓
学校到着画面
↓
True End
```

脱出中は、スマホで避難場所を確認して閉じると次の脱出ステップへ進みます。

## src/screens

画面として独立しやすいものを置く場所です。

### screens/ShopScreen.tsx

ショップ画面です。

ここにある主な処理:

- 商品一覧
- 購入済み商品の売り切れ表示
- 購入確認モーダル
- ショップ背景のクリック切り替え

ショップ画面の見た目は `screens/Shop.css` を編集します。

## src/assets

画像や音声など、アプリで使う素材を置く場所です。

### assets/backgrounds

背景画像を置く場所です。

主な背景:

- `開始画面.png`
- `予告本画面.png`
- `通常部屋画面.png`
- `通常部屋画面夜.png`
- `ショップ画面.png`
- `リュック画面.png`
- `災害後画面.png`
- `脱出画面.png`
- `脱出画面2.png`
- `脱出画面3.png`
- `安全道.png`
- `学校到着画面.png`
- `BadEnd.png`
- `TrueEnd.png`

スマホ内ニュース画像は `assets/backgrounds/news/`、避難場所詳細の学校画像は `assets/backgrounds/shelter/` に置いています。

### assets/bgm

BGM と効果音を置く場所です。

例:

- `部屋_通常.mp3`
- `対策フェーズ.mp3`
- `ショップ.mp3`
- `ショップ購入音.mp3`
- `テキストボックスクリック音.mp3`
- `地震発生.mp3`
- `地響き.mp3`
- `脱出パートBGM.mp3`
- `脱出パートBGM2.mp3`
- `TRUEエンド.mp3`
- `BADエンド.mp3`

BGM の切り替えや効果音の再生タイミングは主に `App.tsx` で管理しています。

### assets/icons

UIアイコンを置く場所です。

例:

- `ショップicon.png`
- `スマホicon.png`
- `リュックicon.png`
- `対策icon.png`

## src/App.css

アプリ全体の見た目を決めるCSSです。

よく編集する場所:

| 変えたいもの | 主なCSS |
| --- | --- |
| 背景表示 | `.scene` |
| 地震の揺れ | `.scene.is-shaking`, `quake-background-shake`, `quake-ui-shake` |
| 暗転 / 画面遷移 | `.scene-transition`, `.transition-title` |
| 対策フェーズのヘッダー | `.phase-header` |
| 対策アイコン群 | `.action-icons`, `.action-icon-button` |
| 脱出パートのアイコン群 | `.escape-action-icons`, `.escape-icon-phone`, `.escape-icon-backpack` |
| スマホ画面 | `.phone-overlay`, `.phone-screen-shell`, `.phone-*` |
| リュック画面 | `.inventory-panel`, `.backpack-top-actions` |
| テキストログ | `.text-log-overlay`, `.text-log-panel`, `.text-log-body` |
| テキストボックス | `.message-box`, `.nameplate`, `.dialogue-text`, `.next-mark` |
| 振り返りモーダル | `.result-review-panel` |
| 現実のあなたへ | `.real-life-panel` |

## src/index.css

アプリ全体に共通する基本スタイルです。

主な内容:

- フォント指定
- body の余白削除
- ボタンのフォント継承
- テキスト選択防止
- 画像ドラッグ防止

## main.tsx

React アプリの入口です。
通常の画面作成では基本的に触りません。

## よくある編集場所

### 脱出パートの背景やセリフを変えたい

```text
src/features/escape/escapeSteps.ts
```

### 脱出パートの進行条件を変えたい

```text
src/features/escape/useEscapeFlow.ts
src/App.tsx
```

今はスマホで避難場所を確認して閉じると進む処理が `App.tsx` 側にあります。
今後、モバイルバッテリー分岐や水・食料ゲージを入れる場合は、`useEscapeFlow.ts` に寄せていく予定です。

### ショップの商品や購入処理を変えたい

```text
src/screens/ShopScreen.tsx
src/screens/Shop.css
```

### BGMや効果音を変えたい

```text
src/assets/bgm/
src/App.tsx
```

### スマホ内ニュースや避難場所画面を変えたい

```text
src/App.tsx
src/App.css
src/assets/backgrounds/news/
src/assets/backgrounds/shelter/
```

### 背景画像を追加したい

```text
src/assets/backgrounds/
```

画像を追加したら、使う場所の `.tsx` ファイルで import します。

例:

```tsx
import newBackground from './assets/backgrounds/example.png'
```

feature 内から使う場合は相対パスが変わります。

```tsx
import newBackground from '../../assets/backgrounds/example.png'
```

## 今後の整理方針

`App.tsx` がまだ大きいため、次の順番で切り出すと安全です。

1. スマホ画面を `features/phone/PhoneOverlay.tsx` に分離
2. リュック画面を `features/backpack/BackpackScreen.tsx` に分離
3. アイテム定義を `data/items.ts` に移動
4. セリフ定義を `data/dialogues.ts` に移動
5. BGM管理を `features/audio/` に分離

一度に全部分けるより、機能追加するタイミングで関連部分だけ切り出す方が安全です。
