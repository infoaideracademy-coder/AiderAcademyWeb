"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { urlForImage } from "@/sanity/lib/image";
import type { Testimonial } from "@/sanity/types";

const imgQuoteIcon =
  "https://www.figma.com/api/mcp/asset/8ff34da2-5c16-48fe-96c6-a5ccb8e00eec";
const imgAvatarFallback =
  "https://www.figma.com/api/mcp/asset/60b438bf-0739-4095-9ae0-1f5531239dbf";
const imgArrow =
  "https://www.figma.com/api/mcp/asset/57f11bc3-4e8a-43b1-ad36-d5d8fcdd61bf";

type TestimonialsClientProps = {
  testimonials: Testimonial[];
  heading: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
  };
};

const TestimonialsClient = ({ testimonials, heading }: TestimonialsClientProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const updateControls = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      setCanScrollPrev(track.scrollLeft > 8);
      setCanScrollNext(track.scrollLeft < maxScrollLeft - 8);
    };

    updateControls();
    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);

    return () => {
      track.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, []);

  const scrollTrack = (direction: "prev" | "next") => {
    const track = trackRef.current;
    const firstCard = track?.querySelector<HTMLElement>(".testimonial-card");

    if (!track || !firstCard) {
      return;
    }

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
    const offset = firstCard.offsetWidth + gap;

    track.scrollBy({
      left: direction === "next" ? offset : -offset,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="testimonials-section__header">
        <SectionHeading
          className="testimonials-section__heading"
          eyebrow={heading.eyebrow}
          title={heading.title}
          accent={heading.accent}
          description={heading.description}
        />

        <div className="testimonials-section__controls">
          <button
            className="testimonials-section__control testimonials-section__control--prev"
            type="button"
            aria-label="Previous testimonials"
            onClick={() => scrollTrack("prev")}
            disabled={!canScrollPrev}
          >
            <img src={imgArrow} alt="" aria-hidden="true" />
          </button>
          <button
            className="testimonials-section__control testimonials-section__control--next"
            type="button"
            aria-label="Next testimonials"
            onClick={() => scrollTrack("next")}
            disabled={!canScrollNext}
          >
            <img src={imgArrow} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="testimonials-section__track" ref={trackRef}>
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item._id}>
            <img
              className="testimonial-card__quote-icon"
              src={imgQuoteIcon}
              alt=""
              aria-hidden="true"
            />
            <p className="testimonial-card__quote">{item.quote}</p>

            <div className="testimonial-card__footer">
              <div className="testimonial-card__avatar">
                <img
                  src={
                    item.image
                      ? urlForImage(item.image).width(80).height(80).url()
                      : imgAvatarFallback
                  }
                  alt={item.name}
                />
              </div>
              <div className="testimonial-card__person">
                <p className="testimonial-card__name">{item.name}</p>
                <p className="testimonial-card__role">{item.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default TestimonialsClient;
