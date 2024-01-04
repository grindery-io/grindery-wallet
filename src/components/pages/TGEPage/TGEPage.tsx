import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import TGEFormPage from "./TGEFormPage/TGEFormPage";
import TGEIntroPage from "./TGEIntroPage/TGEIntroPage";
import { selectAppStore, useAppSelector } from "store";
import Loading from "components/shared/Loading/Loading";

const TGEPage = () => {
  const navigate = useNavigate();
  const {
    user,
    order: { details },
  } = useAppSelector(selectAppStore);

  useEffect(() => {
    if (typeof details !== "undefined" && details) {
      navigate("/order");
    }
  }, [details, navigate]);

  return user?.patchwallet && !details && typeof details !== "undefined" ? (
    <Routes>
      <Route path="/" element={<TGEIntroPage />} />
      <Route path="/form" element={<TGEFormPage />} />
      <Route path="*" element={<Navigate to="/tge" />} />
    </Routes>
  ) : typeof details !== "undefined" ? (
    <Navigate to="/order" />
  ) : (
    <Loading />
  );
};

export default TGEPage;
