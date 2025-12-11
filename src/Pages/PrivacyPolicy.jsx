import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - Futurely";
    const desc = "Futurely Privacy Policy: how we collect and use data for exam preparation, resources and purchases.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = window.location.origin + '/privacy-policy';
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ color: "#0d6efd", marginBottom: "15px" }}>Privacy Policy</h2>

      <p>
        At Futurely, we value your privacy. This Privacy Policy explains how we
        collect, use, and protect your information when you use our website,
        services, or purchase digital products.
      </p>

      <h4>Information We Collect</h4>
      <ul>
        <li>Personal details like name, email, phone (only when provided)</li>
        <li>Payment details handled securely by payment gateway partners</li>
        <li>Usage data such as visited pages and interactions</li>
      </ul>

      <h4>How We Use Your Information</h4>
      <ul>
        <li>To provide educational services & digital products</li>
        <li>To improve website performance & user experience</li>
        <li>To send important updates about courses or exams</li>
      </ul>

      <h4>Data Security</h4>
      <p>
        We do not store payment information. Transactions are processed securely
        by our payment partners.
      </p>

      <h4>Contact Us</h4>
      <p>Email: karan.kumar.dl92@gmail.com</p>
      <p>Phone: +91 82874 26663</p>
    </div>
  );
};

export default PrivacyPolicy;
