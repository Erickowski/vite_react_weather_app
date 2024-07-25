import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "@src/types";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate(ROUTES.login);
    }
  }, []);

  return <p>Home</p>;
}
