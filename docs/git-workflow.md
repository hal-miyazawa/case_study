# Git Workflow

チーム制作で作業するときの、基本的な Git 操作メモです。

基本的には `develop` ブランチで作業します。

## 作業開始前

まず `develop` ブランチに移動します。

```bash
git checkout develop
```

今どのブランチにいるか確認します。

```bash
git branch
```

`develop` の左に `*` が付いていればOKです。

```text
* develop
  main
```

## 最新状態を取り込む

作業を始める前に、必ず最新の `develop` を取り込みます。

```bash
git pull origin develop
```

これは重要です。
古い状態のまま作業すると、他の人の変更とずれたり、競合しやすくなります。

過去のコミット内容を確認したいときは、次を使います。

```bash
git log --oneline
```

見やすくブランチの流れも確認したい場合は、これも使えます。

```bash
git log --oneline --graph --all
```

## コード編集

VSCode で `case_study` フォルダを開きます。

```text
case_study
```

必要なファイルを編集します。

作業前に、誰がどのファイルを触るかチーム内で共有しておくと安全です。

例:

```text
Aさん: src/App.tsx
Bさん: src/App.css
Cさん: src/assets/backgrounds/
Dさん: docs/
```

同じファイルを複数人で触る場合は、どの部分を触るかも共有してください。

## 起動

開発サーバーを起動します。

```bash
npm run dev
```

成功すると、ターミナルに次のような表示が出ます。

```text
Local: http://localhost:5173/
```

ブラウザで開きます。

```text
http://localhost:5173/
```

環境によっては、次のURLで表示されることもあります。

```text
http://127.0.0.1:5173/
```

## 作業完了後

変更したファイルを確認します。

```bash
git status
```

ここで、変なファイルをいじっていないか確認してください。

よく見るポイント:

- 自分が編集したファイルだけが出ているか
- `node_modules` が入っていないか
- 不要な画像や一時ファイルが入っていないか
- `.env` や `.env.local` が入っていないか

## 変更を追加

問題なければ変更を追加します。

```bash
git add .
```

特定のファイルだけ追加したい場合は、次のようにもできます。

```bash
git add src/App.tsx
```

## コミット

コミットします。

`""` の中に、何を変更したかを書きます。

```bash
git commit -m "ショップ画面作成"
```

例:

```bash
git commit -m "リュック画面のアイテム一覧を追加"
git commit -m "対策フェーズのUIを調整"
git commit -m "docsを更新"
```

## GitHubへ送信

`develop` に送信します。

```bash
git push origin develop
```

これで GitHub 上の `develop` に自分のコミットが反映されます。

## よくある確認

### Everything up-to-date と出る

これは「送る新しいコミットがない」という意味です。

原因として多いのは、まだコミットしていないことです。

確認:

```bash
git status
git log --oneline -5
```

`git status` で `Changes to be committed` や `modified` が出ているなら、まだ作業内容がコミットされていません。

```bash
git add .
git commit -m "変更内容"
git push origin develop
```

### 今いるブランチを確認したい

```bash
git branch
```

または、現在のブランチ名だけ見たい場合:

```bash
git branch --show-current
```

### 変更内容を確認したい

```bash
git diff
```

`git add` した後の差分を確認したい場合:

```bash
git diff --staged
```

## 基本の流れまとめ

```bash
git checkout develop
git branch
git pull origin develop

npm run dev

git status
git add .
git commit -m "変更内容"
git push origin develop
```

## 注意

- APIキーや秘密情報は絶対に Git に入れない
- `.env` や `.env.local` はコミットしない
- 作業前に必ず `git pull origin develop`
- 作業後に必ず `git status`
- 自分が触っていないファイルが変更されていたら、勝手に戻さずチームに確認する
