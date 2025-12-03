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
  atomDark,
  base16AteliersulphurpoolLight,
  coldarkCold,
  coldarkDark,
  gruvboxDark,
  gruvboxLight,
  materialDark,
  materialOceanic,
  nord,
  oneDark,
  oneLight,
  prism,
  solarizedDarkAtom,
  tomorrow,
  twilight,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

type SupportedThmesType = {
  name: string;
  import: unknown;
  value: string;
};

export const supportedThemes: SupportedThmesType[] = [
  { name: 'Dracula', value: 'dracula', import: dracula },
  { name: 'Atom Dark', value: 'atomDark', import: atomDark },
  { name: 'Coy', value: 'coy', import: coy },
  { name: 'Darcula', value: 'darcula', import: darcula },
  { name: 'Material Dark', value: 'materialDark', import: materialDark },
  { name: 'Material Light', value: 'materialLight', import: materialLight },
  { name: 'Okaidia', value: 'okaidia', import: okaidia },
  { name: 'One Dark', value: 'oneDark', import: oneDark },
  { name: 'One Light', value: 'oneLight', import: oneLight },
  { name: 'Night Owl', value: 'nightOwl', import: nightOwl },
  {
    name: 'Base16 Atelier Sulphurpool Light',
    value: 'base16AteliersulphurpoolLight',
    import: base16AteliersulphurpoolLight,
  },
  { name: 'Coldark Cold', value: 'coldarkCold', import: coldarkCold },
  { name: 'Coldark Dark', value: 'coldarkDark', import: coldarkDark },
  { name: 'Gruvbox Dark', value: 'gruvboxDark', import: gruvboxDark },
  { name: 'Gruvbox Light', value: 'gruvboxLight', import: gruvboxLight },
  {
    name: 'Material Oceanic',
    value: 'materialOceanic',
    import: materialOceanic,
  },
  { name: 'Nord', value: 'nord', import: nord },
  { name: 'Prism', value: 'prism', import: prism },
  {
    name: 'Solarized Dark Atom',
    value: 'solarizedDarkAtom',
    import: solarizedDarkAtom,
  },
  { name: 'Solarized Light', value: 'solarizedlight', import: solarizedlight },
  { name: 'Tomorrow', value: 'tomorrow', import: tomorrow },
  { name: 'Twilight', value: 'twilight', import: twilight },
  { name: 'VSC Dark Plus', value: 'vscDarkPlus', import: vscDarkPlus },
];

export const groupedThemes = [
  {
    label: 'Light Themes',
    options: [
      { label: 'Coy', value: 'coy' },
      { label: 'Material Light', value: 'materialLight' },
      { label: 'One Light', value: 'oneLight' },
      {
        label: 'Base16 Atelier Sulphurpool Light',
        value: 'base16AteliersulphurpoolLight',
      },
      { label: 'Coldark Cold', value: 'coldarkCold' },
      { label: 'Gruvbox Light', value: 'gruvboxLight' },
      {
        label: 'Solarized Light',
        value: 'solarizedlight',
      },
    ],
  },
  {
    label: 'Dark Themes',
    options: [
      { label: 'Dracula', value: 'dracula' },
      { label: 'Atom Dark', value: 'atomDark' },
      { label: 'Darcula', value: 'darcula' },
      { label: 'Material Dark', value: 'materialDark' },
      { label: 'Okaidia', value: 'okaidia' },
      { label: 'One Dark', value: 'oneDark' },
      { label: 'Night Owl', value: 'nightOwl' },
      { label: 'Coldark Dark', value: 'coldarkDark' },
      { label: 'Gruvbox Dark', value: 'gruvboxDark' },
      {
        label: 'Material Oceanic',
        value: 'materialOceanic',
      },
      { label: 'Nord', value: 'nord' },
      { label: 'Prism', value: 'prism' },
      {
        label: 'Solarized Dark Atom',
        value: 'solarizedDarkAtom',
      },
      { label: 'Tomorrow', value: 'tomorrow' },
      { label: 'Twilight', value: 'twilight' },
      { label: 'VSC Dark Plus', value: 'vscDarkPlus' },
    ],
  },
];

export type PrismTheme = { [key: string]: CSSProperties };

export function getStyle(style: string | undefined): PrismTheme {
  const requestedStyle = supportedThemes.find((t) => t.value === style);
  return (requestedStyle?.import as PrismTheme) || dracula;
}
