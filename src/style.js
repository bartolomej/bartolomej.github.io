// https://coolors.co/1a1c1e-ff3860-c6b198-f7f7f2

const colors = {
  eerieBlack: 'rgba(26, 28, 30, 1)',
  radicalRed: 'rgb(255,56,96)',
  royalBlue: 'rgba(10, 36, 99, 1)',
  hkaki: 'rgba(198, 177, 152, 1)',
  babyPowder: 'rgba(247, 247, 242, 1)'
}

export const theme = {
  dark: colors.eerieBlack,
  vibrant: colors.radicalRed,
  primary: colors.royalBlue,
  lightText: colors.hkaki,
  light: colors.babyPowder
}

export function colorWithOpacity (color, opacity) {
  let [r, g, b] = color
    .substring(color.indexOf('(') + 1, color.indexOf(')'))
    .split(',').map(e => e.trim());
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
