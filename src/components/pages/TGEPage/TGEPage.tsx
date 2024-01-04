import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import TGEFormPage from "./TGEFormPage/TGEFormPage";
import TGEIntroPage from "./TGEIntroPage/TGEIntroPage";
import { selectAppStore, useAppSelector } from "store";
import Loading from "components/shared/Loading/Loading";

const TGEPage = () => {
  const navigate = useNavigate();
  const { user, order } = useAppSelector(selectAppStore);

  useEffect(() => {
    if (typeof order !== "undefined" && order) {
      navigate("/order", { replace: true });
    }
  }, [order, navigate]);

  return user?.patchwallet && !order && typeof order !== "undefined" ? (
    <Routes>
      <Route path="/" element={<TGEIntroPage />} />
      <Route path="/form" element={<TGEFormPage />} />
      <Route path="*" element={<Navigate to="/tge" />} />
    </Routes>
  ) : typeof order !== "undefined" ? (
    <Navigate to="/order" replace />
  ) : (
    <Loading />
  );
};

export default TGEPage;
