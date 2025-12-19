import React, { useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./MyComponents/Header";
import Footer from "./MyComponents/Footer";
import Home from "./Pages/Home";
import Counselling from "./Pages/Counselling";
import Resources from "./Pages/Resources";
import CarrerAdvisor from "./Pages/Carrer_Advisor";
import ExamPreparation from "./Pages/Exam_Preparation";
import Jobs from "./Pages/Jobs";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import RefundPolicy from "./Pages/RefundPolicy";

import DetailsPage from "./data_Exam/Jharkhand/D2D/DetailsPage";
import PolytechnicMain from "./data_Exam/Jharkhand/Polytechnic/MainPage";
import ResourcesDetail from "./Pages/ResourcesDetail";

import PrivateRoute from "./MyComponents/PrivateRoute";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";


import { Routes, Route, useLocation } from "react-router-dom";

/* ScrollToTopWithMemory component unchanged */
function ScrollToTopWithMemory() {
  const { pathname } = useLocation();
  const scrollPositions = useRef({});

  useEffect(() => {
    const handleBeforeUnload = () => {
      scrollPositions.current[pathname] = window.scrollY;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const currentPath = pathname;
    const positions = scrollPositions.current;
    return () => {
      positions[currentPath] = window.scrollY;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  useEffect(() => {
    const savedY = scrollPositions.current[pathname];
    if (savedY !== undefined) {
      window.scrollTo({ top: savedY, behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  const hideFooter =
    location.pathname.startsWith("/Exam_Preparation/");

  return (
    <>
      <ScrollToTopWithMemory />
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:mainKey/:subId" element={<ResourcesDetail />} />
          <Route path="/Exam_Preparation" element={<PrivateRoute><ExamPreparation /></PrivateRoute>} />
          <Route path="/Counselling" element={<Counselling />} />
          <Route path="/Carrer_Advisor" element={<CarrerAdvisor />} />
          <Route path="/jobs" element={<Jobs />} />

          {/* Legal / SEO pages (static) */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          {/* Put specific/static routes before param routes */}
          <Route path="/Exam_Preparation/Jharkhand_Polytechnic" element={<PolytechnicMain />} />
          <Route path="/Exam_Preparation/:board_subcard" element={<DetailsPage />} />

          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


        </Routes>
      </div>
      {!hideFooter && <Footer />}

    </>
  );
}

export default App;
