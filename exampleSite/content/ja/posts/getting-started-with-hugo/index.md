---
title: "Hugo 入門"
date: 2024-01-10
draft: false
tags: ["hugo", "static-site", "ssg", "jamstack"]
archives: ["2024-01"]
categories: ["tutorial"]
author: "Your Name"
description: "世界最速の静的サイトジェネレーター Hugo の使い方を学びましょう。"
image: "featured.jpg"
---

Hugo は最も人気のあるオープンソース静的サイトジェネレーターの一つです。驚異的なスピードと柔軟性で、Hugo はウェブサイト構築を再び楽しいものにします。

## インストール

Hugo のインストールは簡単です。macOS では Homebrew を使用できます：

```bash
brew install hugo
```

Windows では Chocolatey を使用できます：

```bash
choco install hugo-extended
```

## 新しいサイトの作成

Hugo をインストールしたら、新しいサイトの作成は簡単です：

```bash
hugo new site my-blog
cd my-blog
```

## コンテンツの追加

最初の投稿を作成：

```bash
hugo new posts/my-first-post.md
```

## 開発サーバーの起動

開発サーバーを起動：

```bash
hugo server -D
```

サイトは `http://localhost:1313` で利用可能になります。

## 本番用ビルド

公開の準備ができたら、サイトをビルド：

```bash
hugo
```

出力は `public/` ディレクトリに生成されます。

## まとめ

Hugo は強力で高速な静的サイトジェネレーターです。次のプロジェクトでぜひ試してみてください！
