# 経理実務シミュレーター（Next.jsスターター）

## 概要
- Next.js 14 (App Router) + TypeScript + Tailwind
- API Routes で採点ロジックをサーバー側に分離
- MVP向けに**認証/DBなし**（すぐにVercelにデプロイ可能）

## ローカル実行
```bash
npm i
npm run dev
```

## デプロイ（Vercel）
1. GitHubにこのリポジトリをPush
2. Vercelで「Add New → Project → Import」
3. Build設定はデフォルト、環境変数は不要
4. 数分で `https://<project>.vercel.app` が発行されます

## 追加予定（次スプリント）
- Supabase Auth（メールリンク）
- PostgreSQL（Railway） + Prisma（User/Lesson/Submission）
- 企業共有用レポート（PDF）
- ケース自動生成（LLM連携）
