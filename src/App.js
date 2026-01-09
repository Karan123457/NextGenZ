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

import DetailsPageD2D from "./data_Exam/Jharkhand/D2D/DetailsPageD2D";
import DetailsPageJHP from "./data_Exam/Jharkhand/Polytechnic/DetailsPageJHP";
import BiharLEDetailsPage from "./data_Exam/Bihar/Bihar LE/DetailsPageBRB";
import BiharPolytechnicDetailsPage from "./data_Exam/Bihar/Polytechnic/DetailsPageBRP";
import Resources_Routes from "./Pages/Resources_Routes";

import PrivateRoute from "./MyComponents/PrivateRoute";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Leaderboard from "./Pages/Leaderboard";


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

  useEffect(() => {
    fetch("https://futurely-backend.onrender.com/health")
      .catch(() => { }); // silent fail
  }, []);


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
          <Route path="/resources/:mainKey/:subId" element={<Resources_Routes />} />
          <Route path="/Exam_Preparation" element={<ExamPreparation />} />
          <Route path="/Counselling" element={<Counselling />} />
          <Route path="/Carrer_Advisor" element={<CarrerAdvisor />} />
          <Route path="/jobs" element={<Jobs />} />

          {/* Legal / SEO pages (static) */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          {/* Put specific/static routes before param routes */}
          <Route path="/Exam_Preparation/Jharkhand_Polytechnic" element={<PrivateRoute><DetailsPageJHP /></PrivateRoute>} />
          <Route path="/Exam_Preparation/Bihar_BCECE_LE" element={<PrivateRoute><BiharLEDetailsPage /></PrivateRoute>} />
          <Route path="/Exam_Preparation/Bihar_Polytechnic" element={<PrivateRoute><BiharPolytechnicDetailsPage /></PrivateRoute>} />

          {/* ✅ Dynamic route LAST (used for D2D and others) */}
          <Route path="/Exam_Preparation/:board_subcard" element={<PrivateRoute><DetailsPageD2D /></PrivateRoute>} />

          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/leaderboard" element={<Leaderboard />} />



        </Routes>
      </div>
      {!hideFooter && <Footer />}

    </>
  );
}

export default App;
