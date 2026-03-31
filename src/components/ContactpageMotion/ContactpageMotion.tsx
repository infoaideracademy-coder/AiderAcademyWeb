"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type PointerTiltOptions = {
  move?: number;
  rotate?: number;
  scale?: number;
};

const ContactpageMotion = () => {
  useEffect(() => {
    const root = document.querySelector(".contact-page-main");

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
          const moveAmount = options.move ?? 8;
          const rotateAmount = options.rotate ?? 3;
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
            liftTo(-3);
            scaleTo(1.014);
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
          .from(".contact-hero-card__image", {
            scale: 1.12,
            autoAlpha: 0,
            duration: 1.24,
          })
          .from(
            ".contact-hero-card__overlay",
            {
              autoAlpha: 0,
              duration: 0.72,
            },
            0.12,
          )
          .from(
            ".contact-hero-card__eyebrow",
            {
              y: 18,
              autoAlpha: 0,
              duration: 0.54,
            },
            0.34,
          )
          .from(
            ".contact-hero-card__title",
            {
              y: 48,
              autoAlpha: 0,
              duration: 0.9,
            },
            0.42,
          )
          .from(
            ".contact-hero-card__description",
            {
              y: 24,
              autoAlpha: 0,
              duration: 0.7,
            },
            0.6,
          );

        gsap.to(".contact-hero-card__image", {
          scale: 1.05,
          duration: 5.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: ".contact-form-info-main",
              start: "top 76%",
            },
          })
          .from(".contact-form-info__heading > *", {
            x: -36,
            autoAlpha: 0,
            duration: 0.78,
            stagger: 0.12,
          })
          .from(
            ".contact-form-info__item",
            {
              y: 24,
              autoAlpha: 0,
              duration: 0.56,
              stagger: 0.08,
            },
            "-=0.42",
          )
          .from(
            ".contact-form__row, .contact-form > .contact-form__field, .contact-form__submit, .contact-form__success",
            {
              x: 42,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.08,
            },
            "-=0.6",
          );

        gsap.from(".contact-map__title", {
          y: 26,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-map-main",
            start: "top 80%",
          },
        });

        gsap.from(".contact-map__frame", {
          y: 44,
          autoAlpha: 0,
          scale: 0.97,
          duration: 0.94,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-map__frame",
            start: "top 82%",
          },
        });

        gsap.to(".contact-map__image", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact-map__frame",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.65,
          },
        });

        gsap.from(".contact-faq__heading > *", {
          y: 28,
          autoAlpha: 0,
          duration: 0.72,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-faq-main",
            start: "top 80%",
          },
        });

        gsap.from(".contact-faq__item", {
          y: 34,
          autoAlpha: 0,
          duration: 0.68,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-faq__items",
            start: "top 82%",
          },
        });

        gsap.from(".footer-section__top > *", {
          y: 30,
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

        addPointerTilt(".contact-hero-card, .contact-map__frame, .contact-form-info__form-wrap", {
          move: 10,
          rotate: 2.5,
          scale: 1.012,
        });
        addPointerTilt(".contact-form-info__item-icon", {
          move: 6,
          rotate: 2.2,
          scale: 1.05,
        });
        addButtonMotion(".contact-form__submit");
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(
          [
            ".contact-hero-card__eyebrow",
            ".contact-hero-card__title",
            ".contact-hero-card__description",
            ".contact-hero-card",
          ],
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.68,
            stagger: 0.08,
            ease: "power3.out",
          },
        );

        gsap.to(".contact-hero-card__image", {
          scale: 1.03,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.utils
          .toArray<HTMLElement>(
            [
              ".contact-form-info-main",
              ".contact-map-main",
              ".contact-faq-main",
              ".footer-section-container-main",
            ].join(","),
          )
          .forEach((section) => {
            gsap.from(
              section.querySelectorAll(
                "h2, h3, p, button, article, .contact-form__row, .contact-form > .contact-form__field, .contact-form__submit, .contact-map__frame",
              ),
              {
                y: 26,
                autoAlpha: 0,
                duration: 0.56,
                stagger: 0.04,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 86%",
                },
              },
            );
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

export default ContactpageMotion;
