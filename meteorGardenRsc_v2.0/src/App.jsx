import { Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import ManagementPage from "./pages/ManagementPage";
import LogDataPage from "./pages/LogDataPage";
import SignUpPage from "./pages/SignUpPage";

import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/garden-manager" element={<ManagementPage />} />
        <Route path="/log-data" element={<LogDataPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
