# Primer Blog

A clean, responsive Hugo blog theme using GitHub's [Primer CSS](https://primer.style/) design system.

**[Live Demo](https://hugo-primer-blog-demo.ngs.io)**

## Features

- **Dark Mode** - Automatic system preference detection with manual override, saved to localStorage
- **Multilingual** - Full i18n support with included English and Japanese translations
- **Responsive Design** - Looks great on all devices with optional sidebar layout
- **Primer CSS** - Built on GitHub's design system for a clean, modern look
- **Markdown Styling** - Full Primer markdown styling for rich content
- **Hugo Pipes** - Built with Hugo Pipes for optimized asset handling

## Requirements

- Hugo v0.112.0 or later (Extended version not required)
- Node.js and npm (for Primer CSS dependencies during theme development)

## Installation

### As a Hugo Module (Recommended)

1. Initialize your Hugo site as a module:

```bash
hugo mod init github.com/your-username/your-site
```

2. Add the theme to your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/ngs/hugo-primer-blog"
```

### As a Git Submodule

1. Add the theme as a submodule:

```bash
git submodule add https://github.com/ngs/hugo-primer-blog.git themes/hugo-primer-blog
```

2. Install npm dependencies:

```bash
cd themes/hugo-primer-blog
npm install
```

3. Set the theme in your `hugo.toml`:

```toml
theme = "hugo-primer-blog"
```

## Configuration

### Basic Configuration

```toml
baseURL = "https://example.com/"
title = "My Blog"
theme = "hugo-primer-blog"

defaultContentLanguage = "en"
defaultContentLanguageInSubdir = true

[params]
  sidebar = true           # Enable/disable sidebar
  recentPosts = 5          # Number of recent posts in sidebar
  showTags = true          # Show tags in sidebar
  showArchive = true       # Show archive in sidebar
  defaultTheme = "auto"    # auto, light, or dark
  dateFormat = "2006-01-02"
  showReadingTime = true
  showAuthor = true
  showShareButtons = true

  [params.social]
    github = "your-username"
    twitter = "your-username"
```

### Multilingual Configuration

```toml
[languages]
  [languages.en]
    languageName = "English"
    weight = 1
    contentDir = "content/en"

  [languages.ja]
    languageName = "日本語"
    weight = 2
    contentDir = "content/ja"
```

### Menus

```toml
[menus]
  [[menus.main]]
    name = "Home"
    url = "/"
    weight = 1

  [[menus.main]]
    name = "Posts"
    url = "/posts/"
    weight = 2

  [[menus.footer]]
    name = "Privacy"
    url = "/privacy/"
    weight = 1
```

## Content Structure

```
content/
├── en/
│   ├── posts/
│   │   └── my-post.md
│   └── about.md
└── ja/
    ├── posts/
    │   └── my-post.md
    └── about.md
```

### Front Matter

```yaml
---
title: "My Post Title"
date: 2024-01-15
draft: false
tags: ["hugo", "primer"]
categories: ["tutorial"]
author: "Your Name"
description: "A brief description of the post"
image: "/images/featured.jpg"  # Optional featured image
---
```

## Customization

### Custom CSS

Create `assets/css/custom.css` in your site root to add custom styles (will be merged with the theme's custom.css):

```css
/* Your custom styles here */
```

### Overriding Templates

Copy any template from the theme's `layouts/` directory to your site's `layouts/` directory to override it.

## Development

To run the example site:

```bash
git clone https://github.com/ngs/hugo-primer-blog.git
cd hugo-primer-blog
npm install
cd exampleSite
hugo server --themesDir ../..
```

Then open http://localhost:1313 in your browser.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This theme is released under the [MIT License](LICENSE).

## Credits

- [Hugo](https://gohugo.io/) - The world's fastest static site generator
- [Primer CSS](https://primer.style/) - GitHub's design system
