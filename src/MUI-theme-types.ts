/* eslint-disable */
// @ts-ignore
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";
// @ts-ignore
import { ButtonPropsVariantOverrides } from "@mui/material/Button/Button";
// @ts-ignore
import { ButtonPropsColorOverrides } from "@mui/material";
// @ts-ignore
import { TypographyPropsVariantOverrides } from "@mui/material/Typography/Typography";
/* eslint-enable */

// Check disabling shenanigans required to import types to update below. Without those imports, which are not used directly, it doesn't work.

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number | string]: string;
  }
  interface TypeBackground {
    light: string;
    dark: string;
  }
  interface Palette {
    tertiary: PaletteColor;
    basic: PaletteColor;
  }
}

declare module "@mui/material" {
  interface ButtonPropsVariantOverrides {
    filled_primary: true;
    outlined_primary: true;
  }
  interface ButtonPropsColorOverrides {
    error: true;
    reverse: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    link: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsVariantOverrides {
    custom_light: true;
  }
}
