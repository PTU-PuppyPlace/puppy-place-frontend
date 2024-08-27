const theme = {
  // Color
  primary: {
    p100: '#6274F4',
    p80: '#8190F6',
    p50: '#B0B9F9',
    p30: '#D0D5FC',
    p20: '#E0E3FD',
  },

  pointBlue: '#2F35B7',
  pointOrange: '#FF8A35',

  danger: {
    d100: '#F53636',
    d40: '#FBAFAF',
  },

  success: '#2DCE89',

  gray: {
    g100: '#333',
    g80: '#5C5C5C',
    g60: '#858585',
    g40: '#ADADAD',
    g20: '#D6D6D6',
    g10: '#EBEBEB',
    g4: '#F6F6F6',
  },

  defaultButton: '#EBEBEB',

  background: '#F6F6F6',

  extraWhite: '#fff',
  extraBlack: '#000',
  
  // Typography
  // Weights
  bold: 700,
  medium: 400,
  regular: 200,

  // Sizes
  title24: '24px',
  title19: '19px',
  body17: '17px',
  body16: '16px',
  body15: '15px',
  body14: '14px',
  caption13: '13px',
  caption12: '12px',
  caption10: '10px',
  
}

export default theme;
export type ThemeType = typeof theme;
