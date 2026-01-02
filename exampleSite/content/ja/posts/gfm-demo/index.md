---
title: "GitHub Flavored Markdown デモ"
date: 2024-01-20
draft: false
tags: ["デモ", "マークダウン", "gfm"]
archives: ["2024-01"]
categories: ["ドキュメント"]
author: "デモ著者"
description: "GitHub Flavored Markdown の機能とシンタックスハイライトの包括的なデモンストレーション。"
image: "featured.jpg"
---

この記事では、このテーマでサポートされている GitHub Flavored Markdown (GFM) の全機能とコードのシンタックスハイライトをデモンストレーションします。

## 見出し

# 見出し 1
## 見出し 2
### 見出し 3
#### 見出し 4
##### 見出し 5
###### 見出し 6

---

## テキストフォーマット

通常のテキスト段落。吾輩は猫である。名前はまだ無い。

**太字テキスト** と __これも太字__

*斜体テキスト* と _これも斜体_

***太字かつ斜体*** と ___これも太字かつ斜体___

~~取り消し線テキスト~~

これは<sub>下付き文字</sub>で、これは<sup>上付き文字</sup>です

---

## リンク

[インラインリンク](https://github.com)

[タイトル付きリンク](https://github.com "GitHub ホームページ")

[参照スタイルリンク][github]

自動リンク URL: https://github.com

[github]: https://github.com

---

## 画像

![サンプル画像](/images/sample-image.svg)

---

## リスト

### 順序なしリスト

- アイテム 1
- アイテム 2
  - ネストしたアイテム 2.1
  - ネストしたアイテム 2.2
    - 深くネストしたアイテム
- アイテム 3

### 順序付きリスト

1. 最初のアイテム
2. 2番目のアイテム
   1. ネストしたアイテム 2.1
   2. ネストしたアイテム 2.2
3. 3番目のアイテム

### タスクリスト

- [x] 完了したタスク
- [x] もう一つの完了したタスク
- [ ] 未完了のタスク
- [ ] もう一つの未完了のタスク

---

## 引用

> これは引用です。
> 複数行にわたることができます。

> ネストした引用：
> > これはネストされています
> > > さらに深くネスト

> **フォーマット付き引用**
>
> - リストを含むことができます
> - その他の要素も
>
> ```
> コードブロックも
> ```

---

## コード

### インラインコード

JavaScript では定数に `const`、変数に `let` を使用します。

`npm install package-name` でパッケージをインストールします。

### コードブロック

#### JavaScript / TypeScript

```javascript
// ES6+ JavaScript の例
const greet = (name) => {
  console.log(`こんにちは、${name}さん！`);
};

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('エラー:', error);
    throw error;
  }
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `私は${this.name}、${this.age}歳です。`;
  }
}
```

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

type UserRole = 'admin' | 'editor' | 'viewer';

function getUserById(id: number): Promise<User | null> {
  return fetch(`/api/users/${id}`)
    .then(res => res.json())
    .catch(() => null);
}
```

#### Python

```python
from dataclasses import dataclass
from typing import List, Optional
import asyncio

@dataclass
class User:
    id: int
    name: str
    email: str
    is_active: bool = True

class UserService:
    def __init__(self, db_connection):
        self.db = db_connection

    async def get_user(self, user_id: int) -> Optional[User]:
        """IDでユーザーを取得する。"""
        query = "SELECT * FROM users WHERE id = ?"
        result = await self.db.fetch_one(query, user_id)
        return User(**result) if result else None

    async def get_active_users(self) -> List[User]:
        """アクティブな全ユーザーを取得する。"""
        query = "SELECT * FROM users WHERE is_active = true"
        results = await self.db.fetch_all(query)
        return [User(**row) for row in results]

# リスト内包表記とラムダ
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
evens = [n for n in numbers if n % 2 == 0]
```

#### Go

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

func (u *User) String() string {
	return fmt.Sprintf("User{ID: %d, Name: %s}", u.ID, u.Name)
}

func fetchUser(ctx context.Context, id int) (*User, error) {
	url := fmt.Sprintf("https://api.example.com/users/%d", id)

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, err
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var user User
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}
```

#### Rust

```rust
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;

#[derive(Debug, Clone)]
struct User {
    id: u64,
    name: String,
    email: String,
}

impl User {
    fn new(id: u64, name: &str, email: &str) -> Self {
        Self {
            id,
            name: name.to_string(),
            email: email.to_string(),
        }
    }
}

struct UserCache {
    cache: Arc<RwLock<HashMap<u64, User>>>,
}

impl UserCache {
    async fn get(&self, id: u64) -> Option<User> {
        let cache = self.cache.read().await;
        cache.get(&id).cloned()
    }

    async fn set(&self, user: User) {
        let mut cache = self.cache.write().await;
        cache.insert(user.id, user);
    }
}
```

#### HTML / CSS

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>サンプルページ</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav-menu">
      <a href="/" class="nav-link">ホーム</a>
      <a href="/about" class="nav-link">概要</a>
    </nav>
  </header>
  <main id="content">
    <article class="post">
      <h1>ようこそ</h1>
      <p>こんにちは、世界！</p>
    </article>
  </main>
</body>
</html>
```

```css
:root {
  --primary-color: #0969da;
  --background-color: #ffffff;
  --text-color: #1f2328;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #0d1117;
    --text-color: #f0f6fc;
  }
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--background-color);
  border-bottom: 1px solid #d0d7de;
}
```

#### Shell / Bash

```bash
#!/bin/bash

