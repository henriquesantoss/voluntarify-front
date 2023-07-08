import {
  animations,
  animationTimings,
  breakpoints,
  colors,
  effects,
  layers,
  shapes,
  spacings,
  typography,
  transitions,
} from 'styles/tokens'

export const theme = {
  title: 'main',

  colors: {
    primary: {
      lighter: colors.purple[25],
      xxxlight: colors.purple[50],
      xxlight: colors.purple[100],
      xlight: colors.purple[200],
      light: colors.purple[300],
      main: colors.purple[400],
      contrast: colors.purple[500],
      dark: colors.purple[600],
      darker: colors.purple[700],
      hover: colors.purple[600],
      active: colors.purple[600],
    },

    secondary: {
      lighter: colors.pink[300],
      light: colors.pink[400],
      main: colors.pink[500],
      dark: colors.pink[600],
    },

    neutral: {
      white: colors.white,
      xxlight: colors.gray[20],
      xlight: colors.gray[25],
      light: colors.gray[50],
      medium: colors.gray[200],
      dark: colors.gray[300],
      black: colors.black,
    },

    text: {
      xlight: colors.gray[50],
      light: colors.white,
      main: colors.gray[300],
      xmain: colors.gray[500],
      dark: colors.black,
      mutted: colors.gray[200],
      contrast: colors.purple[500],
      darkPrimary: colors.purple[600],
      error: colors.red[600],
      success: colors.green[500],
      warn: colors.orange[300],
      primary: colors.purple[400],
    },

    info: {
      xlight: colors.blue[300],
      light: colors.blue[400],
      contrast: colors.blue[350],
      main: colors.blue[500],
      dark: colors.blue[600],
      darker: colors.blue[700],
    },

    success: {
      xlight: colors.green[300],
      light: colors.green[400],
      main: colors.green[500],
      dark: colors.green[600],
    },

    warning: {
      light: colors.yellow[100],
      main: colors.yellow[200],
      dark: colors.yellow[300],
      darker: colors.yellow[400],
    },

    error: {
      light: colors.red[100],
      main: colors.red[300],
      dark: colors.red[600],
      darker: colors.red[700],
    },

    background: {
      dark: colors.gray[25],
      main: colors.background,
      light: colors.white,
    },
  },
  animations,
  animationTimings,
  breakpoints,
  effects,
  layers,
  spacings,
  shapes,
  typography,
  transitions,
} as const
