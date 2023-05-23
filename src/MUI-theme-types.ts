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
    [key: number]: string;
  }
  interface Palette {
    tertiary: PaletteColor;
  }
}

declare module "@mui/material" {
  interface ButtonPropsVariantOverrides {
    filled_primary: true;
    outlined_primary: true;
  }
  interface ButtonPropsColorOverrides {
    error: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    link: true;
  }
}
