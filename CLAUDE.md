# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EUA Afora (Around The U.S.) is a vanilla HTML/CSS/JavaScript web application for sharing photos of places in the United States. Users can manage their profile, add photo cards, like cards, and view images in a modal.

## Development

This is a static site with no build tools or package manager. To develop:

1. Open `index.html` directly in a browser, or
2. Use VS Code Live Server extension for hot reload

## Architecture

### CSS Organization (BEM Methodology)

- `pages/index.css` - Main entry point that imports all CSS
- `blocks/` - BEM block styles (body, elements, footer, header, modal, profile)
- `vendor/` - External resources (fonts.css, normalize.css, Inter font files)

### JavaScript (`scripts/index.js`)

Single-file vanilla JS handling:
- **Card rendering** - Uses `<template id="card-template">` for cloning cards
- **Modal system** - Three modals: profile edit, add card, image preview
- **Event handling** - Like toggle, card deletion, ESC key close, overlay click close
- **Local storage** - Profile name and occupation persistence

Key functions:
- `createCard(cardData)` - Creates card element from template
- `renderCard(cardData)` - Prepends card to list
- `openModal(modal)` / `closeModal(modal)` - Modal display management
- `handleProfileFormSubmit()` / `handleAddCardFormSubmit()` - Form handlers

### Data

Initial cards are hardcoded in `initialCards` array at the top of `index.js`.

### Assets

- `assets/` - Images (profile photo, card photos, icons like heart, trash, edit button)
