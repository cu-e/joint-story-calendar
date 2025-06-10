import {
  createBrowserRouter,
} from "react-router";
import MainPage from "../components/pages/Main/MainPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
  },
]);
