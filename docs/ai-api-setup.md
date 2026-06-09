# AI API Setup

このファイルは、ChatGPT / OpenAI API 連携をチームで確認するための説明です。

## 今の実装の状態

現在のアプリでは、選択肢を押すと `/api/ai-scene` にリクエストを送り、AI から返ってきた文章を画面のメッセージボックスに表示します。

API キーがある場合とない場合で動きが変わります。

| 状態 | 動き |
| --- | --- |
| `OPENAI_API_KEY` あり | OpenAI API に通信して、ChatGPT が文章と選択肢を生成する |
| `OPENAI_API_KEY` なし | OpenAI API には通信せず、固定のモック文章を返す |

そのため、API キーを持っていない人でも画面や UI の確認はできます。
本物の AI 応答を確認したい人だけ、自分の API キーを設定します。

## API キーの扱い

API キーは絶対に Git に入れないでください。

やってはいけないこと:

```text
App.tsx に API キーを書く
vite.config.ts に API キーを書く
README や docs に API キーを書く
GitHub に API キーを push する
Discord や LINE にそのまま貼る
```

各自の PC の PowerShell で、一時的に環境変数として設定します。

## API キーありで確認する方法

PowerShell でプロジェクトのフォルダへ移動します。

```powershell
cd C:\work\disaster_prevention\case_study
```

自分の API キーを環境変数に入れます。

```powershell
$env:OPENAI_API_KEY="自分のAPIキー"
```

必要ならモデルも指定できます。

```powershell
$env:OPENAI_MODEL="gpt-5.2"
```

そのあと、開発サーバーを起動します。

```powershell
npm run dev
```

ブラウザで開きます。

```text
http://127.0.0.1:5173
```

画面のセリフを進めて、最後の選択肢を押します。

```text
買い物に行く
大声で周りに伝える
```

どちらかを押したあと、黒いメッセージボックスに AI の文章が表示されれば成功です。

## API キーなしで確認する方法

API キーを設定せずに、そのまま起動します。

```powershell
npm run dev
```

この場合、OpenAI API には通信せず、固定のモック文章が返ります。

API キーなしでも確認できること:

- 画面が表示されるか
- 選択肢を押せるか
- AI 応答用の文章表示エリアが動くか
- AI が返した想定の選択肢チップが表示されるか
- CSS や UI が崩れていないか

API キーなしでは確認しにくいこと:

- 本物の AI が自然な文章を返すか
- プロンプトの指示が効いているか
- 買ったものに応じて AI の文章が変わるか
- AI が想定外の JSON を返さないか

## 直接 API をテストする方法

`npm run dev` を起動したまま、別の PowerShell で次を実行します。

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:5173/api/ai-scene `
  -Method Post `
  -ContentType 'application/json; charset=utf-8' `
  -Body '{"selectedAction":{"actionId":"go_shop","label":"買い物に行く"},"purchasedItems":["飲料水","懐中電灯","家具固定器具"],"availableActions":["fix_furniture","pack_water","charge_battery","contact_family","check_shelter"]}' |
  ConvertTo-Json -Depth 5
```

成功すると、次のような形の JSON が返ります。

```json
{
  "speaker": "主人公",
  "message": "買ってきた防災グッズを床に並べた。",
  "choices": [
    {
      "actionId": "fix_furniture",
      "label": "家具固定器具で棚を固定する"
    }
  ]
}
```

PowerShell 上で日本語が文字化けする場合があります。
その場合でも、ブラウザでは正常に表示されることがあります。

見やすくしたい場合は、先に次を実行します。

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
```

## 環境変数を入れるタイミング

重要なのは、API キーを設定してから `npm run dev` を起動することです。

正しい順番:

```powershell
$env:OPENAI_API_KEY="自分のAPIキー"
npm run dev
```

すでに `npm run dev` を起動している状態であとから API キーを入れても、起動済みのサーバーには反映されません。
その場合は、一度サーバーを止めてから起動し直します。

## チームでの使い分け

おすすめの分担は次の通りです。

```text
API キーなしの人:
UI、CSS、ショップ画面、固定データ、ドキュメントを確認する

API キーありの人:
本物の AI 応答、プロンプト、分岐文章、JSON の形を確認する
```

今の実装では、API キーなしでもモックで動くため、全員が課金する必要はありません。

## 公開するときの注意

今の `/api/ai-scene` は、Vite の開発サーバー上で動く確認用 API です。

静的サイトとして GitHub Pages などに公開するだけでは、本物の OpenAI API 連携は動きません。

本物の AI 応答を利用者に見せたい場合は、サーバー側に API キーを置ける公開方法が必要です。

例:

```text
Vercel
Netlify Functions
Render
Railway
自前の Node サーバー
```

公開時の流れ:

```text
利用者のブラウザ
↓
公開した Web アプリ
↓
サーバー側 API
↓
OpenAI API
↓
AI の返答を画面に表示
```

公開時も、API キーをブラウザ側に置いてはいけません。
API キーは公開先サービスの環境変数に設定します。

## 今の段階での方針

今はまだゲーム本体の仕様を作っている段階なので、本格的なサーバーを別で立てる必要はありません。

今の方針:

```text
ローカル開発:
Vite の開発用 API を使う

API キーあり:
本物の OpenAI API で確認する

API キーなし:
モック応答で確認する
```

ショップ、購入アイテム、分岐、エンディング判定が固まってから、公開用のサーバー構成を考えます。
