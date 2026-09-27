import type { FC, SVGProps } from 'react';
import {
  SiInstagram,
  SiFacebook,
  SiTiktok,
  SiX,
} from '@icons-pack/react-simple-icons';

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

export const Instagram = (props: SocialIconProps) => (
  <SiInstagram {...props} />
);

export const Facebook = (props: SocialIconProps) => (
  <SiFacebook {...props} />
);

export const TikTok = (props: SocialIconProps) => (
  <SiTiktok {...props} />
);

export const X = (props: SocialIconProps) => (
  <SiX {...props} />
);

export const Linkedin = createIcon('Linkedin', (
  <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width={4} height={12} x={2} y={9} />
    <circle cx={4} cy={4} r={2} />
  </>
));