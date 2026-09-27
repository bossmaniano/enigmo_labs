import type { FC, SVGProps } from 'react';

interface SocialIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const createIcon = (name: string, paths: React.ReactNode): FC<SocialIconProps> => {
  const Component = (props: SocialIconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths}
    </svg>
  );
  Component.displayName = name;
  return Component;
};

export const Instagram = createIcon('Instagram', (
  <>
    <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1={17.5} x2={17.51} y1={6.5} y2={6.5} />
  </>
));

export const Facebook = createIcon('Facebook', (
  <>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </>
));

export const Linkedin = createIcon('Linkedin', (
  <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width={4} height={12} x={2} y={9} />
    <circle cx={4} cy={4} r={2} />
  </>
));

export const TikTok = createIcon('TikTok', (
  <>
    <path d="M15 8.5c-2 3.5-5 4-7 4.5" />
    <path d="M9.5 18c3.5-2 3-4.5 5-5.5" />
    <path d="M12 2c2 0 3 1 3 3v2c0 2-1 3-3 3" />
    <path d="M12 22c-2 0-3-1-3-3v-2c0-2 1-3 3-3" />
    <path d="M2 12c0-2 1-3 3-3h2c2 0 3 1 3 3" />
    <path d="M22 12c0 2-1 3-3 3h-2c-2 0-3-1-3-3" />
  </>
));