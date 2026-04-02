# Icon System Documentation

## Overview

The World Class Dev Journey Tracker uses a **centralized, design-system-aligned icon library** built with SVG and synced to Stitch design tokens.

All icons:
- ✅ Use semantic colors from `designTokens.ts`
- ✅ Follow consistent sizing (xs–xl)
- ✅ Support stroke weight customization
- ✅ Include ARIA labels for accessibility
- ✅ Are type-safe (TypeScript interfaces)

---

## Icon Library Structure

**File**: `lib/icons.tsx`

### Exports by Category

#### Navigation Icons
```typescript
import { IconHome, IconMapPin, IconBrain, IconBook } from '@/lib/icons';

// Usage
<IconHome size="md" color="primary" />
<IconMapPin size="lg" />
<IconBrain />
<IconBook size="sm" color="text_secondary" />
```

| Icon | Usage | Size Default |
|------|-------|---|
| `IconHome` | Dashboard navigation | md |
| `IconMapPin` | Roadmap navigation | md |
| `IconBrain` | DSA tracker navigation | md |
| `IconBook` | Weekly log navigation | md |

#### Action Icons
```typescript
import { 
  IconPlus, IconTrash, IconEdit, 
  IconCheck, IconX, IconChevronDown, IconChevronRight 
} from '@/lib/icons';

<IconPlus size="sm" />           {/* Add button */}
<IconTrash color="error" />      {/* Delete action */}
<IconEdit color="primary" />     {/* Edit action */}
<IconCheck color="secondary" />  {/* Confirm action */}
<IconX size="xs" />              {/* Close modal */}
```

#### Status & Indicator Icons
```typescript
import { 
  IconCircle, IconCheckCircle, IconAlertCircle, IconClock 
} from '@/lib/icons';

<IconCheckCircle color="secondary" />  {/* Completed */}
<IconAlertCircle color="error" />      {/* Alert state */}
<IconClock color="text_secondary" />   {/* Time tracking */}
```

#### User & Auth Icons
```typescript
import { IconUser, IconLogOut, IconGithub } from '@/lib/icons';

<IconGithub size="xl" />        {/* GitHub sign-in */}
<IconUser size="md" />          {/* User profile */}
<IconLogOut color="text_secondary" />  {/* Sign out */}
```

#### Data & Analytics Icons
```typescript
import { IconBarChart, IconTrendingUp, IconFilter } from '@/lib/icons';

<IconBarChart color="primary" />   {/* Statistics display */}
<IconTrendingUp color="secondary" /> {/* Progress indicator */}
<IconFilter size="sm" />           {/* Filter button */}
```

#### Content Icons
```typescript
import { 
  IconLink, IconExternalLink, IconCode, IconSearch 
} from '@/lib/icons';

<IconLink />              {/* Internal link */}
<IconExternalLink />      {/* LeetCode / NC link badges */}
<IconCode color="primary" />  {/* Code references */}
<IconSearch size="lg" />  {/* Search box */}
```

#### Special Icons
```typescript
import { IconPhase, IconBadge, IconSpinner } from '@/lib/icons';

// Phase badges (1-4) with semantic colors
<IconPhase phase={1} size="lg" />  {/* Blue phase 1 */}
<IconPhase phase={2} />             {/* Emerald phase 2 */}
<IconPhase phase={3} />             {/* Purple phase 3 */}
<IconPhase phase={4} />             {/* Orange phase 4 */}

// Loading state
<IconSpinner color="primary" />

// Combined icon + label badge
<IconBadge 
  icon={IconCheck} 
  label="Completed" 
  color="secondary" 
  size="md" 
/>
```

---

## Icon Properties

All icons accept these props:

```typescript
interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: keyof typeof colors | 'current';
  filled?: boolean;
  className?: string;
  'aria-label'?: string;
}
```

### Size Scale

| Size | Pixel | Tailwind Class |
|------|-------|---|
| `xs` | 12px | `w-3 h-3` |
| `sm` | 16px | `w-4 h-4` |
| `md` | 24px | `w-6 h-6` |
| `lg` | 32px | `w-8 h-8` |
| `xl` | 40px | `w-10 h-10` |

### Color Options

Colors map to `designTokens.ts` semantic colors:

```typescript
'primary'         // #89ceff (Sky blue — main accent)
'secondary'       // #4edea3 (Emerald — success/complete)
'text_primary'    // #dce1fb (Primary text)
'text_secondary'  // #bec8d2 (Secondary text)
'error'           // #ffb4ab (Error states)
'current'         // Inherit from parent (default)
```

---

## Usage Examples

### In Navigation (Sidebar)

```typescript
// components/Sidebar.tsx
import { IconHome, IconMapPin, IconBrain, IconBook } from '@/lib/icons';

const navItems = [
  { href: '/', icon: IconHome, label: 'Dashboard' },
  { href: '/roadmap', icon: IconMapPin, label: 'Roadmap' },
  { href: '/dsa', icon: IconBrain, label: 'DSA' },
  { href: '/log', icon: IconBook, label: 'Weekly Log' },
];

export default function Sidebar() {
  return (
    <nav className="flex gap-6">
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href} className="flex items-center gap-2">
          <Icon size="md" color="current" className="group-hover:text-primary transition-colors" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
```

