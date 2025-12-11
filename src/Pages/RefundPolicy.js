import React, { useEffect } from "react";

const RefundPolicy = () => {
  useEffect(() => {
    document.title = "Refund Policy - Futurely";
    const desc = "Refund policy for Futurely digital products: rules about refunds, exceptions and support contacts.";
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
    link.href = window.location.origin + '/refund-policy';
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ color: "#0d6efd", marginBottom: "15px" }}>Refund Policy</h2>

      <p>
        Futurely provides digital educational products such as test series,
        notes, and downloadable resources. As these are instantly accessible
        upon purchase, refunds are generally not provided.
      </p>

      <h4>Refunds are granted only if:</h4>
      <ul>
        <li>You were charged but did not receive access within 24 hours</li>
        <li>There is a technical error from our side</li>
      </ul>

      <h4>No Refunds For</h4>
      <ul>
        <li>Incorrect purchase made by the user</li>
        <li>
          Change of mind after accessing or downloading digital content
        </li>
        <li>
          Sharing login or misuse — this leads to immediate termination
        </li>
      </ul>

      <h4>Contact Support</h4>
      <p>Email: karan.kumar.dl92@gmail.com</p>
      <p>Phone: +91 82874 26663</p>
    </div>
  );
};

export default RefundPolicy;
