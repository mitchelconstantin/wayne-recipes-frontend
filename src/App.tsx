import React, { createContext } from "react";
import "./App.css";
import { Header } from "./Header/Header";
import { UpdateRecipe } from "./UpdateRecipe/UpdateRecipe";
import { ShoppingList } from "./ShoppingList/ShoppingList";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { getTheme } from "./Shared/theme";
import { SnackbarContainer } from "./Shared/SnackbarService";

type ContextProps = {
  darkThemeEnabled: boolean;
  toggleDarkThemeEnabled?: () => void;
};
export const DarkThemeContext = createContext<ContextProps>({
  darkThemeEnabled: false,
});

export const App = () => {
  const [darkThemeEnabled, toggleDarkThemeEnabled] = useDarkThemeEnabled();
  return (
    <BrowserRouter>
      <DarkThemeContext.Provider
        value={{ darkThemeEnabled, toggleDarkThemeEnabled }}
      >
        <ThemeProvider theme={getTheme(darkThemeEnabled)}>
          <CssBaseline />
          <SnackbarContainer />
          <Header />
          <Switch>
            <PublicRoute
              path="/login"
              render={(props: any) => <Login {...props} />}
            />
            <PublicRoute
              path="/signup"
              render={(props: any) => <SignUp {...props} />}
            />
            <Route
              exact
              path="/all"
              render={(props: any) => <Home {...props} />}
            />
            <Route
              exact
              path="/r/:recipeId"
              render={(props: any) => <RecipeDisplay {...props} />}
            />
            <PrivateRoute
              path="/list"
              render={(props: any) => <ShoppingList {...props} />}
            />
            <AdminRoute
              path="/new"
              render={(props: any) => <UpdateRecipe {...props} />}
            />
            <AdminRoute
              path="/r/:recipeId/edit"
              render={(props: any) => <UpdateRecipe {...props} />}
            />
            <OwnerRoute
              path="/dashboard"
              render={(props: any) => <AdminDashboard {...props} />}
            />
            <Redirect from="/" to="/all" />
          </Switch>
        </ThemeProvider>
      </DarkThemeContext.Provider>
    </BrowserRouter>
  );
};
