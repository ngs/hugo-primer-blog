---
title: "Introduction to Primer CSS"
date: 2024-01-05
draft: false
tags: ["css", "primer", "design-system"]
archives: ["2024-01"]
categories: ["design"]
author: "Your Name"
description: "An introduction to Primer CSS, GitHub's design system."
image: "https://picsum.photos/seed/primer/800/400"
---

Primer is GitHub's design system and CSS framework. It provides a set of guidelines and components to create consistent, accessible interfaces.

## What is Primer?

Primer is built around three core pillars:

1. **Primitives** - Design tokens for colors, spacing, and typography
2. **CSS** - Utility classes and component styles
3. **Components** - React and ViewComponent implementations

## Getting Started

Install Primer CSS via npm:

```bash
npm install @primer/css
```

Import the CSS in your project:

```scss
@import "@primer/css/index.scss";
```

## Utility Classes

Primer provides a comprehensive set of utility classes:

### Colors

```html
<p class="color-fg-default">Default text color</p>
<p class="color-fg-muted">Muted text color</p>
<p class="color-fg-accent">Accent text color</p>
```

### Spacing

```html
<div class="p-3">Padding of 16px</div>
<div class="m-4">Margin of 24px</div>
```

### Flexbox

```html
<div class="d-flex flex-items-center flex-justify-between">
  <span>Left</span>
  <span>Right</span>
</div>
```

## Components

Primer includes many pre-built components:

| Component | Description |
|-----------|-------------|
| Box | Container with border and padding |
| Button | Interactive button styles |
| Label | Tags and badges |
| Header | Navigation header |

## Dark Mode

Primer supports dark mode through data attributes:

```html
<html data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
```

## Resources

- [Primer Documentation](https://primer.style/)
- [GitHub Repository](https://github.com/primer/css)
- [Primer React](https://primer.style/react/)

Start building with Primer today!
