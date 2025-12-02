import type { CSSProperties } from 'react';
// Theme imports
import {
  dracula,
  okaidia,
  nightOwl,
  darcula,
  coy,
  solarizedlight,
  materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

type SupportedThmesType = {
  name: string;
  import: unknown;
  value: string;
};

export const supportedThemes: SupportedThmesType[] = [
  { name: 'Coy', value: 'coy', import: coy },
  { name: 'Solarized Light', value: 'solarizedLight', import: solarizedlight },
  { name: 'Material Light', value: 'materialLight', import: materialLight },
  { name: 'Dracula', value: 'dracula', import: dracula },
  { name: 'Okaidia', value: 'okaidia', import: okaidia },
  { name: 'Night Owl', value: 'nightOwl', import: nightOwl },
  { name: 'Darcula', value: 'darcula', import: darcula },
];

export type PrismTheme = { [key: string]: CSSProperties };

export function getStyle(style: string | undefined): PrismTheme {
  const requestedStyle = supportedThemes.find((t) => t.value === style);
  return (requestedStyle?.import as PrismTheme) || dracula;
}
