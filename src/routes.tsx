import { createBrowserRouter } from "react-router";
import { Recipes } from "./pages/recipes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Recipes />,
    }
]);