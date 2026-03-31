"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import "./global-experience.scss";

type TransitionContextValue = {
  navigateWithTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

const LOGO_SRC = "/images/aider-academy-logo.png";
const SESSION_KEY = "aider-experience-loader-seen";

type GlobalExperienceLayerProps = {
  children: ReactNode;
  enabled?: boolean;
};

export const useTransitionNavigation = () => useContext(TransitionContext);

const GlobalExperienceLayer = ({
  children,
  enabled = true,
}: GlobalExperienceLayerProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const logoBaseRef = useRef<HTMLImageElement | null>(null);
  const logoFillRef = useRef<HTMLImageElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const progressTrackRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const progressDotRef = useRef<HTMLDivElement | null>(null);
  const routeLabelRef = useRef<HTMLSpanElement | null>(null);
  const initializedRef = useRef(false);
  const initialLoaderPlayedRef = useRef(false);
  const pendingHrefRef = useRef<string | null>(null);
  const currentPathRef = useRef(pathname);
  const isTransitioningRef = useRef(false);

  const setOverlayIdle = useCallback(() => {
    const overlay = overlayRef.current;
    const veil = veilRef.current;
    const glow = glowRef.current;
    const logoWrap = logoWrapRef.current;
    const logoBase = logoBaseRef.current;
    const logoFill = logoFillRef.current;
    const tagline = taglineRef.current;
    const progressTrack = progressTrackRef.current;
    const progressFill = progressFillRef.current;
    const progressDot = progressDotRef.current;

    if (
      !overlay ||
      !veil ||
      !glow ||
      !logoWrap ||
      !logoBase ||
      !logoFill ||
      !tagline ||
      !progressTrack ||
      !progressFill ||
      !progressDot
    ) {
      return;
    }

    gsap.set(overlay, {
      autoAlpha: 0,
      pointerEvents: "none",
    });
    gsap.set(veil, {
      autoAlpha: 0,
      scale: 1.02,
    });
    gsap.set(glow, {
      autoAlpha: 0,
      scale: 0.92,
    });
    gsap.set(logoWrap, {
      autoAlpha: 0,
      y: 20,
      scale: 0.94,
    });
    gsap.set(logoBase, {
      autoAlpha: 0.2,
    });
    gsap.set(logoFill, {
      clipPath: "inset(0 100% 0 0)",
    });
    gsap.set(tagline, {
      autoAlpha: 0,
      y: 10,
    });
    gsap.set(progressTrack, {
      autoAlpha: 0,
      y: 10,
    });
    gsap.set(progressFill, {
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(progressDot, {
      xPercent: -100,
      autoAlpha: 0,
    });
  }, []);

  const playInitialLoader = useCallback(() => {
    const overlay = overlayRef.current;
    const veil = veilRef.current;
    const glow = glowRef.current;
    const logoWrap = logoWrapRef.current;
    const logoFill = logoFillRef.current;
    const tagline = taglineRef.current;
    const progressTrack = progressTrackRef.current;
    const progressFill = progressFillRef.current;
    const progressDot = progressDotRef.current;

    if (
      !overlay ||
      !veil ||
      !glow ||
      !logoWrap ||
      !logoFill ||
      !tagline ||
      !progressTrack ||
      !progressFill ||
      !progressDot
    ) {
      return;
    }

    isTransitioningRef.current = true;

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        setOverlayIdle();
        isTransitioningRef.current = false;
      },
    });

    timeline
      .set(overlay, { autoAlpha: 1, pointerEvents: "auto" })
      .to(veil, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.42,
      })
      .to(
        glow,
        {
          autoAlpha: 0.92,
          scale: 1,
          duration: 0.54,
        },
        0.08,
      )
      .to(
        logoWrap,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.58,
        },
        0.1,
      )
      .to(
        progressTrack,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
        },
        0.24,
      )
      .to(
        tagline,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.34,
        },
        0.28,
      )
      .to(
        logoFill,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power2.inOut",
        },
        0.34,
      )
      .to(
        progressFill,
        {
          scaleX: 1,
          duration: 1.08,
          ease: "power2.inOut",
        },
        0.38,
      )
      .fromTo(
        progressDot,
        {
          autoAlpha: 0.2,
          xPercent: -100,
        },
        {
          autoAlpha: 1,
          xPercent: 0,
          x: () => (progressTrack.clientWidth ? progressTrack.clientWidth - 12 : 220),
          duration: 1.08,
          ease: "power2.inOut",
        },
        0.38,
      )
      .to(
        [tagline, progressTrack],
        {
          autoAlpha: 0,
          y: -8,
          duration: 0.22,
        },
        1.62,
      )
      .to(
        logoWrap,
        {
          autoAlpha: 0,
          y: -18,
          scale: 1.04,
          duration: 0.34,
        },
        1.7,
      )
      .to(
        glow,
        {
          autoAlpha: 0,
          scale: 1.08,
          duration: 0.3,
        },
        1.72,
      )
      .to(
        veil,
        {
          autoAlpha: 0,
          duration: 0.34,
        },
        1.8,
      )
      .to(
        overlay,
        {
          autoAlpha: 0,
          pointerEvents: "none",
          duration: 0.01,
        },
        2.14,
      );
  }, [setOverlayIdle]);

  const playRouteEnter = useCallback(() => {
    const overlay = overlayRef.current;
    const veil = veilRef.current;
    const glow = glowRef.current;
    const logoWrap = logoWrapRef.current;
    const logoFill = logoFillRef.current;
    const progressTrack = progressTrackRef.current;
    const progressFill = progressFillRef.current;
    const progressDot = progressDotRef.current;
    const routeLabel = routeLabelRef.current;

    if (
      !overlay ||
      !veil ||
      !glow ||
      !logoWrap ||
      !logoFill ||
      !progressTrack ||
      !progressFill ||
      !progressDot ||
      !routeLabel
    ) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setOverlayIdle();
        isTransitioningRef.current = false;
      },
    });

    timeline
      .set(overlay, { autoAlpha: 1, pointerEvents: "none" })
      .set(logoFill, { clipPath: "inset(0 38% 0 0)" })
      .set(progressFill, { scaleX: 0.62 })
      .set(progressDot, {
        autoAlpha: 1,
        xPercent: 0,
        x: () => (progressTrack.clientWidth ? progressTrack.clientWidth * 0.62 : 160),
      })
      .set(routeLabel, { autoAlpha: 1, y: 0 })
      .to(veil, {
        autoAlpha: 0.92,
        duration: 0.14,
      })
      .to(
        glow,
        {
          autoAlpha: 0.8,
          scale: 1,
          duration: 0.2,
        },
        0,
      )
      .to(
        logoWrap,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
        },
        0,
      )
      .to(
        logoFill,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.28,
        },
        0.04,
      )
      .to(
        progressFill,
        {
          scaleX: 1,
          duration: 0.26,
        },
        0.04,
      )
      .to(
        progressDot,
        {
          x: () => (progressTrack.clientWidth ? progressTrack.clientWidth - 12 : 220),
          duration: 0.26,
        },
        0.04,
      )
      .to(
        [routeLabel, progressTrack],
        {
          autoAlpha: 0,
          y: -8,
          duration: 0.16,
        },
        0.28,
      )
      .to(
        logoWrap,
        {
          autoAlpha: 0,
          y: -14,
          scale: 1.03,
          duration: 0.2,
        },
        0.34,
      )
      .to(
        [veil, glow],
        {
          autoAlpha: 0,
          duration: 0.2,
        },
        0.38,
      )
      .to(
        overlay,
        {
          autoAlpha: 0,
          duration: 0.01,
        },
        0.58,
      );
  }, [setOverlayIdle]);

  const navigateWithTransition = useCallback((href: string) => {
    if (!enabled) {
      if (href !== pathname) {
        router.push(href);
      }
      return;
    }

    if (isTransitioningRef.current || href === pathname) {
      return;
    }

    const overlay = overlayRef.current;
    const veil = veilRef.current;
    const glow = glowRef.current;
    const logoWrap = logoWrapRef.current;
    const logoFill = logoFillRef.current;
    const progressTrack = progressTrackRef.current;
    const progressFill = progressFillRef.current;
    const progressDot = progressDotRef.current;
    const routeLabel = routeLabelRef.current;

    if (
      !overlay ||
      !veil ||
      !glow ||
      !logoWrap ||
      !logoFill ||
      !progressTrack ||
      !progressFill ||
      !progressDot ||
      !routeLabel
    ) {
      router.push(href);
      return;
    }

    pendingHrefRef.current = href;
    isTransitioningRef.current = true;
    routeLabel.textContent = href.replace("/", "") || "home";

    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    timeline
      .set(overlay, { autoAlpha: 1, pointerEvents: "auto" })
      .set(routeLabel, { autoAlpha: 0, y: 10 })
      .to(veil, {
        autoAlpha: 1,
        duration: 0.16,
      })
      .to(
        glow,
        {
          autoAlpha: 0.85,
          scale: 1,
          duration: 0.22,
        },
        0.02,
      )
      .to(
        logoWrap,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.24,
        },
        0.02,
      )
      .to(
        progressTrack,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.18,
        },
        0.06,
      )
      .to(
        routeLabel,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.18,
        },
        0.1,
      )
      .to(
        logoFill,
        {
          clipPath: "inset(0 38% 0 0)",
          duration: 0.32,
        },
        0.12,
      )
      .to(
        progressFill,
        {
          scaleX: 0.62,
          duration: 0.32,
        },
        0.12,
      )
      .fromTo(
        progressDot,
        {
          autoAlpha: 1,
          xPercent: 0,
          x: 0,
        },
        {
          x: () => (progressTrack.clientWidth ? progressTrack.clientWidth * 0.62 : 160),
          duration: 0.32,
        },
        0.12,
      )
      .add(() => {
        router.push(href);
      }, 0.32);
  }, [enabled, pathname, router]);

  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    setOverlayIdle();
    initializedRef.current = true;
  }, [enabled, setOverlayIdle]);

  useEffect(() => {
    if (!enabled || !initializedRef.current) {
      return;
    }

    const hasSeenLoader = window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (!hasSeenLoader && !initialLoaderPlayedRef.current) {
      if (routeLabelRef.current) {
        routeLabelRef.current.textContent = "welcome";
      }
      window.sessionStorage.setItem(SESSION_KEY, "1");
      initialLoaderPlayedRef.current = true;
      currentPathRef.current = pathname;
      playInitialLoader();
      return;
    }

    const previousPath = currentPathRef.current;
    currentPathRef.current = pathname;

    if (previousPath === pathname) {
      return;
    }

    if (routeLabelRef.current) {
      routeLabelRef.current.textContent = pathname.replace("/", "") || "home";
    }

    if (pendingHrefRef.current) {
      pendingHrefRef.current = null;
      playRouteEnter();
      return;
    }

    isTransitioningRef.current = true;
    playRouteEnter();
  }, [enabled, pathname, playInitialLoader, playRouteEnter]);

  return (
    <TransitionContext.Provider
      value={{
        navigateWithTransition,
      }}
    >
      {children}

      {enabled ? (
        <div className="global-experience" ref={overlayRef} aria-hidden="true">
          <div className="global-experience__veil" ref={veilRef}>
            <div className="global-experience__grid" />
            <div className="global-experience__glow" ref={glowRef} />
          </div>

          <div className="global-experience__center">
            <div className="global-experience__logo-wrap" ref={logoWrapRef}>
              <div className="global-experience__logo-stack">
                <img
                  className="global-experience__logo global-experience__logo--base"
                  ref={logoBaseRef}
                  src={LOGO_SRC}
                  alt=""
                />
                <img
                  className="global-experience__logo global-experience__logo--fill"
                  ref={logoFillRef}
                  src={LOGO_SRC}
                  alt=""
                />
              </div>

              <p className="global-experience__tagline" ref={taglineRef}>
                Learn. Create. Launch.
              </p>

              <div className="global-experience__progress-track" ref={progressTrackRef}>
                <div className="global-experience__progress-fill" ref={progressFillRef} />
                <div className="global-experience__progress-dot" ref={progressDotRef} />
              </div>

              <span className="global-experience__route-label" ref={routeLabelRef} />
            </div>
          </div>
        </div>
      ) : null}
    </TransitionContext.Provider>
  );
};

export default GlobalExperienceLayer;
