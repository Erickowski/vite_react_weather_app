import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Login, Home } from "@src/views";
import { ROUTES } from "@src/types";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Login />} />
      <Route path={ROUTES.home} element={<Home />} />
    </>
  )
);
