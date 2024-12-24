import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import { Jobs } from "../pages/Index";
import CreatePost from "../pages/Jobs/CreatePost";
import AuthLayout from "../layout/AuthLayout";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate replace to="jobs" />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/create" element={<CreatePost />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
