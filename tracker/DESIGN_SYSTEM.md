# Design System Architecture & Change Propagation

## Overview

The tracker app uses a **token-driven design system** synced with Stitch MCP. This means design changes flow automatically from a single source of truth (`lib/designTokens.ts`) to all UI components without requiring individual file edits.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Stitch Design System (MCP Server)                              │
│  - Color palette (primary, secondary, semantic)                 │
│  - Typography (Space Grotesk, Inter)                            │
│  - Spacing scale, shadows, radius                               │
│  - Component presets (panel, button, badge styles)              │
└────────────┬────────────────────────────────────────────────────┘
             │ (Query Design Theme via list_design_systems tool)
             ▼
      ┌──────────────────────────┐
      │  lib/designTokens.ts     │
      │  (Single Source of Truth)│
      │  - colors{}              │
      │  - spacing{}             │
      │  - shadows{}             │
      │  - semantic{}             │
      │  - components{}          │
      │  - getCSSVariables()     │
      └────────────┬─────────────┘
             │ (Exports token definitions)
             ▼
      ┌──────────────────────────┐
      │  app/globals.css          │
      │  - CSS custom properties  │
      │  - :root { --token: val } │
      │  - @layer components      │
      │    .panel { ... }         │
      │    .phase-badge { ... }   │
      └────────┬───────────────────┘
             │ (Provides CSS variables to Tailwind)
             ▼
    ┌────────────────────────────────┐
    │ All React Components            │
    │ - use CSS vars in styles       │
    │ - use Tailwind utilities       │
    │ - import designTokens for      │
    │   computed values              │
    └────────────────────────────────┘
             │
    ┌────────┴────────────────────────┐
    │  Pages:                          │
    │  - page.tsx (Dashboard)         │
    │  - dsa/page.tsx                 │
    │  - log/page.tsx                 │
    │  - roadmap/page.tsx             │
    │  - auth/*/page.tsx              │
    │                                 │
    │  Components:                    │
    │  - StatCard.tsx                 │
    │  - ProgressBar.tsx              │
    │  - Sidebar.tsx                  │
    │  - WeekCard.tsx                 │
    │  - ChecklistItem.tsx            │
    │  - AuthButton.tsx               │
    │  - RoadmapClient.tsx            │
    └─────────────────────────────────┘
```

---

## Layer 1: Token Definitions (`lib/designTokens.ts`)

### What it contains:
```typescript
// 1. Base colors (aligned with Stitch dark theme)
export const colors = {
  background: '#0c1324',           // Main background
  surface: '#191f31',              // Card backgrounds
  surfaceAlt: '#232d3c',           // Alternative surface
  surfaceElevated: '#2e3447',      // Elevated panels
  
  text: {
    primary: '#f1f5f9',            // Main text (slate-50)
    secondary: '#cbd5e1',          // Secondary text (slate-300)
    tertiary: '#94a3b8',           // Tertiary text (slate-400)
  },
  
  brand: {
    primary: '#89ceff',            // Sky blue (from Stitch)
    secondary: '#4edea3',          // Emerald (from Stitch)
  },
  
  semantic: {
    error: { bg: '#7f1d1d', text: '#fca5a5', border: '#dc2626' },
    success: { bg: '#064e3b', text: '#86efac', border: '#16a34a' },
    warning: { bg: '#7c2d12', text: '#fdba74', border: '#ea580c' },
  }
};

// 2. Spacing scale (4px base unit)
export const spacing = {
  xs: '4px',   sm: '8px',   md: '12px',   lg: '16px',
  xl: '24px',  '2xl': '32px', '3xl': '48px', '4xl': '64px'
};

// 3. Shadow definitions
export const shadows = {
  ambient: '0 20px 40px rgba(0, 0, 0, 0.3)',
  elevated: '0 30px 60px rgba(0, 0, 0, 0.4)',
  soft: '0 4px 12px rgba(0, 0, 0, 0.15)',
  glow: '0 0 24px rgba(137, 206, 255, 0.2)',  // Sky blue glow
};

// 4. Semantic token combinations
export const semantic = {
  background: colors.background,
  foreground: colors.text.primary,
  surface: { bg: colors.surface, border: '#334155' },
  accent: { primary: colors.brand.primary, secondary: colors.brand.secondary },
};

// 5. Pre-composed component styles
export const components = {
  panel: {
    bg: 'linear-gradient(180deg, rgba(35,41,60,0.96), rgba(21,27,45,0.98))',
    border: '1px solid #334155',
    rounded: '28px',
    shadow: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
  },
  button: {
    primary: { bg: 'from-sky-500 to-cyan-500', text: 'text-slate-950' },
    secondary: { bg: 'bg-slate-800', text: 'text-slate-300' },
  },
  badge: {
    phase: {
      1: 'bg-sky-500/20 text-sky-200 border-sky-400/20',
      2: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/20',
      3: 'bg-purple-500/20 text-purple-200 border-purple-400/20',
      4: 'bg-orange-500/20 text-orange-200 border-orange-400/20',
    }
  }
};

// 6. CSS variable generator
export function getCSSVariables(): Record<string, string> {
  return {
    '--bg': colors.background,
    '--surface': colors.surface,
    '--text-primary': colors.text.primary,
    // ... more variables
  };
}
```

---

## Layer 2: CSS Custom Properties (`app/globals.css`)

### How it bridges tokens to Tailwind:
```css
:root {
  /* Generated from designTokens.ts */
  --bg: #0c1324;
  --surface: #191f31;
  --text-primary: #f1f5f9;
  --brand-primary: #89ceff;
  --brand-secondary: #4edea3;
}

