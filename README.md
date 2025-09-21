# CorpMap

CorpMap は e-Stat の企業統計を Next.js + React + Apache ECharts で可視化するデモフロントエンドです。Feature-Sliced Design を採用し、都道府県別の Choropleth とドリルダウンチャートを提供します。

## スタック

- Next.js (App Router) + React + TypeScript (strict)
- Tailwind CSS / カスタムダークテーマ
- Apache ECharts (React wrapper)
- Zustand（フィルタストア）
- Zod（API レスポンス検証）
- ESLint + Prettier + import sort
- Vitest（オプション生成の単体テスト想定）
- Storybook 互換モード（`/storybook` ルート）

## セットアップ

1. 依存関係をインストールします。

   ```bash
   npm install
   ```

   > この環境では npm レジストリへのアクセスが制限されているため、必要に応じてローカル環境でインストールしてください。

2. 環境変数を設定します。`ESTAT_APP_ID` に e-Stat のアプリケーション ID を指定してください。

   ```bash
   cp .env.example .env.local
   ```

3. 開発サーバーを起動します。

   ```bash
   npm run dev
   ```

   ブラウザで `http://localhost:3000` を開くと Choropleth とフィルタ UI が表示されます。

4. Storybook 互換ビュー（Next.js 上に構築）を利用する場合は以下を実行し、`http://localhost:6006/storybook` を開いてください。

   ```bash
   npm run storybook
   ```

## FSD レイヤ構造

```
app → processes → pages → widgets → features → entities → shared
```

- **shared**: API クライアント、ECharts オプション生成、UI コンポーネント、テーマ。
- **entities**: 企業統計ドメイン型、フォーマッタ。
- **features**: フィルタストアと UI（Zustand）。
- **widgets**: 地図パネル、詳細パネルなど複合 UI。
- **pages**: `overview` ページが widgets / features を組み合わせて画面を構築。
- **app**: Next.js App Router のエントリとプロバイダ。

各スライスは `index.ts` を公開 API とし、上位レイヤのみを参照できます。ESLint の boundaries ルールで層違反を検出します。

## モックデータ

`public/mock` ディレクトリに Choropleth と詳細チャート用の JSON を配置しています。`ESTAT_APP_ID` が未設定の場合は自動的にモックを利用します。

## テスト・フォーマット

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run format`

> テスト・Lint 実行には依存関係のインストールが必要です。

## 拡張方針

- e-Stat API の本番データ接続 (`ESTAT_APP_ID` 設定時)
- TanStack Query 等によるデータキャッシュ導入
- Storybook 本体の導入（ネットワーク制限がない環境で）
- Lighthouse 自動計測のセットアップ
- 地図の GeoJSON をローカルバンドルし、オフラインでも動作可能にする
