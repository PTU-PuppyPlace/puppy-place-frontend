import theme from "./theme";

interface IStyles {
  [buttonType: string]: any;
}

interface IButtonStyles {
  [isAbled: string]: IStyles;
}

const able = {
  primary: {
    backgroundColor: theme.primary.p100,
    color: theme.extraWhite,
  },
  default: {
    backgroundColor: theme.defaultButton,
    color: theme.gray.g100,
  },
  outline: {
    backgroundColor: theme.extraWhite,
    color: theme.gray.g100,
    border: `2px ${theme.gray.g20} solid`,
  },
  dangerPrimary: {
    backgroundColor: theme.danger.d100,
    color: theme.extraWhite,
  },
  dangerSecondary: {
    backgroundColor: theme.extraWhite,
    color: theme.danger.d100,
    border: `2px ${theme.gray.g20} solid`,
  },
};

const disable = {
  primary: {
    backgroundColor: theme.primary.p50,
    color: theme.extraWhite,
  },
  default: {
    backgroundColor: theme.background,
    color: theme.gray.g40,
  },
  outline: {
    backgroundColor: theme.extraWhite,
    color: theme.gray.g40,
    border: `2px ${theme.gray.g40} solid`,
  },
  dangerPrimary: {
    backgroundColor: theme.danger.d40,
    color: theme.extraWhite,
  },
  dangerSecondary: {
    backgroundColor: theme.extraWhite,
    color: theme.danger.d40,
    border: `2px ${theme.defaultButton} solid`,
  },
};

export const buttonStyles: IButtonStyles = {
  able,
  disable,
};
