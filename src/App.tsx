import { createContext } from "react";
import { Header } from "./Header/Header";
import { UpdateRecipe } from "./UpdateRecipe/UpdateRecipe";
import { ShoppingList } from "./ShoppingList/ShoppingList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./AllRecipes/Home";
import { Login } from "./AccountComponents/Login";
import { RecipeDisplay } from "./ShowRecipe/RecipeDisplay";
import { AdminDashboard } from "./AdminDashboard/AdminDashboard";
import { SignUp } from "./AccountComponents/SignUp";
import {
  PrivateRoute,
  AdminRoute,
  PublicRoute,
  OwnerRoute,
} from "./Shared/Components/customRoutes/CustomRoutes";
import { useDarkThemeEnabled } from "./Shared/Hooks/darkTheme";
import {
  Theme,
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import { getTheme } from "./Shared/theme";
import { SnackbarContainer } from "./Shared/SnackbarService";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

type ContextProps = {
  darkThemeEnabled: boolean;
  toggleDarkThemeEnabled?: () => void;
};
export const DarkThemeContext = createContext<ContextProps>({
  darkThemeEnabled: false,
});

export const App = () => {
  const { darkThemeEnabled, toggleDarkThemeEnabled } = useDarkThemeEnabled();
  return (
    <BrowserRouter>
      <DarkThemeContext.Provider
        value={{ darkThemeEnabled, toggleDarkThemeEnabled }}
      >
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={getTheme(darkThemeEnabled)}>
            <CssBaseline />
            <SnackbarContainer />
            <Header />
            <Routes>
              <Route path="/login" element={<PublicRoute element={<Login />} />} />
              <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
              <Route path="/all" element={<Home />} />
              <Route path="/r/:recipeId" element={<RecipeDisplay />} />
              <Route path="/list" element={<PrivateRoute element={<ShoppingList />} />} />
              <Route path="/new" element={<AdminRoute element={<UpdateRecipe />} />} />
              <Route path="/r/:recipeId/edit" element={<AdminRoute element={<UpdateRecipe />} />} />
              <Route path="/dashboard" element={<OwnerRoute element={<AdminDashboard />} />} />
              <Route path="/" element={<Navigate to="/all" replace />} />
            </Routes>
          </ThemeProvider>
        </StyledEngineProvider>
      </DarkThemeContext.Provider>
    </BrowserRouter>
  );
};
