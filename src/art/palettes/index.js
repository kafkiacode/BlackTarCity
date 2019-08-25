import { flatten } from 'ramda';

import * as niceColorPalettes from 'nice-color-palettes';

/**
 * Credits
 * https://www.colourlovers.com/palette/1741341/Cyberpunk_Roses
 * https://www.colourlovers.com/palette/2420454/cyberpunk
 * https://www.colourlovers.com/palette/571460/johnny_mnemonic
 * https://www.colourlovers.com/palette/2127848/CyberPunk
 */

export const cyberpunkRoses = [
  0x020314,
  0x5932e6,
  0x8632e6,
  0xb332e6,
  0xe032e6,
];
export const cyberpunk = [0x3d615f, 0x61d6c4, 0x71918c, 0x25343b, 0x212429];
export const johnnyMnemonic = [
  0x94f700,
  0xffd4ff,
  0xde00a6,
  0x470047,
  0x000000,
];
export const CyberPunk = [0x00f9ff, 0xd900ff, 0x14ff00, 0xff00ef, 0x000000];
export const palettes = [cyberpunkRoses, cyberpunk, johnnyMnemonic, CyberPunk];

export const palettesNoBlack = palettes.map((colors) =>
  colors.filter((d) => d !== 0),
);

export const allCyberpunkColors = flatten(palettes);
export const cyberpunkColorsNoBlack = allCyberpunkColors.filter((d) => d !== 0);

export { niceColorPalettes };
