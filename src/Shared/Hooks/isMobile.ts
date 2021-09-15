import { useTheme, useMediaQuery } from "@mui/material";

export const useMobileQuery = (): boolean =>
  useMediaQuery(useTheme().breakpoints.down("md"));
