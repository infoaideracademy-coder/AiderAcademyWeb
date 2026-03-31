import React from "react";
import { getPartnersSection } from "@/sanity/queries";
import { urlForImage } from "@/sanity/lib/image";
import "./style.scss";

const LogoScrollSection = async () => {
  const partners = await getPartnersSection();
  const logos = partners?.logos || [];

  if (logos.length === 0) {
    return null;
  }

  return (
    <section className="logo-scroll-section">
      <div className="logo-scroll-track-wrapper">
        <div className="logo-scroll-track">
          {/* Render logos twice for seamless infinite loop */}
          {[...logos, ...logos].map((item, index) => (
            <div className="logo-scroll-item" key={`${item._key}-${index}`}>
              <img
                src={urlForImage(item.logo).url()}
                alt={item.logo.alt || item.name || "Partner Logo"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoScrollSection;
