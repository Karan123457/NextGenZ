import React, { useEffect, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import Home from './Pages/Home';
import Counselling from './Pages/Counselling';
import Resources from './Pages/Resources';
import CarrerAdvisor from './Pages/Carrer_Advisor';
import ExamPreparation from './Pages/Exam_Preparation';

import DetailsPage from "./data_Exam/Jharkhand/D2D/DetailsPage";


import { Routes, Route, useLocation } from 'react-router-dom';

/* ✅ ScrollToTopWithMemory Component */
function ScrollToTopWithMemory() {
  const { pathname } = useLocation();
  const scrollPositions = useRef({});

  useEffect(() => {
    // Save current scroll position before leaving
    const handleBeforeUnload = () => {
      scrollPositions.current[pathname] = window.scrollY;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const currentPath = pathname; // Store pathname in a variable for cleanup
    const positions = scrollPositions.current; // copy ref value for cleanup
    // Save on route change
    return () => {
      positions[currentPath] = window.scrollY;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  useEffect(() => {
    const savedY = scrollPositions.current[pathname];
    if (savedY !== undefined) {
      // 👇 Restore old scroll position (Back/Forward)
      window.scrollTo({ top: savedY, behavior: "auto" });
    } else {
      // 👇 Fresh navigation — scroll instantly to top
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
}
                       
function App() {
  return (
    <>

      <ScrollToTopWithMemory />
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/Exam_Preparation" element={<ExamPreparation />} />
          <Route path="/Counselling" element={<Counselling />} />
          <Route path="/Carrer_Advisor" element={<CarrerAdvisor />} />
         
          <Route path="/Exam_Preparation/:board_subcard" element={<DetailsPage />} /> {/* Route */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
