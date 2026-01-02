---
title: "GitHub Flavored Markdown Demo"
date: 2024-01-20
draft: false
tags: ["demo", "markdown", "gfm"]
archives: ["2024-01"]
categories: ["documentation"]
author: "Demo Author"
description: "A comprehensive demonstration of GitHub Flavored Markdown features and syntax highlighting."
---

This post demonstrates all GitHub Flavored Markdown (GFM) features and code syntax highlighting supported by this theme.

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Text Formatting

Regular text paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

**Bold text** and __also bold__

*Italic text* and _also italic_

***Bold and italic*** and ___also bold and italic___

~~Strikethrough text~~

This is a <sub>subscript</sub> and this is a <sup>superscript</sup>

---

## Links

[Inline link](https://github.com)

[Link with title](https://github.com "GitHub Homepage")

[Reference-style link][github]

Autolinked URL: https://github.com

[github]: https://github.com

---

## Images

![Sample Image](/images/sample-image.svg)

---

## Lists

### Unordered List

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Deeply nested item
- Item 3

### Ordered List

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

### Task List

- [x] Completed task
- [x] Another completed task
- [ ] Incomplete task
- [ ] Another incomplete task

---

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

> Nested blockquotes:
> > This is nested
> > > And even deeper

> **Blockquote with formatting**
>
> - Can contain lists
> - And other elements
>
> ```
> Even code blocks
> ```

---

## Code

### Inline Code

Use `const` for constants and `let` for variables in JavaScript.

Install the package with `npm install package-name`.

### Code Blocks

#### JavaScript / TypeScript

```javascript
// ES6+ JavaScript example
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
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
        """Fetch a user by ID."""
        query = "SELECT * FROM users WHERE id = ?"
        result = await self.db.fetch_one(query, user_id)
        return User(**result) if result else None

    async def get_active_users(self) -> List[User]:
        """Get all active users."""
        query = "SELECT * FROM users WHERE is_active = true"
        results = await self.db.fetch_all(query)
        return [User(**row) for row in results]

# List comprehension and lambda
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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav-menu">
      <a href="/" class="nav-link">Home</a>
      <a href="/about" class="nav-link">About</a>
    </nav>
  </header>
  <main id="content">
    <article class="post">
      <h1>Welcome</h1>
      <p>Hello, World!</p>
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

.nav-menu {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--primary-color);
}
```

#### Shell / Bash

```bash
#!/bin/bash

# Variables
PROJECT_NAME="my-project"
BUILD_DIR="./dist"

# Function definition
build_project() {
    echo "Building $PROJECT_NAME..."

    # Clean previous build
    rm -rf "$BUILD_DIR"
    mkdir -p "$BUILD_DIR"

    # Run build commands
    npm run build || {
        echo "Build failed!"
        exit 1
    }

    echo "Build completed successfully!"
}

# Main execution
if [[ "$1" == "--production" ]]; then
    export NODE_ENV=production
fi

build_project

# Array and loop
files=("index.html" "styles.css" "main.js")
for file in "${files[@]}"; do
    cp "src/$file" "$BUILD_DIR/"
done
```

#### JSON / YAML / TOML

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

```yaml
# Docker Compose configuration
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp

volumes:
  postgres_data:
```

```toml
# Hugo configuration
baseURL = "https://example.com/"
languageCode = "en-us"
title = "My Blog"
theme = "primer-blog"

[params]
  description = "A blog about technology"
  author = "John Doe"

[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 1
```

#### SQL

```sql
-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index
CREATE INDEX idx_users_email ON users(email);

-- Insert sample data
INSERT INTO users (username, email, password_hash)
VALUES
    ('john_doe', 'john@example.com', 'hashed_password_1'),
    ('jane_smith', 'jane@example.com', 'hashed_password_2');

-- Query with JOIN
SELECT
    u.username,
    u.email,
    COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
WHERE u.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.id, u.username, u.email
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC
LIMIT 10;
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

## Tables

### Simple Table

| Name | Age | City |
|------|-----|------|
| Alice | 28 | Tokyo |
| Bob | 32 | London |
| Carol | 25 | Paris |

### Aligned Table

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Text | Text | Text |
| More | More | More |

### Complex Table

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown | :white_check_mark: Supported | Full GFM support |
| Syntax Highlighting | :white_check_mark: Supported | Multiple languages |
| Math Equations | :x: Not supported | Use images instead |
| Mermaid Diagrams | :x: Not supported | Planned feature |

---

## Horizontal Rules

Three different ways to create horizontal rules:

---

***

___

---

## Escaping Characters

\*Not italic\*

\`Not code\`

\# Not a heading

---

## Keyboard Keys

Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.

Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open command palette.

---

## Abbreviations

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

---

## Footnotes

Here's a sentence with a footnote[^1].

And another one[^2].

[^1]: This is the first footnote.
[^2]: This is the second footnote with more content.

---

## Details / Summary (Collapsible)

<details>
<summary>Click to expand</summary>

This content is hidden by default.

- Item 1
- Item 2
- Item 3

```javascript
console.log('Hidden code!');
```

</details>

<details open>
<summary>Expanded by default</summary>

This section is visible by default because of the `open` attribute.

</details>

---

## Alerts / Notes (GitHub Style)

> [!NOTE]
> This is a note callout.

> [!TIP]
> This is a tip callout.

> [!IMPORTANT]
> This is an important callout.

> [!WARNING]
> This is a warning callout.

> [!CAUTION]
> This is a caution callout.

---

## Emoji

:smile: :heart: :thumbsup: :rocket: :sparkles:

---

## Conclusion

This page demonstrates the full range of GitHub Flavored Markdown features. If any elements don't render correctly, please check the theme configuration and Hugo settings.
