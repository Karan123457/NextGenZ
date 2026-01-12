import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = "Terms & Conditions - Futurely";
    const desc = "Terms and Conditions for Futurely — rules for using the site, purchasing digital products and limitations of liability.";
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
    link.href = window.location.origin + '/terms-and-conditions';
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ color: "#0d6efd", marginBottom: "15px" }}>
        Terms and Conditions
      </h2>

      <p>
        By accessing Futurely, you agree to follow the terms outlined below.
      </p>

      <h4>Use of Website</h4>
      <p>
        This website provides educational content, test series, digital notes,
        college information, and related services. Users must not misuse any
        material or attempt unauthorized access.
      </p>

      <h4>Purchases & Digital Products</h4>
      <ul>
        <li>
          All test series, notes, and digital downloads are non-transferable.
        </li>
        <li>
          Sharing purchased content is strictly prohibited and may lead to
          account termination.
        </li>
      </ul>

      <h4>Accuracy of Information</h4>
      <p>
        Although we try to keep all exam-related information accurate, changes
        may occur. Users should verify important details from official sources.
      </p>

      <h4>Limitation of Liability</h4>
      <p>
        Futurely is not responsible for any loss caused by incorrect use of
        information or technical issues.
      </p>

      <h4>Contact Us</h4>
      <p>Email: karan.kumar.dl92@gmail.com</p>
    </div>
  );
};

export default TermsAndConditions;
