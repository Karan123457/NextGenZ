import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../styles/Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const badgeRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Timeline for hero animations
    const tl = gsap.timeline();

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.2
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.4
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out' },
        0.6
      );

    // Animate exam cards on scroll
    const cards = gsap.utils.toArray('.exam-card');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Animate feature boxes
    const features = gsap.utils.toArray('.feature-item');
    features.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: feature,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Stats animation
    const statNumbers = gsap.utils.toArray('.stat-value');
    statNumbers.forEach((stat) => {
      const finalValue = parseInt(stat.getAttribute('data-value'));
      gsap.fromTo(
        stat,
        { textContent: 0 },
        {
          textContent: finalValue,
          duration: 2.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Parallax effect for background elements
    gsap.to('.hero-shapes', {
      y: (i, target) => -parseFloat(target.getAttribute('data-speed')) * window.innerHeight,
      scrollTrigger: {
        trigger: '.hero-section',
        scrub: 0.5,
        start: 'top top',
        end: 'bottom center',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-shapes shape-1" data-speed="1"></div>
          <div className="hero-shapes shape-2" data-speed="1.5"></div>
          <div className="hero-shapes shape-3" data-speed="2"></div>
        </div>

        <Container className="hero-content">
          <Row className="align-items-center justify-content-center min-vh-100">
            <Col lg={10} xl={8} className="text-center">
              <div ref={badgeRef} className="hero-badge">
                <i className="fas fa-star"></i>
                &nbsp;&nbsp;Trusted by 5000+ Students
              </div>

              <h1 ref={titleRef} className="hero-title">
                Prepare Smart<br />
                <span className="title-gradient">Crack State Exams</span>
              </h1>

              <p ref={subtitleRef} className="hero-subtitle">
                Diploma • Polytechnic • BTech • Lateral Entry <br />
          All State-Level Engineering Exams, One Trusted Platform
          


              </p>

              <div ref={buttonRef} className="hero-buttons">
                <Link to="/exam-preparation">
                  <Button className="btn-primary-glow">
                    Start Free Preparation
                    <i className="fas fa-sparkles ms-2"></i>
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button className="btn-secondary-outline">
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Highlight Section */}
      <section className="stats-highlight-section">
        <Container>
          <Row className="g-4" ref={statsRef}>
            <Col md={6} lg={3} className="stat-item">
              <div className="stat-box">
                <div className="stat-icon-wrapper">
                  <i className="fas fa-users"></i>
                </div>
                <h3>
                  <span className="stat-value" data-value="5000">
                    0
                  </span>
                  +
                </h3>
                <p>Active Students</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="stat-item">
              <div className="stat-box">
                <div className="stat-icon-wrapper">
                  <i className="fas fa-brain"></i>
                </div>
                <h3>
                  <span className="stat-value" data-value="10000">
                    0
                  </span>
                  +
                </h3>
                <p>Questions Solved</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="stat-item">
              <div className="stat-box">
                <div className="stat-icon-wrapper">
                  <i className="fas fa-award"></i>
                </div>
                <h3>
                  <span className="stat-value" data-value="95">
                    0
                  </span>
                  %
                </h3>
                <p>Success Rate</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="stat-item">
              <div className="stat-box">
                <div className="stat-icon-wrapper">
                  <i className="fas fa-clock"></i>
                </div>
                <h3>24/7</h3>
                <p>Available Learning</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Exam Categories Section */}
      <section className="exams-section">
        <Container>
          <Row className="mb-5 section-header">
            <Col lg={8} className="mx-auto text-center">
              <h2>Choose Your Exam Category</h2>
              <p>
                Select your state and exam type to start your personalized preparation journey
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {/* Jharkhand */}
            <Col md={6} lg={4}>
              <div className="exam-card jharkhand-card">
                <div className="card-glow jharkhand-glow"></div>
                <div className="card-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Jharkhand</h3>
                <div className="exam-types">
                  <span className="badge-type">D2D</span>
                  <span className="badge-type">Polytechnic</span>
                  <span className="badge-type">Diploma</span>
                </div>
                <p className="card-description">
                  Comprehensive preparation for all Jharkhand state exams
                </p>
                <Link to="/exam-preparation/jharkhand">
                  <Button className="btn-explore">
                    Explore Now <i className="fas fa-arrow-right ms-2"></i>
                  </Button>
                </Link>
              </div>
            </Col>

            {/* Bihar */}
            <Col md={6} lg={4}>
              <div className="exam-card bihar-card">
                <div className="card-glow bihar-glow"></div>
                <div className="card-icon">
                  <i className="fas fa-book"></i>
                </div>
                <h3>Bihar</h3>
                <div className="exam-types">
                  <span className="badge-type">LE Board</span>
                  <span className="badge-type">Polytechnic</span>
                </div>
                <p className="card-description">
                  Complete study materials for Bihar Board exams
                </p>
                <Link to="/exam-preparation/bihar">
                  <Button className="btn-explore">
                    Explore Now <i className="fas fa-arrow-right ms-2"></i>
                  </Button>
                </Link>
              </div>
            </Col>

            {/* UP */}
            <Col md={6} lg={4}>
              <div className="exam-card up-card coming-soon">
                <div className="card-glow up-glow"></div>
                <div className="card-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h3>Uttar Pradesh</h3>
                <div className="exam-types">
                  <span className="badge-type">Coming Soon</span>
                </div>
                <p className="card-description">
                  Get ready for UP board exams - launching very soon
                </p>
                <Button className="btn-explore" disabled>
                  Coming Soon
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <Row className="mb-5 section-header">
            <Col lg={8} className="mx-auto text-center">
              <h2>Why Students Love Futurely</h2>
              <p>Everything you need to ace your exams and build your future</p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={6} lg={3} className="feature-item">
              <div className="feature-box">
                <div className="feature-icon-wrap">
                  <i className="fas fa-file-pdf"></i>
                </div>
                <h5>1000+ Questions</h5>
                <p>Practice with thousands of curated questions from actual exams</p>
              </div>
            </Col>

            <Col md={6} lg={3} className="feature-item">
              <div className="feature-box">
                <div className="feature-icon-wrap">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h5>Detailed Solutions</h5>
                <p>Step-by-step solutions to help you understand every concept</p>
              </div>
            </Col>

            <Col md={6} lg={3} className="feature-item">
              <div className="feature-box">
                <div className="feature-icon-wrap">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <h5>Progress Tracking</h5>
                <p>Monitor your performance with detailed analytics and insights</p>
              </div>
            </Col>

            <Col md={6} lg={3} className="feature-item">
              <div className="feature-box">
                <div className="feature-icon-wrap">
                  <i className="fas fa-users"></i>
                </div>
                <h5>Expert Support</h5>
                <p>Get guidance from experienced educators and mentors</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <Container>
          <Row className="g-4">
            <Col md={6}>
              <Link to="/resources" className="quick-link-card">
                <div className="link-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                <h4>Study Resources</h4>
                <p>Access question papers, notes, and study materials</p>
                <span className="link-arrow">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            </Col>
            <Col md={6}>
              <Link to="/counselling" className="quick-link-card">
                <div className="link-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h4>Career Counselling</h4>
                <p>Get expert advice to choose the right career path</p>
                <span className="link-arrow">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto text-center">
              <h2>Ready to Transform Your Future?</h2>
              <p>Join thousands of successful students preparing with Futurely</p>
              <div className="cta-buttons">
                <Link to="/exam-preparation">
                  <Button className="btn-primary-glow large">
                    Start Preparation Free
                    <i className="fas fa-rocket ms-2"></i>
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;

