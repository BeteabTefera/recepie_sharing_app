import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UILoader } from "./components/loaders";
import { DashboardLayout } from "./layouts/dashboard";
import { AddRecipe, Home, More, MyRecipes, Profile } from "./pages/Dashboard";
import { ErrorPage } from "./pages/Error";
import { Landing } from "./pages/Landing";
import { Register } from './pages/Register';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/dashboard/",
          element: <Home />,
        },
        {
          path: "/dashboard/addrecipe",
          element: <AddRecipe />,
        },
        {
          path: "/dashboard/myrecipes",
          element: <MyRecipes />,
        },
        {
          path: "/dashboard/recipe/:id",
          element: <More />
        },
        {
          path: "/dashboard/profile",
          element: <Profile />
        },
      ],
    },
  ]);
  return (
  <div className="container h-[100vh] w-[full]">
      <Suspense fallback={<UILoader/>} >
        <RouterProvider router={router} fallbackElement={<UILoader/>} />
      </Suspense>
  </div>
  )
}

export default App
