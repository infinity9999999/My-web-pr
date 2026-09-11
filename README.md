# My Web Proxy

個人で管理する簡易Webプロキシのサンプルです。

## 構成

- `index.html` → GitHub Pagesに置く画面
- `worker.js` → Cloudflare Workersに置く中継サーバー

## 使い方

1. このフォルダをGitHubリポジトリにアップロード。
2. GitHub Pagesを有効化。
3. `worker.js` をCloudflare Workersへデプロイ。
4. `index.html` の

```js
const PROXY = "https://YOUR-WORKER.workers.dev/";
```

を自分のWorker URLに変更。
5. GitHubへpush。

注意：これは学習・個人管理用の最小構成です。公開プロキシとして無制限に運用すると、第三者による悪用やサーバー負荷につながるため、認証・アクセス制限・レート制限などを追加してください。
