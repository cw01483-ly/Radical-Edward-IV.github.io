# CLAUDE.md

무조건 한글로 응답합니다.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based blog site using the TeXt theme, focused on technical documentation and tutorials. The blog is written primarily in Korean and covers topics in software development, databases (especially SQL), and various IT certifications.

## Development Commands

### Local Development
```bash
# Install dependencies
bundle install

# Serve the site locally (runs on port 4000)
bundle exec jekyll serve

# Serve with drafts and future posts
bundle exec jekyll serve --drafts --future

# Build the site (output to _site/)
bundle exec jekyll build

# Clean generated files
bundle exec jekyll clean
```

### Dev Container
The project includes a Dev Container configuration at `.devcontainer/devcontainer.json`:
- Based on Ruby 3.2 image
- Auto-installs Jekyll and Bundler on creation
- Forwards port 4000 for local preview
- To use: Open the project in a container-enabled IDE (VSCode, JetBrains IDEs)

## Architecture

### Content Structure

**Blog Posts** (`_posts/`):
- File naming: `YYYY-MM-DD-title.md` (Jekyll convention)
- Front matter includes: title, key, tags, excerpt, keywords
- Posts support custom CSS within the markdown for styling

**Study Notes** (`notes/kr/`):
- Organized by topic (sql-developer, sql-professional, linux-master, python-basic, python-deep-dive, java-deep-dive, info-processing-engineer, info-processing-technician)
- Navigated via sidebar defined in `_data/navigation.yml`
- Each note series has chapters numbered sequentially

### Theme Customization

**Configuration** (`_config.yml`):
- Uses remote theme: `kitian616/jekyll-TeXt-theme`
- Site title: "0과 1의 기록"
- Pagination: 8 posts per page
- Markdown: kramdown, Syntax highlighting: rouge
- Permalink style: date-based

**Custom Styling**:
- Custom SCSS in `_sass/` overrides theme defaults
- Posts frequently include inline `<style>` blocks for article-specific styling
- Common custom classes: `.blue-bold`, `.red-bold`, `.green-bold`, `.yellow-bold`, `.text-underline`

**Custom Components**:
- `_includes/code-with-image.html`: Displays code screenshots with copy-to-clipboard functionality
- Custom footer modifications in `_includes/article-footer.html`

### Navigation System

Defined in `_data/navigation.yml`:
- **Header navigation**: Home, Notes, Archive, About, GitHub
- **Notes sidebar** (`notes-kr`): Hierarchical navigation for study materials organized by certification/topic
- Supports multi-level nested navigation for chapter organization

### Layouts

Primary layouts in `_layouts/`:
- `article.html`: Blog posts with TOC, metadata, and social features
- `page.html`: Static pages (about, 404, etc.)
- `home.html`: Homepage with post listing
- `archive.html`: Post archive view

### Asset Management

**Images** (`images/`):
- Post images referenced with absolute paths: `/images/filename.png`
- Supports inline width/alt attributes

**Styles** (`_sass/`):
- Theme components, layout styles, and skin variations
- Highlight themes for code syntax (tomorrow variants)

## Content Development

### Creating Blog Posts

1. Create file in `_posts/` with format: `YYYY-MM-DD-title.md`
2. Add front matter:
```yaml
---
title: Post Title
key: YYYYMMDD
tags: TagName
excerpt: Brief description for previews
keywords: "comma, separated, keywords"
---
```
3. Use Korean for content (primary audience)
4. Include custom styling if needed for emphasis
5. Reference images with absolute paths

### Creating Study Notes

1. Add markdown file to appropriate `notes/kr/{topic}/` directory
2. Update `_data/navigation.yml` to add chapter to navigation
3. Use consistent chapter numbering and naming
4. Follow existing structure for consistency

### Image Usage in Posts

Use the custom include for code screenshots:
```liquid
{% include code-with-image.html image="/path/to/image.png" code_id="unique_id" code_content="code here" %}
```

For regular images, use standard markdown or HTML with inline styling as needed.

## Build Configuration

**Jekyll Plugins** (from `_config.yml`):
- jekyll-feed: RSS feed generation
- jekyll-paginate: Post pagination
- jekyll-sitemap: XML sitemap
- jemoji: GitHub-style emoji support
- jekyll-seo-tag: SEO metadata

**Excluded from Build**:
- `_site/`, `.sass-cache/`, `.jekyll-cache/`
- Bundler vendor files
- IDE-specific files (RubyMine, IntelliJ, VSCode)
- Documentation and development files

## Key Conventions

1. **Language**: Content is primarily in Korean
2. **Styling**: Use inline custom classes for emphasis rather than modifying theme
3. **Navigation**: All new note series must be registered in `_data/navigation.yml`
4. **Images**: Store in `/images/` directory, reference with absolute paths
5. **Code blocks**: Use fenced code blocks with language specifiers for syntax highlighting
6. **Date format**: Post keys use YYYYMMDD format (e.g., `key: 20230801`)

## Repository

- **GitHub**: Radical-Edward-IV/Radical-Edward-IV.github.io
- **Main branch**: main
- **License**: CC-BY-NC-4.0 (Creative Commons Attribution-NonCommercial)
