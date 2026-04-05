import { createContext, lazy, Suspense, useEffect } from "react";
import { Header } from "./Header/Header";
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from "react-router-dom";
import {
  PrivateRoute,
  AdminRoute,
  PublicRoute,
  OwnerRoute,
} from "./Shared/Components/customRoutes/CustomRoutes";
import { useDarkThemeEnabled } from "./Shared/Hooks/darkTheme";
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import { getTheme } from "./Shared/theme";
import { SnackbarContainer } from "./Shared/SnackbarService";
import { Loading } from "./Shared/Components/Loading";

const Home = lazy(() => import("./AllRecipes/Home").then(m => ({ default: m.Home })));
const Login = lazy(() => import("./AccountComponents/Login").then(m => ({ default: m.Login })));
const SignUp = lazy(() => import("./AccountComponents/SignUp").then(m => ({ default: m.SignUp })));
const RecipeDisplay = lazy(() => import("./ShowRecipe/RecipeDisplay").then(m => ({ default: m.RecipeDisplay })));
const ShoppingList = lazy(() => import("./ShoppingList/ShoppingList").then(m => ({ default: m.ShoppingList })));
const UpdateRecipe = lazy(() => import("./UpdateRecipe/UpdateRecipe").then(m => ({ default: m.UpdateRecipe })));
const AdminDashboard = lazy(() => import("./AdminDashboard/AdminDashboard").then(m => ({ default: m.AdminDashboard })));

type ContextProps = {
  darkThemeEnabled: boolean;
  toggleDarkThemeEnabled?: () => void;
};
export const DarkThemeContext = createContext<ContextProps>({
  darkThemeEnabled: false,
});

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const RootLayout = () => (
  <>
    <ScrollToTop />
    <SnackbarContainer />
    <Header />
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  </>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/login", element: <PublicRoute element={<Login />} /> },
      { path: "/signup", element: <PublicRoute element={<SignUp />} /> },
      { path: "/all", element: <Home /> },
      { path: "/r/:recipeId", element: <RecipeDisplay /> },
      { path: "/list", element: <PrivateRoute element={<ShoppingList />} /> },
      { path: "/new", element: <AdminRoute element={<UpdateRecipe />} /> },
      { path: "/r/:recipeId/edit", element: <AdminRoute element={<UpdateRecipe />} /> },
      { path: "/dashboard", element: <OwnerRoute element={<AdminDashboard />} /> },
      { path: "/", element: <Navigate to="/all" replace /> },
    ],
  },
]);

export const App = () => {
  const { darkThemeEnabled, toggleDarkThemeEnabled } = useDarkThemeEnabled();
  return (
    <DarkThemeContext.Provider value={{ darkThemeEnabled, toggleDarkThemeEnabled }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={getTheme(darkThemeEnabled)}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyledEngineProvider>
    </DarkThemeContext.Provider>
  );
};
