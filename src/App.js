import "./App.css";

import { Routes, useRoutes, Route } from "react-router-dom";

import Router from "./Router/Router";
function App() {
  
  const routing = useRoutes(Router);
  return <>{routing}</>;
}

export default App;