@layer components {
  .panel {
    @apply rounded-[28px] backdrop-blur-xl;
    background: linear-gradient(180deg, rgba(35,41,60,0.96), rgba(21,27,45,0.98));
    border: 1px solid var(--border-color, #334155);
    box-shadow: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
  }

  .phase-badge-1 { @apply bg-sky-500/20 text-sky-200 border border-sky-400/20; }
  .phase-badge-2 { @apply bg-emerald-500/20 text-emerald-200 border border-emerald-400/20; }
  .phase-badge-3 { @apply bg-purple-500/20 text-purple-200 border border-purple-400/20; }
  .phase-badge-4 { @apply bg-orange-500/20 text-orange-200 border border-orange-400/20; }
}

body {
  background: radial-gradient(200% 100% at 50% 0%, rgba(137, 206, 255, 0.15) 0%, rgba(78, 222, 163, 0.08) 40%, #0c1324 100%);
  color: var(--text-primary);
}
```

---

## Layer 3: Component Usage

### Example: StatCard.tsx
```typescript
import { colors, components } from '@/lib/designTokens';

export default function StatCard({
  icon: Icon,
  title,
  value,
  delta,
  type, // 'dsa' | 'log' | 'phase'
}: StatCardProps) {
  const colorMap: Record<StatCardType, keyof typeof colors.semantic> = {
    dsa: 'primary',      // Maps to colors.brand.primary
    log: 'secondary',    // Maps to colors.brand.secondary
    phase: 'accent',
  };

  const S = {
    iconBg: type === 'dsa' ? 'bg-sky-500/15' : 'bg-emerald-500/15',
    val: type === 'dsa' ? 'text-sky-50' : 'text-emerald-50',
    label: 'text-slate-400',
  };

  return (
    <div className="panel p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className={S.label}>{title}</p>
          <p className={`${S.val} text-4xl font-bold mt-4`}>{value}</p>
          {delta && <p className="text-xs text-slate-500 mt-2">{delta}</p>}
        </div>
        <div className={`${S.iconBg} p-3 rounded-xl`}>
          <Icon className="w-6 h-6 text-slate-300" />
        </div>
      </div>
    </div>
  );
}
```

---

## Design Change Workflow: Step-by-Step

### Scenario: Change primary brand color from sky-blue to a different shade

#### Step 1: Update Token Source
**File: `lib/designTokens.ts`**
```typescript
// BEFORE
export const colors = {
  brand: {
    primary: '#89ceff',      // Sky blue
    secondary: '#4edea3',
  }
}

// AFTER
export const colors = {
  brand: {
    primary: '#60a5fa',      // New blue shade
    secondary: '#4edea3',
  }
}
```

#### Step 2: Regenerate CSS Variables
**File: `app/globals.css` (auto-regenerated via getCSSVariables())**
```css
/* BEFORE */
:root {
  --brand-primary: #89ceff;
}

/* AFTER */
:root {
  --brand-primary: #60a5fa;
}
```

#### Step 3: All Components Auto-Update
**Impact chain (automatic):**
- `StatCard.tsx` → Re-renders with new primary color glow
- `ProgressBar.tsx` → Progress fill uses new color
- `Sidebar.tsx` → Nav accent bar uses new primary
- `ProgressBar.tsx` used in `WeekCard.tsx` → Color updates
- `RoadmapClient.tsx` buttons (gradient from/to primary) → New gradient

**No individual file edits required.**

---

## Change Types & Propagation Examples

### 1. Color Palette Change
```
designTokens.ts: colors.brand.primary = '#new-color'
         ↓ (via getCSSVariables)
globals.css: --brand-primary: #new-color
         ↓ (via Tailwind CSS pipeline)
Components using 'from-sky-500' or var(--brand-primary)
         ↓
[Instant visual update across entire app]
```

### 2. Spacing Update
```
designTokens.ts: spacing.lg = '20px' (was '16px')
         ↓ (update component Tailwind classes)
globals.css or component inline styles
         ↓
.panel, buttons, cards all use updated spacing
         ↓
[App layout reflows with new spacing metric]
```

### 3. Shadow/Elevation Change
```
designTokens.ts: shadows.elevated = '0 40px 80px rgba(0,0,0,0.5)'
         ↓ (modify @layer components or CSS vars)
Tailwind shadow-lg, shadow-xl utilities
         ↓
.panel, modals, dropdowns get new elevation
         ↓
[Depth hierarchy visually updated globally]
```

### 4. Typography Change
```
designTokens.ts: (add or modify font constants)
         ↓
app/layout.tsx font imports or globals.css @font-face
         ↓
Tailwind font-sans, font-display utilities updated
         ↓
[All text reflows with new typeface]
```

---

## Files & Their Roles

| File | Purpose | Change Impact |
|------|---------|---|
| `lib/designTokens.ts` | Single source of truth for all design tokens | **High**: Ripples to all layers below |
| `app/globals.css` | CSS custom properties + Tailwind @layer definitions | **High**: Affects all components using these utilities |
| `app/layout.tsx` | Font imports (Inter, Space Grotesk) | **Medium**: Typography changes flow to all pages |
| `components/*.tsx` | Use token values & CSS utilities | **Low**: Only re-imports if token exports change |
| `app/*/page.tsx` | Pages compose components | **Very Low**: Changes when component props change |

---

## How to Modify the Design System

### Quick Start: Update Primary Color
1. Open `tracker/lib/designTokens.ts`
2. Change `colors.brand.primary` value
3. Save file → App auto-recompiles
4. Refresh browser → New color visible everywhere primary is used

### Adding New Token
1. Add to appropriate object in `lib/designTokens.ts`
   ```typescript
   export const colors = {
     brand: {
       primary: '#60a5fa',
       secondary: '#4edea3',
       tertiary: '#new-color',  // NEW
     }
   }
   ```
2. Update `getCSSVariables()` if needed:
   ```typescript
   '--brand-tertiary': colors.brand.tertiary,
   ```
3. Use in components:
   ```typescript
   className="bg-slate-800 text-var(--brand-tertiary)"
   // or via Tailwind if you extend theme
   ```

### Syncing with Stitch
1. Query current Stitch design system:
   ```bash
   curl -X POST "https://stitch.googleapis.com/mcp" \
     -H "X-Goog-Api-Key: YOUR_KEY" \
     -H "Content-Type: application/json" \
     -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list_design_systems"}}'
   ```
2. Extract DesignTheme colors, fonts, spacings
3. Update `designTokens.ts` values to match Stitch
4. Test in app → All pages reflect updated design

---

## Current Design System State

**Theme**: Dark Editorial (Stitch-synced)

| Category | Value |
|----------|-------|
| **Background** | `#0c1324` (Navy) |
| **Surface** | `#191f31` → `#2e3447` (Gradient) |
| **Primary Brand** | `#89ceff` (Sky Blue) |
| **Secondary Brand** | `#4edea3` (Emerald) |
| **Typography** | Space Grotesk (headers), Inter (body) |
| **Shadows** | Ambient (0 20px 40px) + Soft (0 4px 12px) |
| **Panel Border Radius** | `28px` |
| **phase-badge colors** | Blue, Emerald, Purple, Orange (with /20 opacity) |

---

## Key Principles

1. **Never hardcode colors** in components — Always use tokens or Tailwind utilities
2. **Token definitions are in one file** — Changes are atomic and traceable
3. **CSS variables bridge tokens to styles** — Enables runtime adjustments if needed
4. **Semantic naming over absolute names** — `colors.brand.primary` not `colors.sky`
5. **Type safety** — TypeScript enforces valid token usage in components

---

## Troubleshooting

### Change not appearing?
- [ ] Check if `designTokens.ts` was saved
- [ ] Did you restart dev server? (`npm run dev`)
- [ ] Is the component using the correct token path?
- [ ] Browser cache? Refresh with Ctrl+Shift+R

### Inconsistent styling across pages?
- [ ] Check if all pages import from `globals.css`
- [ ] Verify components use `.panel` class for consistency
- [ ] Check `app/layout.tsx` metadata/fonts are loaded

### MCP sync needed?
- [ ] Use Stitch tool: `apply_design_system` or `update_design_system`
- [ ] After Stitch change, manually update `designTokens.ts` values
- [ ] No automated sync yet — manual sync point ensures control

---

## Future Enhancements

- **Automated Stitch sync**: Periodically call Stitch API to detect design updates
- **Tailwind theme extension**: Auto-generate Tailwind theme from `designTokens.ts`
- **Component variants**: Store `.variant` presets for button/badge styles
- **Dark/Light mode toggle**: Add theme context provider for mode switching

---

**Last Updated**: April 2026
**Design System Version**: 1.0 (Stitch-aligned Dark Editorial)
**Maintainer**: World Class Dev Journey Tracker Team
