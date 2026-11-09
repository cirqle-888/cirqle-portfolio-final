// Line icons drawn for Cirqle. One shape per service, so a label is never alone.
import type { ReactNode } from 'react';

interface IconProps {
  size?: number;
  width?: number;
  children: ReactNode;
}

function Icon({ size = 20, width = 1.8, children }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <Icon size={size} width={2.2}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Icon>
);

export const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <Icon size={size} width={2.2}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);

export const Check = ({ size = 14 }: { size?: number }) => (
  <Icon size={size} width={3}>
    <path d="m5 12 5 5L20 7" />
  </Icon>
);

export const MenuLines = ({ size = 18 }: { size?: number }) => (
  <Icon size={size} width={2}>
    <path d="M4 8h16" />
    <path d="M4 16h16" />
  </Icon>
);

export const CloseX = ({ size = 22 }: { size?: number }) => (
  <Icon size={size} width={2}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </Icon>
);

const DIVISION_SHAPES: Record<string, ReactNode> = {
  creative: (
    <>
      <path d="M12 19l7-7 3 3-7 7z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" />
      <path d="M2 2l7.6 7.6" />
    </>
  ),
  digital: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </>
  ),
  accounts: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8" />
      <path d="M8 11h2" />
      <path d="M14 11h2" />
      <path d="M8 15h2" />
      <path d="M14 15h2" />
      <path d="M8 19h8" />
    </>
  ),
};

const SERVICE_SHAPES: Record<string, ReactNode> = {
  Branding: (
    <>
      <circle cx="7.5" cy="7.5" r="4" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
      <path d="M17 3l4 7h-8z" />
    </>
  ),
  Design: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="m21 15-5-5L5 21" />
    </>
  ),
  'Print & Promotions': (
    <>
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v8H6z" />
    </>
  ),
  Video: (
    <>
      <rect x="2" y="5" width="14" height="14" rx="3" />
      <path d="m22 8-6 4 6 4z" />
    </>
  ),
  'Social Media': <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />,
  Websites: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
    </>
  ),
  'Meta Ads': (
    <>
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </>
  ),
  Content: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </>
  ),
  GST: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-7h6v7" />
    </>
  ),
  'Income Tax': (
    <>
      <path d="M19 5 5 19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </>
  ),
  'TDS & TCS': (
    <>
      <path d="M4 2v20l2.5-1.5L9 22l3-1.5 3 1.5 2.5-1.5L20 22V2z" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h4" />
    </>
  ),
  'MIS Reports': (
    <>
      <path d="M3 3v18h18" />
      <path d="M8 17v-5" />
      <path d="M13 17V8" />
      <path d="M18 17v-9" />
    </>
  ),
  'MCA Works': (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 10h6" />
    </>
  ),
  Bookkeeping: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </>
  ),
  Person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  Circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M3 12h18" />
    </>
  ),
  Grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M17.5 14v7" />
      <path d="M14 17.5h7" />
    </>
  ),
  Mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

export function DivisionIcon({ division, size = 24 }: { division: string; size?: number }) {
  return (
    <Icon size={size} width={1.7}>
      {DIVISION_SHAPES[division] ?? SERVICE_SHAPES.Circle}
    </Icon>
  );
}

export function ServiceIcon({ name, size = 16 }: { name: string; size?: number }) {
  const shape = SERVICE_SHAPES[name];
  if (!shape) return null;
  return (
    <Icon size={size} width={1.8}>
      {shape}
    </Icon>
  );
}
