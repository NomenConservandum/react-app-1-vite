import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import DataPage from "./pages/DataPage";
import { AuthWrapper } from "./wrappers/AuthWrapper";

export const routes = [
  { path: "/", label: "Home", element: <LandingPage /> },
  { path: "/login", label: "Login", element: <LoginPage /> },
  { path: "/register", label: "Register", element: <RegisterPage /> },
  { 
    path: "/profile", 
    label: "Profile", 
    element: <AuthWrapper><ProfilePage /></AuthWrapper> 
  },
  { 
    path: "/quotes", 
    label: "Quotes", 
    element: <AuthWrapper><DataPage /></AuthWrapper> 
  },
];