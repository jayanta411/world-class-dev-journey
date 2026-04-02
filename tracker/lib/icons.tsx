/**
 * Icon Library for World Class Dev Journey Tracker
 * Synced with Stitch Design System
 * 
 * Icons follow the design system's principles:
 * - 24px base size (can be scaled via w/h classes)
 * - Consistent stroke width (2px for outlines)
 * - Dark theme optimized (uses semantic colors from designTokens)
 * - Accessible: ARIA labels and semantic HTML
 */

import React from 'react';
import { colors } from './designTokens';

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Maps to Tailwind w-h sizes
  color?: keyof typeof colors | 'current'; // Use designTokens colors or inherit
  filled?: boolean; // Solid fill vs outline
  className?: string;
  'aria-label'?: string;
}

const sizeMap = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
};

const colorMap: Record<string, string> = {
  primary: colors.primary,
  secondary: colors.secondary,
  text_primary: colors.onSurface,
  text_secondary: colors.onSurfaceVariant,
  error: colors.error,
  current: 'currentColor',
};

function getColorHex(colorKey?: string): string {
  if (!colorKey || colorKey === 'current') return 'currentColor';
  return colorMap[colorKey as string] || 'currentColor';
}

/**
 * Base Icon Wrapper
 * All icons use this wrapper for consistency
 */
function Icon({
  size = 'md',
  color = 'current',
  className = '',
  viewBox = '0 0 24 24',
  children,
  ...props
}: IconProps & { viewBox?: string; children: React.ReactNode }) {
  const sizeClass = sizeMap[size];
  const strokeColor = getColorHex(color as string);

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </svg>
  );
}

// ─── Core Navigation Icons ────────────────────────────────────────────────────

export function IconHome({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Home">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </Icon>
  );
}

export function IconMapPin({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Roadmap">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}

export function IconBrain({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="DSA">
      <path d="M9.59 4.59A2 2 0 1 1 7.41 6.75L4 10m15-3.59A2 2 0 0 0 17 5.25L20 8.29" />
      <path d="M12 12v.01M12 16v.01M9 20h6a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" />
    </Icon>
  );
}

export function IconBook({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Weekly Log">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </Icon>
  );
}

// ─── Action Icons ────────────────────────────────────────────────────────────

export function IconPlus({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Add">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  );
}

export function IconTrash({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Delete">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </Icon>
  );
}

export function IconEdit({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Edit">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </Icon>
  );
}

export function IconCheck({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Complete">
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
}

export function IconX({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Close">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
}

export function IconChevronDown({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Expand">
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  );
}

export function IconChevronRight({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Next">
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  );
}

// ─── Status & Indicator Icons ────────────────────────────────────────────────

export function IconCircle({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Status">
      <circle cx="12" cy="12" r="10" />
    </Icon>
  );
}

export function IconCheckCircle({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Completed">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </Icon>
  );
}

export function IconAlertCircle({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Alert">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </Icon>
  );
}

export function IconClock({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Time">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </Icon>
  );
}

// ─── User & Auth Icons ──────────────────────────────────────────────────────

export function IconUser({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="User">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  );
}

export function IconLogOut({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Sign Out">
      <path d="M10 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
      <polyline points="17 16 21 12 17 8" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </Icon>
  );
}

export function IconGithub({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="GitHub" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </Icon>
  );
}

// ─── Data & Analytics Icons ─────────────────────────────────────────────────

export function IconBarChart({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Statistics">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </Icon>
  );
}

export function IconTrendingUp({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Progress">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
      <polyline points="17 6 23 6 23 12" />
    </Icon>
  );
}

export function IconFilter({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Filter">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </Icon>
  );
}

// ─── Content Icons ──────────────────────────────────────────────────────────

export function IconLink({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Link">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Icon>
  );
}

export function IconExternalLink({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="External Link">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Icon>
  );
}

export function IconCode({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Code">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Icon>
  );
}

export function IconSearch({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon size={size} color={color} {...props} aria-label="Search">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </Icon>
  );
}

// ─── Phase & Badge Icons ────────────────────────────────────────────────────

/**
 * Phase badge icons with semantic colors from designTokens
 */
export function IconPhase({
  phase,
  size = 'md',
  ...props
}: IconProps & { phase: 1 | 2 | 3 | 4 }) {
  const phaseColors: Record<number, string> = {
    1: '#89ceff',       // Sky blue (primary)
    2: '#4edea3',       // Emerald (secondary)
    3: '#d4a5ff',       // Purple
    4: '#f59e0b',       // Orange
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill={phaseColors[phase]}
      className={`${sizeMap[size]} ${props.className || ''}`}
      aria-label={`Phase ${phase}`}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        fontFamily="Space Grotesk, monospace"
      >
        {phase}
      </text>
    </svg>
  );
}

// ─── Icon Combination Components ─────────────────────────────────────────────

/**
 * Badge icon with text label
 */
export function IconBadge({
  icon: Icon,
  label,
  color = 'primary',
  size = 'md',
}: {
  icon: React.ComponentType<IconProps>;
  label: string;
  color?: keyof typeof colors;
  size?: 'sm' | 'md' | 'lg';
}) {
  const classes = {
    sm: 'gap-1 px-2 py-1 text-xs',
    md: 'gap-1.5 px-3 py-1.5 text-sm',
    lg: 'gap-2 px-4 py-2 text-base',
  };

  return (
    <div className={`inline-flex items-center ${classes[size]} rounded-full bg-slate-800/50`}>
      <Icon size="sm" color={color} />
      <span className="text-slate-200">{label}</span>
    </div>
  );
}

/**
 * Icon with loading spinner animation
 */
export function IconSpinner({ size = 'md', color = 'current', ...props }: IconProps) {
  return (
    <Icon
      size={size}
      color={color}
      className="animate-spin"
      {...props}
      aria-label="Loading"
    >
      <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="0" />
    </Icon>
  );
}

export default {
  // Navigation
  IconHome,
  IconMapPin,
  IconBrain,
  IconBook,

  // Actions
  IconPlus,
  IconTrash,
  IconEdit,
  IconCheck,
  IconX,
  IconChevronDown,
  IconChevronRight,

  // Status
  IconCircle,
  IconCheckCircle,
  IconAlertCircle,
  IconClock,

  // User
  IconUser,
  IconLogOut,
  IconGithub,

  // Data
  IconBarChart,
  IconTrendingUp,
  IconFilter,

  // Content
  IconLink,
  IconExternalLink,
  IconCode,
  IconSearch,

  // Special
  IconPhase,
  IconBadge,
  IconSpinner,
};
