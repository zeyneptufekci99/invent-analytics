import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import { Home } from "./app/index";
import { Detail } from "./app/detail/[id]";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
};

export default App;
