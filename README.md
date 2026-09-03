# 津フォーブルⅢ 月極駐車場 LP

静的HTML/CSS/JSのみで構成された1ページLP。GitHub Pagesでの公開を想定。

## 公開前にやること

1. **写真を `images/` に配置**（現在プレースホルダーなし。以下のファイル名で配置すればそのまま表示される）
   - `parking-main.jpg` … 駐車場全景（ファーストビュー背景 兼 ギャラリー1枚目）
   - `parking-01.jpg` … 道路側から見た入口
   - `parking-02.jpg` … 区画の様子
   - `parking-03.jpg` … 既存の月極駐車場看板
   - 写真は横長・軽量（各300KB程度以下推奨）にリサイズしてから配置すると表示が速い
   - 写真を追加する場合は `index.html` の `#galleryList` 内に `<button class="gallery-item">` を1ブロック追加すればよい

2. **GitHub Pagesで公開**
   ```bash
   cd /home/daiki/projects/tsu-forble3-parking
   git init -b main
   git add .
   git commit -m "Initial LP"
   gh repo create tsu-forble3-parking --public --source=. --push
   gh api repos/{owner}/tsu-forble3-parking/pages -X POST -f "source[branch]=main" -f "source[path]=/" 2>&1 || true
   ```
   公開URL: `https://daikimhr0217-hub.github.io/tsu-forble3-parking/`
   （カスタムドメインを使う場合は `index.html` 内の `canonical` / OGP のURLも合わせて変更）

3. **Google Analytics 4を有効化**
   - GA4プロパティを作成し、測定ID（`G-XXXXXXXXXX`）を発行
   - `index.html` の `<head>` 内、コメントアウトされている `<!-- Google Analytics 4 ... -->` ブロックの `G-XXXXXXXXXX` を実IDに置き換えてコメントを外す
   - 電話ボタンのクリックは自動で `phone_click` イベントとして送信される（`script.js` 実装済み。GA4未導入時は何もしない安全設計）

## 流入元別URL（UTMパラメータ）

| 用途 | URL |
|---|---|
| Googleビジネスプロフィール | `https://daikimhr0217-hub.github.io/tsu-forble3-parking/?utm_source=google_business&utm_medium=organic&utm_campaign=parking` |
| 現地看板QRコード | `https://daikimhr0217-hub.github.io/tsu-forble3-parking/?utm_source=signboard&utm_medium=qr&utm_campaign=parking` |

GoogleビジネスプロフィールのウェブサイトURLには上記の`google_business`用URLを設定する。

## QRコード（現地A1看板用）

`assets/qr-signboard.svg` / `assets/qr-signboard.png`（1000×1000px、印刷向け）に生成済み。
リンク先は上表の「現地看板QRコード」URL。

LPの公開URLが変わった場合（カスタムドメイン適用など）は、以下で再生成する。

```bash
cd /home/daiki/projects/tsu-forble3-parking
LP_URL="https://<新しいURL>/?utm_source=signboard&utm_medium=qr&utm_campaign=parking"
npx --yes qrcode -o assets/qr-signboard.svg -t svg "$LP_URL"
npx --yes qrcode -o assets/qr-signboard.png -t png -w 1000 "$LP_URL"
```

## 構成

```
index.html   本体（全7セクション + 固定CTA）
style.css    スタイル（白背景ベース、「6か月無料」のみ赤〜オレンジで強調）
script.js    ギャラリー拡大表示 + GA4クリックイベント送信
images/      現地写真（未配置・要追加）
assets/      QRコード（生成済み）
```

## 注意事項（仕様どおり実装済み）

- 問い合わせフォームなし。問い合わせは電話（`tel:0592216868`）に一本化
- サイト側で個人情報は取得しない
- 部屋の賃貸募集情報は掲載しない
