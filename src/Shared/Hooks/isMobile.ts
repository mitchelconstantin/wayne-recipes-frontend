import { useTheme, useMediaQuery } from "@material-ui/core";

export const useMobileQuery = (): boolean => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return isMobile;
};
