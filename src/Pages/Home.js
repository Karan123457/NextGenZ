import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // HERO TEXT
    gsap.from(".hero span", {
      y: 70,
      opacity: 0,
      stagger: 0.12,
      duration: 1.1,
      ease: "power4.out"
    });

    gsap.from(".hero-sub", {
      opacity: 0,
      y: 20,
      delay: 0.8,
      duration: 0.8
    });

    // CARDS
    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.08,
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
      {/* INLINE CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Inter, system-ui, sans-serif;
        }

        body {
          background: #f9fafc;
          color: #1c1f2a;
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          padding: 90px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background:
            radial-gradient(circle at top, #eef2ff, transparent 60%),
            #f9fafc;
        }

        .hero h1 {
          font-size: clamp(2.6rem, 6vw, 4.6rem);
          line-height: 1.1;
          font-weight: 700;
        }

        .hero span {
          display: inline-block;
          margin-right: 10px;
        }

        .hero-sub {
          margin-top: 22px;
          max-width: 700px;
          font-size: 1.1rem;
          color: #555b7a;
        }

        .hero button {
          margin-top: 36px;
          padding: 15px 42px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #4f6cff, #6f7cff);
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 12px 25px rgba(79,108,255,0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hero button:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 35px rgba(79,108,255,0.35);
        }

        /* SECTION */
        .section {
          padding: 90px 20px;
        }

        .section h2 {
          text-align: center;
          font-size: 2.4rem;
          margin-bottom: 60px;
        }

        /* GRID */
        .grid {
          max-width: 1150px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 28px;
        }

        /* CARD */
        .card {
          background: #ffffff;
          border-radius: 20px;
          padding: 30px;
          border: 1px solid #edf0ff;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 45px rgba(0,0,0,0.08);
        }

        .card h3 {
          font-size: 1.4rem;
          margin-bottom: 12px;
        }

        .card p {
          color: #5f668a;
          font-size: 0.96rem;
          margin-bottom: 22px;
          line-height: 1.6;
        }

        .card button {
          background: transparent;
          border: 1.8px solid #4f6cff;
          color: #4f6cff;
          padding: 10px 24px;
          border-radius: 50px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .card button:hover {
          background: #4f6cff;
          color: #fff;
        }

        /* CTA */
        .cta {
          padding: 110px 20px;
          text-align: center;
          background:
            linear-gradient(180deg, #f9fafc, #eef2ff);
        }

        .cta h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .cta p {
          font-size: 1.05rem;
          color: #5a6185;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .cta button {
          padding: 15px 44px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #6f7cff, #4f6cff);
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 14px 30px rgba(79,108,255,0.3);
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
          One trusted platform for all state-level engineering exams
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
                Previous Year Questions • Mock Tests <br />
                Syllabus • Performance Analysis
              </p>
              <button>Explore</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Built for Serious Engineering Aspirants</h2>
        <p>
          College Finder • Career Guidance • Mentorship <br />
          Designed specially for diploma & BTech students
        </p>
        <button>Join Futurely</button>
      </section>
    </>
  );
}
