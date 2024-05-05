import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import React from 'react';

type Keys = keyof typeof LucideIcons;
type IconName = Exclude<Keys, 'icons' | 'createLucideIcon' | 'LucideIcon'>;

type IconProps = LucideProps & {
  name: IconName;
};

export const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent: React.ElementType = LucideIcons[name];

  return <IconComponent {...props} />;
};
