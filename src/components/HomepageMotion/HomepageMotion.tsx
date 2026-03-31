"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type PointerTiltOptions = {
  move?: number;
  rotate?: number;
  scale?: number;
};

const HomepageMotion = () => {
  useEffect(() => {
    const root = document.querySelector(".homepage-main");

    if (!root) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const pointerCleanups: Array<() => void> = [];
    let mm: ReturnType<typeof gsap.matchMedia> | null = null;
    const ctx = gsap.context(() => {
      const animateSectionHeading = (sectionSelector: string, start = "top 78%") => {
        const section = document.querySelector(sectionSelector);

        if (!section) {
          return;
        }

        const eyebrow = section.querySelector(".section-heading__eyebrow");
        const title = section.querySelector(".section-heading__title");
        const description = section.querySelector(".section-heading__description");
        const sideDescription = section.querySelector(".section-heading__side-description");

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: section,
              start,
            },
          })
          .from(eyebrow, { y: 18, autoAlpha: 0, duration: 0.55 })
          .from(
            title,
            {
              y: 56,
              autoAlpha: 0,
              duration: 0.9,
            },
            "-=0.28",
          )
          .from(
            [description, sideDescription].filter(Boolean),
            {
              y: 28,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.08,
            },
            "-=0.46",
          );
      };

      const addPointerTilt = (selector: string, options: PointerTiltOptions = {}) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector);

        elements.forEach((element) => {
          const moveAmount = options.move ?? 10;
          const rotateAmount = options.rotate ?? 5;
          const scaleAmount = options.scale ?? 1.018;
          const xTo = gsap.quickTo(element, "x", { duration: 0.42, ease: "power3.out" });
          const yTo = gsap.quickTo(element, "y", { duration: 0.42, ease: "power3.out" });
          const rotationTo = gsap.quickTo(element, "rotationZ", {
            duration: 0.42,
            ease: "power3.out",
          });
          const scaleTo = gsap.quickTo(element, "scale", { duration: 0.42, ease: "power3.out" });

          const handleMove = (event: MouseEvent) => {
            const bounds = element.getBoundingClientRect();
            const xProgress = (event.clientX - bounds.left) / bounds.width - 0.5;
            const yProgress = (event.clientY - bounds.top) / bounds.height - 0.5;

            xTo(xProgress * moveAmount);
            yTo(yProgress * moveAmount);
            rotationTo(xProgress * rotateAmount);
            scaleTo(scaleAmount);
          };

          const handleLeave = () => {
            xTo(0);
            yTo(0);
            rotationTo(0);
            scaleTo(1);
          };

          element.addEventListener("mousemove", handleMove);
          element.addEventListener("mouseleave", handleLeave);

          pointerCleanups.push(() => {
            element.removeEventListener("mousemove", handleMove);
            element.removeEventListener("mouseleave", handleLeave);
          });
        });
      };

      const addButtonMotion = (selector: string) => {
        const buttons = gsap.utils.toArray<HTMLElement>(selector);

        buttons.forEach((button) => {
          const liftTo = gsap.quickTo(button, "y", { duration: 0.26, ease: "power2.out" });
          const scaleTo = gsap.quickTo(button, "scale", { duration: 0.26, ease: "power2.out" });

          const handleEnter = () => {
            liftTo(-4);
            scaleTo(1.015);
          };

          const handleLeave = () => {
            liftTo(0);
            scaleTo(1);
          };

          button.addEventListener("mouseenter", handleEnter);
          button.addEventListener("mouseleave", handleLeave);

          pointerCleanups.push(() => {
            button.removeEventListener("mouseenter", handleEnter);
            button.removeEventListener("mouseleave", handleLeave);
          });
        });
      };

      mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const heroTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
        });

        heroTimeline
          .from(".hero-decoration-top", {
            y: -42,
            autoAlpha: 0,
            rotate: -14,
            duration: 0.9,
          })
          .from(
            ".hero-headline",
            {
              y: 72,
              autoAlpha: 0,
              duration: 1.05,
            },
            0.12,
          )
          .from(
            ".hero-description",
            {
              y: 34,
              autoAlpha: 0,
              duration: 0.76,
            },
            0.34,
          )
          .from(
            ".hero-ctas > *",
            {
              y: 18,
              autoAlpha: 0,
              duration: 0.42,
              stagger: 0.08,
              clearProps: "opacity,visibility,transform",
            },
            0.46,
          )
          .from(
            ".academy-badge, .contact-details",
            {
              y: 28,
              autoAlpha: 0,
              duration: 0.72,
              stagger: 0.12,
            },
            0.58,
          )
          .from(
            ".bg-shape",
            {
              scale: 0.76,
              autoAlpha: 0,
              duration: 1.05,
              stagger: 0.12,
            },
            0.18,
          )
          .from(
            ".hero-card-container",
            {
              x: 88,
              y: 18,
              rotate: 4,
              autoAlpha: 0,
              duration: 1.16,
            },
            0.24,
          )
          .from(
            ".floating-badge",
            {
              y: 24,
              scale: 0.84,
              autoAlpha: 0,
              duration: 0.64,
              stagger: 0.12,
            },
            0.76,
          )
          .from(
            ".bottom-highlight",
            {
              y: 26,
              autoAlpha: 0,
              duration: 0.62,
            },
            0.88,
          );

        gsap.to(".hero-main-img", {
          scale: 1.05,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".floating-badge", {
          y: -8,
          duration: 2.2,
          ease: "sine.inOut",
          stagger: 0.18,
          repeat: -1,
          yoyo: true,
        });

        gsap.to(".bg-shape-1", {
          y: -16,
          x: 10,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(".bg-shape-2", {
          y: 14,
          x: -8,
          duration: 4.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.from(".logo-scroll-track-wrapper", {
          autoAlpha: 0,
          y: 34,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".logo-scroll-section",
            start: "top 86%",
          },
        });

        gsap.from(".logo-scroll-item", {
          autoAlpha: 0,
          y: 24,
          scale: 0.92,
          duration: 0.6,
          stagger: {
            each: 0.04,
            from: "center",
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".logo-scroll-section",
            start: "top 82%",
          },
        });

        animateSectionHeading(".pillars-section-container-main");
        gsap.from(".pillar-card", {
          y: 68,
          autoAlpha: 0,
          rotateX: -10,
          transformOrigin: "center top",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cards-container",
            start: "top 78%",
          },
        });

        animateSectionHeading(".our-courses-container-main");
        gsap.from(".course-card-item", {
          y: 84,
          autoAlpha: 0,
          scale: 0.94,
          duration: 0.94,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".course-cards-container",
            start: "top 78%",
          },
        });

        animateSectionHeading(".who-we-are-section-container-main");
        gsap.from(".who-we-are-section__image-frame", {
          x: -76,
          autoAlpha: 0,
          scale: 0.92,
          duration: 1.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".who-we-are-section-container-main",
            start: "top 75%",
          },
        });
        gsap.from(".who-we-are-section__content > *:not(.section-heading)", {
          x: 44,
          autoAlpha: 0,
          duration: 0.74,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".who-we-are-section__content",
            start: "top 76%",
          },
        });
        gsap.from(".who-we-are-section__feature", {
          y: 26,
          autoAlpha: 0,
          duration: 0.56,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".who-we-are-section__features",
            start: "top 80%",
          },
        });
        gsap.to(".who-we-are-section__image", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".who-we-are-section-container-main",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        animateSectionHeading(".why-aider-section-container-main");
        gsap.from(".why-aider-feature-card", {
          y: 58,
          autoAlpha: 0,
          rotation: (index) => (index % 2 === 0 ? -2 : 2),
          duration: 0.84,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".feature-cards-container",
            start: "top 78%",
          },
        });

        animateSectionHeading(".who-can-join-container-main");
        gsap.from(".who-can-join-card", {
          x: (index) => (index % 2 === 0 ? -42 : 42),
          y: 32,
          autoAlpha: 0,
          duration: 0.82,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".feature-items-container-who-can-join",
            start: "top 78%",
          },
        });
        gsap.from(".who-can-join__note", {
          y: 22,
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".who-can-join__note",
            start: "top 84%",
          },
        });

        animateSectionHeading(".blog-section-container-main");
        gsap.from(".blog-card, .blog-section__empty, .blog-section__view-all", {
          y: 70,
          autoAlpha: 0,
          duration: 0.82,
          stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-section-container-main",
            start: "top 78%",
          },
        });

        gsap.from(".testimonials-section__header > *", {
          y: 40,
          autoAlpha: 0,
          duration: 0.72,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-section-container-main",
            start: "top 78%",
          },
        });
        gsap.from(".testimonial-card", {
          x: 70,
          autoAlpha: 0,
          duration: 0.86,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-section__track",
            start: "top 80%",
          },
        });

        gsap.from(".bottom-cta-panel", {
          y: 82,
          autoAlpha: 0,
          scale: 0.96,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bottom-cta-section-container",
            start: "top 78%",
          },
        });
        gsap.from(".bottom-cta-panel__content > *", {
          y: 32,
          autoAlpha: 0,
          duration: 0.68,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bottom-cta-panel__content",
            start: "top 82%",
          },
        });
        gsap.to(".bottom-cta-panel__grid-layer--primary", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".bottom-cta-panel",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
        gsap.to(".bottom-cta-panel__grid-layer--secondary", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".bottom-cta-panel",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.from(".footer-section__top > *", {
          y: 34,
          autoAlpha: 0,
          duration: 0.64,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-section-container-main",
            start: "top 90%",
          },
        });
        gsap.from(".footer-section__copyright", {
          y: 18,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-section__copyright",
            start: "top 96%",
          },
        });

        addPointerTilt(
          ".pillar-card, .course-card-item, .why-aider-feature-card, .who-can-join-card, .blog-card, .testimonial-card",
          { move: 8, rotate: 3.5, scale: 1.016 },
        );
        addPointerTilt(".who-we-are-section__image-frame, .bottom-cta-panel", {
          move: 12,
          rotate: 2.5,
          scale: 1.012,
        });
        addButtonMotion(
          ".primary-button, .btn-explore, .btn-advisor, .testimonials-section__control",
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(
          [
            ".hero-decoration-top",
            ".hero-headline",
            ".hero-description",
            ".hero-ctas > *",
            ".academy-badge",
            ".contact-details",
            ".hero-card-container",
            ".floating-badge",
            ".bottom-highlight",
          ],
          {
            y: 28,
            autoAlpha: 0,
            duration: 0.72,
            stagger: 0.08,
            ease: "power3.out",
          },
        );

        gsap.utils.toArray<HTMLElement>(
          [
            ".logo-scroll-section",
            ".pillars-section-container-main",
            ".our-courses-container-main",
            ".who-we-are-section-container-main",
            ".why-aider-section-container-main",
            ".who-can-join-container-main",
            ".blog-section-container-main",
            ".testimonials-section-container-main",
            ".bottom-cta-section-container",
            ".footer-section-container-main",
          ].join(","),
        ).forEach((section) => {
          gsap.from(section.querySelectorAll("h2, h3, p, article, .primary-button, .course-card-item, .pillar-card"), {
            y: 30,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
            },
          });
        });

        gsap.to(".hero-main-img", {
          scale: 1.03,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const handleWindowLoad = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("load", handleWindowLoad);
      pointerCleanups.push(() => {
        window.removeEventListener("load", handleWindowLoad);
      });
    }, root);

    return () => {
      pointerCleanups.forEach((cleanup) => cleanup());
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return null;
};

export default HomepageMotion;
