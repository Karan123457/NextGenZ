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


  useEffect(() => {
    // Timeline for hero animations
    const tl = gsap.timeline();

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0
    );

    // Slide up + fade in for title
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      0.2
    );

    // Typewriter effect for title text
    if (titleRef.current) {
      const titleElement = titleRef.current;
      const firstLineText = 'Prepare Smart';
      const secondLineText = 'Crack State Exams';
      
      // Get the text nodes
      const childNodes = Array.from(titleElement.childNodes);
      const firstTextNode = childNodes[0]; // "Prepare Smart" text node
      const gradientSpan = childNodes[2]; // <span> with "Crack State Exams"
      
      // Clear initial text
      firstTextNode.textContent = '';
      gradientSpan.textContent = '';
      
      let charIndex = 0;
      let charIndex2 = 0;
      
      // Typewriter effect for first line
      const typeFirstLine = () => {
        if (charIndex < firstLineText.length) {
          firstTextNode.textContent += firstLineText[charIndex];
          charIndex++;
          setTimeout(typeFirstLine, 70);
        } else {
          // Start typing second line after delay
          setTimeout(typeSecondLine, 150);
        }
      };
      
      // Typewriter effect for second line (with gradient)
      const typeSecondLine = () => {
        if (charIndex2 < secondLineText.length) {
          gradientSpan.textContent += secondLineText[charIndex2];
          charIndex2++;
          setTimeout(typeSecondLine, 70);
        }
      };
      
      // Start typewriter after slide-up animation completes
      setTimeout(typeFirstLine, 1200);
    }

    tl.fromTo(
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
                &nbsp;&nbsp;Trusted by 1000+ Students
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
                    Start Free Practice
                    <i className="fas fa-sparkles ms-2"></i>
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button className="btn-secondary-outline">
                    Find Colleges
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* College Search Section */}
      <section className="college-search-section">
        <Container>
          <Row className="mb-5 section-header">
            <Col lg={8} className="mx-auto text-center">
              <h2>Find Your Perfect College</h2>
              <p>Explore top colleges with real data on cutoffs, placements, and fees</p>
            </Col>
          </Row>

          <Row className="g-4">
            {/* Polytechnic College */}
            <Col md={6} lg={4}>
              <div className="college-search-card">
                <div className="college-header">
                  <div className="college-type-badge polytechnic-type">POLYTECHNIC</div>
                  <div className="college-rating">
                    <i className="fas fa-star"></i> 4.5/5
                  </div>
                </div>
                
                <h4>Government & Private Polytechnic Colleges</h4>
                <p className="college-location"><i className="fas fa-map-marker-alt"></i> Jharkhand, Bihar & India</p>
                
                <div className="college-stats">
                  <div className="stat-item">
                    <span className="stat-label">Cutoff Score</span>
                    <span className="stat-value">50 - 85%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Placement Rate</span>
                    <span className="stat-value">92%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Avg. Package</span>
                    <span className="stat-value">₹4.2 LPA</span>
                  </div>
                </div>

                <div className="college-info">
                  <span className="info-badge"><i className="fas fa-graduation-cap"></i> Govt/Pvt</span>
                  <span className="info-badge"><i className="fas fa-rupee-sign"></i> Affordable</span>
                  <span className="info-badge"><i className="fas fa-users"></i> 500+ Colleges</span>
                </div>

                <Link to="/colleges" className="explore-btn">
                  Explore Colleges <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </Col>

            {/* BTech Lateral Entry College */}
            <Col md={6} lg={4}>
              <div className="college-search-card">
                <div className="college-header">
                  <div className="college-type-badge lateral-type">LATERAL ENTRY BTECH</div>
                  <div className="college-rating">
                    <i className="fas fa-star"></i> 4.7/5
                  </div>
                </div>
                
                <h4>Top Private Engineering College</h4>
                <p className="college-location"><i className="fas fa-map-marker-alt"></i> Pan India / Metros</p>
                
                <div className="college-stats">
                  <div className="stat-item">
                    <span className="stat-label">Cutoff Score</span>
                    <span className="stat-value">80 - 90%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Placement Rate</span>
                    <span className="stat-value">98%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Avg. Package</span>
                    <span className="stat-value">₹8.5 LPA</span>
                  </div>
                </div>

                <div className="college-info">
                  <span className="info-badge"><i className="fas fa-building"></i> Private</span>
                  <span className="info-badge"><i className="fas fa-map-marker-alt"></i> Metro Cities</span>
                  <span className="info-badge"><i className="fas fa-users"></i> 200+ Students</span>
                </div>

                <Link to="/colleges" className="explore-btn">
                  Explore College <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </Col>

            {/* BTech Regular College */}
            <Col md={6} lg={4}>
              <div className="college-search-card">
                <div className="college-header">
                  <div className="college-type-badge btech-type">BTECH REGULAR</div>
                  <div className="college-rating">
                    <i className="fas fa-star"></i> 4.6/5
                  </div>
                </div>
                
                <h4>Top Government Engineering University</h4>
                <p className="college-location"><i className="fas fa-map-marker-alt"></i> NIT / IIIT Campus</p>
                
                <div className="college-stats">
                  <div className="stat-item">
                    <span className="stat-label">Cutoff Score</span>
                    <span className="stat-value">85 - 95%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Placement Rate</span>
                    <span className="stat-value">99%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Avg. Package</span>
                    <span className="stat-value">₹10.2 LPA</span>
                  </div>
                </div>

                <div className="college-info">
                  <span className="info-badge"><i className="fas fa-graduation-cap"></i> Government</span>
                  <span className="info-badge"><i className="fas fa-map-marker-alt"></i> National Level</span>
                  <span className="info-badge"><i className="fas fa-users"></i> 1000+ Students</span>
                </div>

                <Link to="/colleges" className="explore-btn">
                  Explore College <i className="fas fa-arrow-right"></i>
                </Link>
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


      {/* Student Success Stories Section */}
      <section className="success-stories-section">
        <Container>
          <Row className="mb-5 section-header">
            <Col lg={8} className="mx-auto text-center">
              <h2>Student Success Stories</h2>
              <p>Inspiring journeys from students like you</p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={6} lg={4}>
              <div className="story-card">
                <div className="story-header">
                  <div className="story-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h5>Ravi Kumar</h5>
                    <p>Jharkhand D2D</p>
                  </div>
                </div>
                <div className="story-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="story-text">
                  "Futurely helped me score 92% in D2D exam. The practice questions were exactly like the real exam. Highly recommended!"
                </p>
                <div className="story-result">
                  <span className="badge-success">Rank 45</span>
                  <span className="badge-info">NIT Admission</span>
                </div>
              </div>
            </Col>

            <Col md={6} lg={4}>
              <div className="story-card">
                <div className="story-header">
                  <div className="story-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h5>Priya Singh</h5>
                    <p>Bihar Polytechnic</p>
                  </div>
                </div>
                <div className="story-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="story-text">
                  "Started with basics, improved gradually. The mock tests built my confidence. Now pursuing lateral entry!"
                </p>
                <div className="story-result">
                  <span className="badge-success">95% Score</span>
                  <span className="badge-info">Lateral Ready</span>
                </div>
              </div>
            </Col>

            <Col md={6} lg={4}>
              <div className="story-card">
                <div className="story-header">
                  <div className="story-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h5>Aman Patel</h5>
                    <p>Jharkhand Polytechnic</p>
                  </div>
                </div>
                <div className="story-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="story-text">
                  "Best platform for exam prep! Detailed solutions taught me concepts I didn't understand in class. Got placed!"
                </p>
                <div className="story-result">
                  <span className="badge-success">First Class</span>
                  <span className="badge-info">Placed</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Counselling & Resources Section */}
      <section className="counselling-resources-section">
        <Container>
          <Row className="g-4">
            <Col lg={6}>
              <div className="resource-card study-card">
                <div className="resource-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                <div className="resource-content">
                  <h4>Study Materials & PYQ</h4>
                  <p>Complete notes, question papers, and solutions</p>
                  <ul className="resource-list">
                    <li><i className="fas fa-check"></i> Previous Year Questions</li>
                    <li><i className="fas fa-check"></i> Detailed Solutions</li>
                    <li><i className="fas fa-check"></i> Chapter-wise Notes</li>
                  </ul>
                </div>
                <Link to="/resources" className="resource-link">
                  Access Materials <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </Col>

            <Col lg={6}>
              <div className="resource-card counselling-card featured">
                <div className="resource-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="resource-content">
                  <h4>College Counselling</h4>
                  <p>Expert guidance on college selection and admission</p>
                  <ul className="resource-list">
                    <li><i className="fas fa-check"></i> 1-on-1 Expert Guidance</li>
                    <li><i className="fas fa-check"></i> College Shortlisting</li>
                    <li><i className="fas fa-check"></i> Admission Support</li>
                  </ul>
                </div>
                <Link to="/counselling" className="resource-link featured-link">
                  Register Now <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
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

