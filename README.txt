# 経理ラボベース – v1.2（データ外部化＋管理画面）
- `index.html` … トップ
- `app.html` … 学習アプリ（`lessons.json` を読み込む設計）
- `admin.html` … ブラウザだけでレッスンJSONを編集→ダウンロード
- `lessons.json` … レッスンデータ（ここを差し替えるだけで内容更新）
- `assets/` … ロゴ・ファビコン

## 公開手順
1. このZIPを解凍し、`index.html` `app.html` `admin.html` `lessons.json` `assets/` を **Upload files** でまとめてアップ → Commit
2. 以降は `lessons.json` を入れ替えるだけでコンテンツ更新可能（コード変更不要）

## 編集の流れ（ノーコード）
1. `/admin.html` を開く → 現在の `lessons.json` を読み込み
2. 編集 → **検証** → **ダウンロード**
3. GitHubで `lessons.json` を上書きアップロード

公開URL例：
- トップ … https://yoursite.github.io/
- 学習 … https://yoursite.github.io/app.html
- 管理 … https://yoursite.github.io/admin.html
