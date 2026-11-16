# Multilingual Heart Splash Design

## Confirmed requirements

- Show a full-screen opening splash on every normal visit.
- Render a heart silhouette from multilingual versions of “I love you.”
- Use a dark, rose, and gold treatment consistent with the existing site.
- Animate the phrases into place, shimmer briefly, then fade automatically into the homepage.
- Keep the duration configurable from 5 to 15 seconds; the initial setting is 9 seconds.
- Add no dependencies or data collection.

## Decision log

- **Canvas instead of DOM or SVG:** supports many animated phrases with one responsive drawing surface and avoids a large animated DOM tree.
- **Parametric heart boundary:** scanlines calculate their horizontal limits from a normalized heart equation, so text always fills a heart silhouette at any viewport size.
- **Reusable React component:** the main app controls dismissal through a callback while the visual logic remains isolated.
- **Accessibility:** reduced-motion users receive a quickly completed static heart before the automatic transition.

## Implementation

`MultilingualHeartSplash` renders a device-pixel-ratio-aware canvas. It traces two measured typographic rings along a parametric heart curve, spacing each phrase by its rendered width and aligning it to the curve’s tangent. The phrases ease vertically into place, then receive intermittent shimmer highlights. At the end of the configured duration, the overlay fades out and calls `onComplete`, exposing the existing application beneath it.
