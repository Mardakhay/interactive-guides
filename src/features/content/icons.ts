import {
  Compass,
  Globe,
  Code2,
  Atom,
  Palette,
  Wrench,
  ShieldCheck,
  Lock,
  Database,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Compass,
  Globe,
  Code2,
  Atom,
  Palette,
  Wrench,
  ShieldCheck,
  Lock,
  Database,
};

export function getCategoryIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Compass;
}