# 変数
PROJECT_NAME="my-project"
BUILD_DIR="./dist"

# 関数定義
build_project() {
    echo "$PROJECT_NAME をビルド中..."

    # 前回のビルドをクリーン
    rm -rf "$BUILD_DIR"
    mkdir -p "$BUILD_DIR"

    # ビルドコマンドを実行
    npm run build || {
        echo "ビルドが失敗しました！"
        exit 1
    }

    echo "ビルドが正常に完了しました！"
}

# メイン実行
if [[ "$1" == "--production" ]]; then
    export NODE_ENV=production
fi

build_project
```

#### JSON / YAML / TOML

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

```yaml
# Docker Compose 設定
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

```toml
# Hugo 設定
baseURL = "https://example.com/"
languageCode = "ja"
title = "私のブログ"
theme = "primer-blog"

[params]
  description = "テクノロジーについてのブログ"
  author = "山田太郎"
```

#### SQL

```sql
-- ユーザーテーブルを作成
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- サンプルデータを挿入
INSERT INTO users (username, email)
VALUES
    ('taro_yamada', 'taro@example.com'),
    ('hanako_sato', 'hanako@example.com');

-- JOIN を使ったクエリ
SELECT
    u.username,
    u.email,
    COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
GROUP BY u.id, u.username, u.email
ORDER BY post_count DESC;
```

#### Diff

```diff
--- a/config.js
+++ b/config.js
@@ -1,7 +1,8 @@
 module.exports = {
   name: 'my-app',
-  version: '1.0.0',
+  version: '1.1.0',
   settings: {
-    debug: true
+    debug: false,
+    logging: true
   }
 };
```

---

## テーブル

### シンプルなテーブル

| 名前 | 年齢 | 都市 |
|------|-----|------|
| 田中 | 28 | 東京 |
| 鈴木 | 32 | 大阪 |
| 佐藤 | 25 | 名古屋 |

### 配置指定テーブル

| 左揃え | 中央揃え | 右揃え |
|:-------|:-------:|-------:|
| 左 | 中央 | 右 |
| テキスト | テキスト | テキスト |

---

## 水平線

3つの異なる方法で水平線を作成：

---

***

___

---

## キーボードキー

<kbd>Ctrl</kbd> + <kbd>C</kbd> でコピーします。

<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> でコマンドパレットを開きます。

---

## 脚注

これは脚注付きの文章です[^1]。

もう一つの脚注[^2]。

[^1]: これは最初の脚注です。
[^2]: これは2番目の脚注です。

---

## 詳細 / 折りたたみ

<details>
<summary>クリックして展開</summary>

このコンテンツはデフォルトで非表示です。

- アイテム 1
- アイテム 2
- アイテム 3

```javascript
console.log('隠されたコード！');
```

</details>

<details open>
<summary>デフォルトで展開</summary>

このセクションは `open` 属性により、デフォルトで表示されます。

</details>

---

## アラート / ノート (GitHub スタイル)

> [!NOTE]
> これはノートのコールアウトです。

> [!TIP]
> これはヒントのコールアウトです。

> [!IMPORTANT]
> これは重要なコールアウトです。

> [!WARNING]
> これは警告のコールアウトです。

> [!CAUTION]
> これは注意のコールアウトです。

---

## 絵文字

:smile: :heart: :thumbsup: :rocket: :sparkles:

---

## まとめ

このページでは、GitHub Flavored Markdown の全機能をデモンストレーションしました。正しくレンダリングされない要素がある場合は、テーマの設定と Hugo の設定を確認してください。
