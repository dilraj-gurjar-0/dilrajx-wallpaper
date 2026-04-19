# Design Brief

**Luxury 4K Wallpaper Gallery — Premium Dark Aesthetic**

Refined, elevated showcase of curated wallpaper collections. Dark luxury with warm gold accents, minimal decoration, sophisticated depth, editorial grid layout. Emotional tone: curated discovery, premium craftsmanship, smooth experience.

## Palette (OKLCH)

| Role | Light | Dark | Usage |
|------|-------|------|-------|
| Primary/Accent | 0.70 0.20 50 (Gold) | 0.70 0.20 50 | Interactive highlights, hover states, category underlines |
| Background | 0.12 0 0 | 0.12 0 0 | Page background, deep luxury canvas |
| Card | 0.16 0 0 | 0.16 0 0 | Wallpaper cards, elevated surfaces |
| Foreground/Text | 0.92 0 0 | 0.92 0 0 | Primary text, labels, metadata |
| Muted | 0.28 0 0 | 0.28 0 0 | Secondary text, disabled states |
| Border | 0.25 0 0 | 0.25 0 0 | Card edges, dividers, subtle structure |

## Typography

| Role | Font | Size | Usage |
|------|------|------|-------|
| Display | Fraunces (serif) | 28–40px | Category headers, page title |
| Body | General Sans (sans-serif) | 14–16px | Metadata, descriptions, UI labels |
| Mono | Geist Mono | 12–14px | Download count, technical info |

## Structural Zones

- **Header**: Dark card (bg-card) with golden bottom border, category filter tabs with accent underline on hover
- **Gallery Grid**: Responsive columns (1 mobile, 2 tablet, 3+ desktop), cards on dark background with subtle shadow
- **Card**: Wallpaper image, glass overlay on hover, title overlay, heart icon, metadata
- **Footer**: Attribution section with muted text, top border accent

## Elevation & Depth

- **Card shadow**: subtle box-shadow (8px blur) for gentle lift
- **Elevated hover**: card-elevated utility applies lifted shadow + border highlight
- **Glass overlay**: semi-transparent black (30%) + backdrop blur on image preview
- **Accent line**: golden underline (scale-x animation) on tab hover

## Spacing & Rhythm

- Card gap: 1rem (mobile), 1.5rem (tablet+)
- Section padding: 2rem horizontal, 3rem vertical
- Typography hierarchy: Display 28px, Body 16px, Label 14px
- Border radius: 12px cards, 8px buttons/inputs

## Component Patterns

- **Card**: Image container + glass overlay + title + metadata + favorite icon
- **Filter tabs**: Horizontal scroll (mobile), accent underline animation, smooth transition
- **Gallery grid**: CSS grid with auto-fit, image aspect ratio 4:3
- **Buttons**: Primary (gold bg, dark text), Secondary (border only, gold text)

## Motion

- **Transitions**: 300ms cubic-bezier(0.4, 0, 0.2, 1) for all interactive elements
- **Hover**: scale-in (105%), card elevation, accent underline slide
- **Load**: fade-in + scale-in staggered for gallery cards
- **Shimmer**: subtle shimmer animation on loading placeholders

## Signature Detail

Golden accent line appears on tab underline, card border highlight, and interactive button hover states. Creates premium, recognizable visual signature across entire interface. No neon/glow — only refined shadow depth and subtle metallic warmth.

## Constraints

- Dark mode only (luxury aesthetic demands it)
- Max 3 colors in palette + neutrals (avoid rainbow)
- No blur/gradient backgrounds (maintains readability of images)
- Image-first layout — photos are hero content, chrome is minimal
- Smooth 60fps transitions (cubic-bezier easing)
