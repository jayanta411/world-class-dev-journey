/**
 * Stitch Design System Tokens — Imported from workspace MCP server
 * 
 * This is the single source of truth for all UI colors, spacing, and effects.
 * Changes here propagate globally via CSS variables and Tailwind utilities.
 * 
 * Source: Stitch MCP (@stitch.googleapis.com/mcp) Design System "World class dev journey dashboard"
 * Last synced: April 3, 2026
 */

// ─── Color Palette (from Stitch DesignTheme) ──────────────────────────────────
export const colors = {
  // Surfaces — layered depth model
  background: '#0c1324',       // Base / deepest layer
  surface: '#191f31',          // Primary surface
  surfaceHigh: '#23293c',      // Elevated card surface
  surfaceHighest: '#2e3447',   // Topmost layer (modals, dropdowns)
  
  // Text / On-surface
  onSurface: '#dce1fb',        // Primary text
  onSurfaceVariant: '#bec8d2', // Secondary text
  onSurfaceSubtle: '#88929b',  // Tertiary text (metadata)
  
  // Brand colors
  primary: '#89ceff',          // Electric blue (accent)
  primaryContainer: '#0ea5e9', // Strong blue
  secondary: '#4edea3',        // Emerald (success/complete)
  tertiary: '#d2c6a6',         // Warm neutral (warnings)
  
  // Semantic
  error: '#ffb4ab',
  errorContainer: '#93000a',
  
  // Interactive states
  outline: '#88929b',
  outlineVariant: '#3e4850',
} as const;

// ─── Spacing Scale ──────────────────────────────────────────────────────────
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem',  // 48px
  '4xl': '3.5rem', // 56px
  '5xl': '4rem',  // 64px
} as const;

// ─── Shadows (ambient, elevated) ───────────────────────────────────────────
export const shadows = {
  ambient: '0 20px 40px rgba(0, 0, 0, 0.3)',
  elevated: '0 8px 24px rgba(0, 0, 0, 0.4)',
  soft: '0 2px 8px rgba(0, 0, 0, 0.15)',
  glow: 'inset 0 1px 0 rgba(137, 206, 255, 0.16)',
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────
export const radius = {
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '1.75rem',   // 28px
  full: '9999px',  // Pill
} as const;

// ─── Semantic Token Maps (for composability) ──────────────────────────────
export const semantic = {
  background: colors.background,
  foreground: colors.onSurface,
  foregroundSecondary: colors.onSurfaceVariant,
  foregroundTertiary: colors.onSurfaceSubtle,
  
  surface: colors.surface,
  surfaceElevated: colors.surfaceHigh,
  surfaceOverlay: colors.surfaceHighest,
  
  accentPrimary: colors.primary,
  accentStrong: colors.primaryContainer,
  accentSuccess: colors.secondary,
  accentWarning: colors.tertiary,
  accentError: colors.error,
  
  border: colors.outlineVariant,
} as const;

// ─── Tailwind Utility Generator ────────────────────────────────────────────
/**
 * Generates Tailwind CSS variable references.
 * Used in globals.css to define CSS custom properties.
 */
export function getCSSVariables() {
  return {
    '--bg': colors.background,
    '--surface': colors.surface,
    '--surface-high': colors.surfaceHigh,
    '--surface-highest': colors.surfaceHighest,
    '--text': colors.onSurface,
    '--text-secondary': colors.onSurfaceVariant,
    '--text-tertiary': colors.onSurfaceSubtle,
    '--brand': colors.primary,
    '--brand-strong': colors.primaryContainer,
    '--accent': colors.secondary,
    '--warning': colors.tertiary,
    '--error': colors.error,
    '--outline': colors.outline,
    '--shadow': shadows.ambient,
  } as const;
}

// ─── Component Token Presets ──────────────────────────────────────────────
/**
 * Pre-composed tokens for common UI patterns.
 * Use these to keep component styling consistent with the system.
 */
export const components = {
  panel: {
    bg: `linear-gradient(180deg, ${colors.surfaceHigh}, ${colors.surface})`,
    border: colors.outlineVariant,
    shadow: shadows.ambient,
    radius: radius.xl,
  },
  button: {
    primary: {
      bg: colors.primaryContainer,
      text: colors.background,
      hover: colors.primary,
    },
    secondary: {
      bg: colors.surfaceHigh,
      text: colors.onSurface,
      border: colors.outlineVariant,
    },
  },
  input: {
    bg: colors.surface,
    text: colors.onSurface,
    border: colors.outlineVariant,
    focusRing: colors.primary,
  },
  badge: {
    phase1: { bg: 'rgba(137, 206, 255, 0.15)', text: 'rgb(147, 197, 253)', border: 'rgba(137, 206, 255, 0.3)' },
    phase2: { bg: 'rgba(78, 222, 163, 0.15)', text: 'rgb(110, 231, 183)', border: 'rgba(78, 222, 163, 0.3)' },
    phase3: { bg: 'rgba(167, 139, 250, 0.15)', text: 'rgb(196, 181, 253)', border: 'rgba(167, 139, 250, 0.3)' },
    phase4: { bg: 'rgba(251, 146, 60, 0.15)', text: 'rgb(253, 186, 116)', border: 'rgba(251, 146, 60, 0.3)' },
  },
} as const;

// ─── Iconography (SVG-based, semantically synced) ────────────────────────
/**
 * Icon sizing and color semantics aligned with Stitch design tokens.
 * Icons are defined in lib/icons.tsx and use these styling guidelines.
 */
export const icons = {
  // Size scale: matches Tailwind w-*/h-* utilities
  sizes: {
    xs: '12px',   // w-3 h-3
    sm: '16px',   // w-4 h-4
    md: '24px',   // w-6 h-6
    lg: '32px',   // w-8 h-8
    xl: '40px',   // w-10 h-10
  },
  
  // Color semantics: use design tokens for consistency
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    text: colors.onSurface,
    textSecondary: colors.onSurfaceVariant,
    disabled: colors.onSurfaceSubtle,
    error: colors.error,
    warning: colors.tertiary,
    link: colors.primary,
  },

  // Stroke styles: maintain visual hierarchy
  stroke: {
    regular: 2,    // Standard icon stroke
    bold: 2.5,     // Emphasis icons
    light: 1.5,    // Subtle background icons
  },

  // Phase-specific colors (badges, indicators)
  phases: {
    1: { bg: 'rgba(137, 206, 255, 0.15)', color: '#89ceff', text: '#dce1fb' },
    2: { bg: 'rgba(78, 222, 163, 0.15)', color: '#4edea3', text: '#dce1fb' },
    3: { bg: 'rgba(167, 139, 250, 0.15)', color: '#a78bfa', text: '#dce1fb' },
    4: { bg: 'rgba(251, 146, 60, 0.15)', color: '#fb923c', text: '#dce1fb' },
  },

  // Animation presets
  animations: {
    spin: 'animate-spin',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
  },
} as const;

// ─── Export for SSR / server-side rendering ──────────────────────────────
export default {
  colors,
  spacing,
  shadows,
  radius,
  semantic,
  components,
  icons,
};
