import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import { CreateJob, Jobs, Login, SignUP } from "../pages/Index";
import AuthLayout from "../layout/AuthLayout";
import ProtectRoutes from "../components/ProtectRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectRoutes>
              <Layout />
            </ProtectRoutes>
          }
        >
          <Route index element={<Navigate replace to="jobs" />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/create" element={<CreateJob />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="signup" element={<SignUP />} />
          <Route path="signin" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
