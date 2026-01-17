import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const cardsRef = useRef([]);

  useEffect(() => {
    /* HERO TEXT ANIMATION */
    gsap.from(".hero span", {
      y: 90,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out"
    });

    gsap.from(".hero-sub", {
      opacity: 0,
      y: 30,
      delay: 0.9,
      duration: 1
    });

    /* EXAM CARDS */
    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out"
      });
    });
  }, []);

  const exams = [
    "D2D Jharkhand",
    "Jharkhand Polytechnic",
    "Bihar Polytechnic",
    "Bihar BTech Lateral Entry",
    "Other State Exams"
  ];

  return (
    <>
      {/* INLINE STYLES (NO CSS FILE NEEDED) */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Inter, system-ui, sans-serif;
        }

        body {
          background: #0b0f1a;
          color: #fff;
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 20px;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 6vw, 4.8rem);
          line-height: 1.1;
        }

        .hero span {
          display: inline-block;
          margin-right: 10px;
        }

        .hero-sub {
          margin-top: 22px;
          max-width: 650px;
          color: #bfc4ff;
          font-size: 1.1rem;
        }

        .hero button {
          margin-top: 35px;
          padding: 14px 40px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #6c7cff, #9f7cff);
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .hero button:hover {
          transform: scale(1.06);
        }

        /* SECTION */
        .section {
          padding: 90px 20px;
        }

        .section h2 {
          text-align: center;
          font-size: 2.3rem;
          margin-bottom: 55px;
        }

        /* CARDS */
        .grid {
          max-width: 1100px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .card {
          background: #12162a;
          border-radius: 18px;
          padding: 28px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 45px rgba(108,124,255,0.25);
        }

        .card h3 {
          font-size: 1.35rem;
          margin-bottom: 10px;
        }

        .card p {
          color: #b9c0ff;
          font-size: 0.95rem;
          margin-bottom: 20px;
        }

        .card button {
          background: transparent;
          border: 1px solid #6c7cff;
          color: #6c7cff;
          padding: 10px 22px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .card button:hover {
          background: #6c7cff;
          color: #fff;
        }

        /* CTA */
        .cta {
          text-align: center;
          padding: 110px 20px;
          background: linear-gradient(180deg, #0b0f1a, #111633);
        }

        .cta h2 {
          font-size: 2.4rem;
          margin-bottom: 15px;
        }

        .cta p {
          color: #cdd1ff;
          margin-bottom: 30px;
        }

        .cta button {
          padding: 14px 42px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #9f7cff, #6c7cff);
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <h1>
          <span>Prepare</span>
          <span>Smart.</span>
          <span>Crack</span>
          <span>State</span>
          <span>Exams.</span>
        </h1>

        <p className="hero-sub">
          Diploma • Polytechnic • BTech • Lateral Entry <br />
          One platform for all state-level engineering exams
        </p>

        <button>Start Learning</button>
      </section>

      {/* EXAMS */}
      <section className="section">
        <h2>Popular Exams</h2>

        <div className="grid">
          {exams.map((exam, i) => (
            <div
              className="card"
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <h3>{exam}</h3>
              <p>
                PYQs • Mock Tests • Syllabus <br />
                Performance Analytics
              </p>
              <button>Explore</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Built for Serious Aspirants</h2>
        <p>
          College Finder • Career Guidance • Mentorship <br />
          Designed for real engineering students
        </p>
        <button>Join Futurely</button>
      </section>
    </>
  );
}