### In Action Buttons

```typescript
// Example: Delete button with confirmation
import { IconTrash } from '@/lib/icons';

export function DeleteButton() {
  const [confirming, setConfirming] = useState(false);
  
  if (confirming) {
    return (
      <div className="flex gap-2">
        <button className="text-sm px-3 py-1 bg-rose-500 text-white rounded">
          Confirm Delete
        </button>
        <button onClick={() => setConfirming(false)} className="text-sm px-3 py-1 bg-slate-700">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirming(true)}>
      <IconTrash size="sm" color="error" />
    </button>
  );
}
```

### In Status Indicators

```typescript
// Example: Task completion status
import { IconCheckCircle, IconCircle } from '@/lib/icons';

interface TaskProps {
  completed: boolean;
}

export function Task({ completed }: TaskProps) {
  return (
    <div className="flex items-center gap-3">
      {completed ? (
        <IconCheckCircle size="md" color="secondary" />
      ) : (
        <IconCircle size="md" color="text_secondary" />
      )}
      <span className={completed ? 'line-through text-text_secondary' : 'text-text_primary'}>
        Complete task
      </span>
    </div>
  );
}
```

### In Phase Badges

```typescript
// Example: Phase display in week cards
import { IconPhase } from '@/lib/icons';

export function PhaseIndicator({ phase }: { phase: 1 | 2 | 3 | 4 }) {
  const phaseText = {
    1: 'Core Sharpening',
    2: 'Full-Stack',
    3: 'AI/ML Deep Dive',
    4: 'Data Engineering',
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg">
      <IconPhase phase={phase} size="lg" />
      <div>
        <p className="text-xs text-slate-500">Phase {phase}</p>
        <p className="text-sm font-semibold text-slate-50">{phaseText[phase]}</p>
      </div>
    </div>
  );
}
```

### In Loading States

```typescript
// Example: Async action button
import { IconSpinner } from '@/lib/icons';

export function SubmitButton() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      await someAsyncTask();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handleSubmit} 
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-950 rounded-lg disabled:opacity-50"
    >
      {loading && <IconSpinner size="sm" />}
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  );
}
```

---

## Integrating with Stitch Design

The icon system is pre-configured with Stitch design tokens:

### Phase Colors (from Stitch)
```typescript
// Automatically synced from designTokens.ts
icons.phases = {
  1: { color: '#89ceff' },    // Primary blue
  2: { color: '#4edea3' },    // Secondary emerald
  3: { color: '#a78bfa' },    // Purple
  4: { color: '#fb923c' },    // Orange
}
```

### To Update Icon Colors:
1. Edit `lib/designTokens.ts` → `icons.colors` object
2. All components using `color` prop inherit changes
3. Example:
   ```typescript
   // Before
   export const icons = {
     colors: {
       primary: colors.primary,  // #89ceff
     }
   }
   
   // After (update Stitch primary)
   export const icons = {
     colors: {
       primary: '#00d4ff',  // New shade
     }
   }
   ```

---

## Creating Custom Icons

To add a new icon:

```typescript
// In lib/icons.tsx, add:
export function IconCustom({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Custom Icon">
      <path d="M... /* SVG path */" />
      {/* More SVG elements */}
    </Icon>
  );
}

// Export in default object
export default {
  // ... existing icons
  IconCustom,
};
```

Then import and use:
```typescript
import { IconCustom } from '@/lib/icons';

<IconCustom size="lg" color="primary" />
```

---

## Accessibility

All icons include:
- ✅ `aria-label` attributes (auto-generated from usage)
- ✅ `stroke="currentColor"` (respects text color on parent)
- ✅ Semantic SVG structure (no presentational divs)
- ✅ High contrast with dark theme backgrounds

### Best Practices
- Always use meaningful `size` and `color` props
- In interactive elements, pair icons with text labels
- For icon-only buttons, provide `aria-label` via HTML:
  ```typescript
  <button aria-label="Delete" title="Delete item">
    <IconTrash size="sm" />
  </button>
  ```

---

## Performance Notes

- All icons are **inline SVG** (no external requests)
- Icons are **tree-shakeable** via named exports
- No icon files or assets to load
- **Automatic sizing** via Tailwind classes (no custom CSS)

---

## Icon Library Maintenance

The icon library is maintained via:

1. **Token updates**: Changes to `designTokens.ts` → `icons` section
2. **New icons**: Add to `lib/icons.tsx` and default export
3. **Stitch sync**: Periodically audit icon colors against Stitch design system

---

## Quick Reference

```typescript
// Import specific icons
import { IconHome, IconTrash, IconCheck, IconSpinner } from '@/lib/icons';

// Use with sizing and colors
<IconHome size="md" />
<IconTrash size="sm" color="error" />
<IconCheck color="secondary" />
<IconSpinner size="md" className="animate-spin" />

// Phase indicators
<IconPhase phase={1} size="lg" />

// Combined badge
<IconBadge icon={IconCheck} label="Done" color="secondary" size="md" />
```

---

**Last Updated**: April 3, 2026  
**Framework**: Next.js 14 + React 18  
**Design System**: Stitch (Dark Editorial Theme)  
**Icon Format**: Inline SVG with TypeScript interfaces
