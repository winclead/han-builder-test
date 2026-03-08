# Semantle - English Version

## Overview
A semantic word-guessing game inspired by Semantle (semantle.com) and its Korean version (꼬맨틀). Users guess a secret word based on its semantic similarity.

## Features
- **Semantic Guessing:** Enter words to see their similarity score to the secret word.
- **Progress Tracking:** A table shows guess history with similarity scores and progress bars.
- **Rank Indicator:** Gauges how close you are (e.g., "Top 10", "Getting Close").
- **Theme Support:** Fully responsive Dark and Light modes.
- **Win State:** A modal appears when the secret word is found.
- **Partnership Inquiry:** A modern form powered by Formspree for collaborations.
- **Persistence:** Remembers theme preferences.

## Design
- **Modern UI:** Clean, card-based layout with a focus on readability.
- **Interactive Elements:** Progress bars provide visual feedback on proximity.
- **Responsive:** Works perfectly on both desktop and mobile.

## Implementation Details
- **index.html:** Core structure with input group and results table.
- **style.css:** Modern styling using CSS variables for theme management and progress indicators.
- **main.js:** Manages game state, theme toggling, and a mocked similarity engine for the prototype (Secret Word: `COFFEE`).

## Deployment
- Hosted on GitHub: [https://github.com/winclead/han-builder-test](https://github.com/winclead/han-builder-test)
