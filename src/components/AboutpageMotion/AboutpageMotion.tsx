"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type PointerTiltOptions = {
  move?: number;
  rotate?: number;
  scale?: number;
};

const AboutpageMotion = () => {
  useEffect(() => {
    const root = document.querySelector(".about-page-main");

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
      const addPointerTilt = (selector: string, options: PointerTiltOptions = {}) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector);

        elements.forEach((element) => {
          const moveAmount = options.move ?? 10;
          const rotateAmount = options.rotate ?? 4;
          const scaleAmount = options.scale ?? 1.014;
          const xTo = gsap.quickTo(element, "x", { duration: 0.42, ease: "power3.out" });
          const yTo = gsap.quickTo(element, "y", { duration: 0.42, ease: "power3.out" });
          const rotationTo = gsap.quickTo(element, "rotationZ", {
            duration: 0.42,
            ease: "power3.out",
          });
          const scaleTo = gsap.quickTo(element, "scale", {
            duration: 0.42,
            ease: "power3.out",
          });

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
            scaleTo(1.016);
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

      const animateCounterValues = () => {
        gsap.utils
          .toArray<HTMLElement>(".counter-item__number")
          .forEach((element, index) => {
            const finalValue = Number(element.dataset.value ?? "0");
            const counter = { value: 0 };

            gsap.to(counter, {
              value: finalValue,
              duration: 1.2,
              delay: index * 0.08,
              ease: "power2.out",
              onUpdate: () => {
                element.textContent = Math.round(counter.value).toString();
              },
            });
          });
      };

      mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const heroTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
        });

        heroTimeline
          .from(".about-hero-grid-bg__row:first-child img", {
            y: -30,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.08,
          })
          .from(
            ".about-hero-grid-bg__row:last-child img",
            {
              y: 26,
              autoAlpha: 0,
              duration: 0.82,
              stagger: 0.08,
            },
            0.16,
          )
          .from(
            ".about-hero-copy__triangle",
            {
              y: -22,
              autoAlpha: 0,
              rotate: -10,
              duration: 0.74,
            },
            0.12,
          )
          .from(
            ".about-hero-copy__title-line",
            {
              y: 64,
              autoAlpha: 0,
              duration: 0.92,
              stagger: 0.14,
            },
            0.2,
          )
          .from(
            ".about-hero-copy__title-accent",
            {
              yPercent: 26,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.1,
            },
            0.34,
          )
          .from(
            ".about-hero-copy__flower",
            {
              scale: 0.72,
              autoAlpha: 0,
              rotate: -18,
              duration: 0.65,
            },
            0.54,
          )
          .from(
            ".about-hero-actions__description",
            {
              x: 44,
              autoAlpha: 0,
              duration: 0.76,
            },
            0.38,
          )
          .from(
            ".about-hero-actions__buttons > *",
            {
              y: 22,
              autoAlpha: 0,
              duration: 0.58,
              stagger: 0.1,
            },
            0.54,
          )
          .from(
            ".about-hero-image-wrap",
            {
              y: 58,
              autoAlpha: 0,
              scale: 0.965,
              duration: 1.08,
            },
            0.36,
          );

        gsap.to(".about-hero-copy__triangle", {
          y: -10,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".about-hero-copy__flower", {
          y: -8,
          rotate: 12,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".about-hero-image", {
          scale: 1.04,
          duration: 5.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".about-hero-grid-bg__row:first-child", {
          x: -28,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".about-hero-grid-bg__row:last-child", {
          x: 24,
          duration: 8.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.from(".counter-item", {
          y: 42,
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.76,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".counter-seciton-container-main",
            start: "top 80%",
            once: true,
            onEnter: animateCounterValues,
          },
        });

        const storyTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: ".about-story-section-main",
            start: "top 76%",
          },
        });

        storyTimeline
          .from(".about-story-section__eyebrow", {
            y: 22,
            autoAlpha: 0,
            duration: 0.54,
          })
          .from(
            ".about-story-section__title",
            {
              x: -36,
              autoAlpha: 0,
              duration: 0.86,
            },
            "-=0.22",
          )
          .from(
            ".about-story-section__description",
            {
              y: 24,
              autoAlpha: 0,
              duration: 0.72,
            },
            "-=0.46",
          )
          .from(
            ".about-story-section__image-frame",
            {
              x: 54,
              autoAlpha: 0,
              scale: 0.95,
              duration: 1,
            },
            "-=0.74",
          );

        gsap.to(".about-story-section__image", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-story-section-main",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });

        gsap.utils.toArray<HTMLElement>(".about-value-section-main").forEach((section) => {
          const container = section.querySelector(".about-value-section-container");
          const reverse = container?.classList.contains("about-value-section-container--reverse");
          const contentX = reverse ? 48 : -48;
          const mediaX = reverse ? -60 : 60;

          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
              },
            })
            .from(section.querySelector(".about-value-section__eyebrow"), {
              y: 18,
              autoAlpha: 0,
              duration: 0.52,
            })
            .from(
              [
                section.querySelector(".about-value-section__title"),
                section.querySelector(".about-value-section__description"),
              ].filter(Boolean),
              {
                x: contentX,
                autoAlpha: 0,
                duration: 0.78,
                stagger: 0.12,
              },
              "-=0.22",
            )
            .from(
              section.querySelector(".about-value-section__image-frame"),
              {
                x: mediaX,
                autoAlpha: 0,
                scale: 0.95,
                duration: 0.98,
              },
              "-=0.7",
            );

          const image = section.querySelector(".about-value-section__image");

          if (image) {
            gsap.to(image, {
              yPercent: reverse ? -6 : 6,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.65,
              },
            });
          }
        });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: ".about-logo-scroll-section-main",
              start: "top 80%",
            },
          })
          .from(".about-logo-scroll-section__title", {
            y: 34,
            autoAlpha: 0,
            duration: 0.8,
          })
          .from(
            ".about-logo-scroll-section__description",
            {
              y: 22,
              autoAlpha: 0,
              duration: 0.66,
            },
            "-=0.5",
          )
          .from(
            ".about-logo-scroll-section-track-wrap",
            {
              y: 36,
              autoAlpha: 0,
              duration: 0.9,
            },
            "-=0.4",
          )
          .from(
            ".about-logo-scroll-section-item",
            {
              y: 24,
              autoAlpha: 0,
              scale: 0.92,
              duration: 0.54,
              stagger: {
                each: 0.04,
                from: "center",
              },
            },
            "-=0.54",
          );

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
          y: 30,
          autoAlpha: 0,
          duration: 0.6,
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
          ".about-hero-image-wrap, .about-story-section__image-frame, .about-value-section__image-frame",
          { move: 10, rotate: 2.6, scale: 1.012 },
        );
        addPointerTilt(".testimonial-card, .bottom-cta-panel", {
          move: 8,
          rotate: 2.4,
          scale: 1.012,
        });
        addButtonMotion(".about-hero-actions__button");
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(
          [
            ".about-hero-copy__triangle",
            ".about-hero-copy__title-line",
            ".about-hero-copy__flower",
            ".about-hero-actions__description",
            ".about-hero-actions__buttons > *",
            ".about-hero-image-wrap",
          ],
          {
            y: 26,
            autoAlpha: 0,
            duration: 0.72,
            stagger: 0.08,
            ease: "power3.out",
          },
        );

        gsap.to(".about-hero-image", {
          scale: 1.025,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".about-hero-copy__flower", {
          y: -6,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.utils
          .toArray<HTMLElement>(
            [
              ".counter-seciton-container-main",
              ".about-story-section-main",
              ".about-value-section-main",
              ".about-logo-scroll-section-main",
              ".testimonials-section-container-main",
              ".bottom-cta-section-container",
              ".footer-section-container-main",
            ].join(","),
          )
          .forEach((section) => {
            const targets = section.querySelectorAll(
              "h2, h3, p, article, .about-story-section__image-frame, .about-value-section__image-frame, .about-logo-scroll-section-track-wrap",
            );

            gsap.from(targets, {
              y: 26,
              autoAlpha: 0,
              duration: 0.58,
              stagger: 0.04,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
              },
            });
          });

        ScrollTrigger.create({
          trigger: ".counter-seciton-container-main",
          start: "top 84%",
          once: true,
          onEnter: animateCounterValues,
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

export default AboutpageMotion;
