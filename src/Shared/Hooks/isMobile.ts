import {
  // useTheme,
  useMediaQuery,
} from "@mui/material";

export const useMobileQuery = (): boolean => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = false;
  return isMobile;
};
