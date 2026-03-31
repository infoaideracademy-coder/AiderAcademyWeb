import React from "react";
import "./style.scss";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  sideDescription?: string;
  layout?: "stacked" | "split";
  className?: string;
};

const SectionHeading = ({
  eyebrow,
  title,
  accent,
  description,
  sideDescription,
  layout = "stacked",
  className = "",
}: SectionHeadingProps) => {
  const accentText = accent?.trim();
  const accentIndex = accentText ? title.indexOf(accentText) : -1;
  const beforeAccent =
    accentText && accentIndex >= 0 ? title.slice(0, accentIndex) : title;
  const afterAccent =
    accentText && accentIndex >= 0
      ? title.slice(accentIndex + accentText.length)
      : "";

  return (
    <div className={`section-heading section-heading--${layout} ${className}`.trim()}>
      <div className="section-heading__eyebrow">{eyebrow}</div>
      <div className="section-heading__body">
        <h2 className="section-heading__title">
          {beforeAccent}
          {accentText && accentIndex >= 0 ? (
            <span className="section-heading__accent">{accentText}</span>
          ) : null}
          {afterAccent}
        </h2>
        {description ? (
          <p className="section-heading__description">{description}</p>
        ) : null}
        {sideDescription ? (
          <p className="section-heading__side-description">{sideDescription}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SectionHeading;
