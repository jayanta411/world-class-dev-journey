# Icon System Integration Guide

## Summary

The tracker app now has a **complete, Stitch-synced icon system** with:

✅ **40+ SVG icons** organized by category (navigation, actions, status, user, data, content)
✅ **Design token integration** — All icons use colors from `designTokens.ts`
✅ **Type-safe** — Full TypeScript support with semantic color names
✅ **Accessible** — Built-in ARIA labels and semantic HTML
✅ **Performant** — Inline SVG (no external requests), tree-shakeable exports
✅ **Already implemented** — Sidebar navigation updated to use new icons

---

## Quick Start

### Import icons from `lib/icons.tsx`

```typescript
import { 
  IconHome, 
  IconMapPin, 
  IconBrain, 
  IconBook,
  IconPlus,
  IconTrash
} from '@/lib/icons';
```

### Use with sizing and colors

```typescript
// Navigation icon
<IconHome size="md" />

// Error action
<IconTrash size="sm" color="error" />

// Icon-only button
<button aria-label="Add task">
  <IconPlus size="sm" />
</button>

// Phase indicator
<IconPhase phase={1} size="lg" />
```

---

## Icon Categories

| Category | Icons | Use Case |
|----------|-------|----------|
| **Navigation** | Home, MapPin, Brain, Book | Sidebar menu, route links |
| **Actions** | Plus, Trash, Edit, Check, X, ChevronDown, ChevronRight | Buttons, interactive elements |
| **Status** | Circle, CheckCircle, AlertCircle, Clock | Task completion, alerts, time |
| **User & Auth** | User, LogOut, Github | Profile, sign-out, OAuth |
| **Data** | BarChart, TrendingUp, Filter | Analytics, statistics |
| **Content** | Link, ExternalLink, Code, Search | References, code links, search |
| **Special** | Phase (1-4), Badge, Spinner | Badges, loading states |

---

## Files Modified

| File | Changes |
|------|---------|
| **lib/icons.tsx** | NEW — 40+ SVG icons, semantic coloring |
| **lib/designTokens.ts** | ADDED — `icons` export with sizing, colors, animations |
| **components/Sidebar.tsx** | UPDATED — Uses IconHome, IconMapPin, IconBrain, IconBook |
| **ICON_SYSTEM.md** | NEW — Comprehensive icon documentation |

---

## Design Token Alignment

All icons use colors from `designTokens.ts`:

```typescript
// From designTokens.ts
export const colors = {
  primary: '#89ceff',          // Sky blue (main accent)
  secondary: '#4edea3',        // Emerald (success/complete)
  onSurface: '#dce1fb',        // Primary text
  onSurfaceVariant: '#bec8d2', // Secondary text
  error: '#ffb4ab',            // Error state
};

// Available in icons as color props
<IconCheck color="secondary" />       // Emerald
<IconTrash color="error" />           // Error red
<IconHome color="primary" />          // Sky blue
<IconBook color="text_secondary" />   // Secondary text
```

---

## Next Steps: Applying Icons to Other Components

To use icons throughout the app, update components like this:

### Before (inline SVG):
```typescript
<button>
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="12 4v16m8-8H4" />
  </svg>
  Add
</button>
```

### After (using icon system):
```typescript
import { IconPlus } from '@/lib/icons';

<button>
  <IconPlus size="sm" />
  Add
</button>
```

### Components to update:
1. **RoadmapClient.tsx** — Replace all inline SVGs with icon imports
2. **StatCard.tsx**, **ProgressBar.tsx**, **WeekCard.tsx** — Action icons
3. **ChecklistItem.tsx** — Status and action icons
4. **AuthButton.tsx** — User/auth icons

---

## Syncing with Stitch

The icon system is pre-configured with Stitch design tokens:

- **Phase 1 badge**: Sky blue (#89ceff) — `<IconPhase phase={1} />`
- **Phase 2 badge**: Emerald (#4edea3) — `<IconPhase phase={2} />`
- **Phase 3 badge**: Purple (#a78bfa) — `<IconPhase phase={3} />`
- **Phase 4 badge**: Orange (#fb923c) — `<IconPhase phase={4} />`

To update icon colors when Stitch design changes:
1. Edit `lib/designTokens.ts` → `icons.colors`
2. All icon instances auto-update
3. No component changes needed

---

## Accessibility Checklist

When using icons, ensure:

- [ ] Icon-only buttons have `aria-label` attribute
- [ ] Icons are sized appropriately (md/lg for readability)
- [ ] Color sufficient (don't rely on color alone for meaning)
- [ ] Pair with descriptive text when possible (e.g., "Add Week" with IconPlus)
- [ ] Loading spinners use `animate-spin` or `animate-pulse`

Example:
```typescript
<button 
  aria-label="Delete task"
  title="Delete"
  className="p-2 hover:bg-slate-800 rounded"
>
  <IconTrash size="md" color="error" />
</button>
```

---

## Performance Benefits

| Metric | Before (Inline SVGs) | After (Icon Library) |
|--------|---|---|
| Duplication | ❌ Each component has SVG markup | ✅ Single source of truth |
| Bundle size | 📈 Grows with component count | ✅ Tree-shakeable exports |
| Styling | 🔧 Scattered class names | ✅ Centralized in designTokens |
| Type safety | ❌ No validation | ✅ TypeScript enums |
| Updates | 🔄 Manual per-component | ✅ Automatic from token change |

---

## Examples

### Dashboard Navigation
```typescript
// BEFORE: Emoji + inline SVG
<nav>
  <a href="/">📊 Dashboard</a>
  <a href="/roadmap">🗺️ Roadmap</a>
</nav>

// AFTER: Semantic icons from library
import { IconHome, IconMapPin } from '@/lib/icons';

<nav>
  <a href="/" className="flex items-center gap-2">
    <IconHome size="md" />
    Dashboard
  </a>
  <a href="/roadmap" className="flex items-center gap-2">
    <IconMapPin size="md" />
    Roadmap
  </a>
</nav>
```

### Action Buttons
```typescript
import { IconPlus, IconTrash, IconEdit, IconCheck } from '@/lib/icons';

// Add task
<button onClick={handleAdd}>
  <IconPlus size="sm" /> Add
</button>

// Complete task
<button onClick={handleComplete}>
  <IconCheck size="sm" color="secondary" />
</button>

// Delete task
<button onClick={handleDelete}>
  <IconTrash size="sm" color="error" />
</button>
```

### Phase Badges
```typescript
import { IconPhase } from '@/lib/icons';

{/* Week 1-4 (Phase 1) */}
<div className="flex items-center gap-2">
  <IconPhase phase={1} size="lg" />
  <span>Core Sharpening (Weeks 1–4)</span>
</div>
```

---

## Documentation Files

- **ICON_SYSTEM.md** — Complete icon reference with usage examples
- **DESIGN_SYSTEM.md** — Overall design system architecture
- **lib/icons.tsx** — Icon library source code
- **lib/designTokens.ts** — Token definitions (colors, spacing, icons)

---

## Support

For questions or to add new icons:
1. Check ICON_SYSTEM.md for existing icons
2. Add new icon to lib/icons.tsx following the pattern
3. Export in default object
4. Update designTokens.ts if new colors needed

---

**Last Updated**: April 3, 2026  
**Status**: ✅ Production Ready  
**Coverage**: 40+ icons across 8 categories  
**Stitch Sync**: Manual (update designTokens when Stitch design changes)
