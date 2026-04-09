"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import gsap from "gsap";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { urlForImage } from "@/sanity/lib/image";
import type { CourseDetail } from "@/sanity/types";
import "./style.scss";

const imgTick = "/images/icons/who-can-join-tick.png";

const overviewPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value) {
        return null;
      }

      const imageUrl = urlForImage(value).width(1400).fit("max").auto("format").url();

      return (
        <figure className="course-detail-panel__intro-media">
          <img src={imageUrl} alt={value.alt || ""} />
        </figure>
      );
    },
  },
};

type CourseDetailTabsProps = {
  course: CourseDetail;
};

const sectionIds = {
  overview: "course-overview",
  modules: "course-modules",
  features: "course-features",
  trainers: "course-trainers",
} as const;

type SectionKey = keyof typeof sectionIds;

const tabItems: Array<{ key: SectionKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "modules", label: "Modules" },
  { key: "features", label: "Features" },
  { key: "trainers", label: "Trainers" },
];

const CourseDetailTabs = ({ course }: CourseDetailTabsProps) => {
  const [openModuleIndex, setOpenModuleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");
  const [stickyMode, setStickyMode] = useState<"static" | "fixed" | "bottom">("static");
  const [navMetrics, setNavMetrics] = useState({ left: 0, width: 0, height: 0 });
  const shellRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const sectionRefs = useRef<Partial<Record<SectionKey, HTMLElement | null>>>({});
  const tabRefs = useRef<Partial<Record<SectionKey, HTMLButtonElement | null>>>({});
  const accordionContentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const accordionInnerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const accordionVerticalBarRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const hasModules = (course.modules?.length ?? 0) > 0;
  const hasFeatureColumns = (course.featureColumns?.length ?? 0) > 0;
  const hasTrainers = (course.trainers?.length ?? 0) > 0;
  const overviewContent = useMemo(() => {
    if (Array.isArray(course.overviewParagraph)) {
      return course.overviewParagraph;
    }

    if (typeof course.overviewParagraph === "string" && course.overviewParagraph.trim().length > 0) {
      return [
        {
          _type: "block",
          _key: "legacy-overview",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "legacy-overview-span",
              text: course.overviewParagraph,
              marks: [],
            },
          ],
        },
      ];
    }

    return [];
  }, [course.overviewParagraph]);
  const filteredTabItems = useMemo(
    () =>
      tabItems.filter((item) => {
        if (item.key === "modules") {
          return hasModules;
        }

        if (item.key === "features") {
          return hasFeatureColumns;
        }

        if (item.key === "trainers") {
          return hasTrainers;
        }

        return true;
      }),
    [hasModules, hasFeatureColumns, hasTrainers],
  );
  const resolvedActiveSection = useMemo<SectionKey>(() => {
    const hasActiveSection = filteredTabItems.some((item) => item.key === activeSection);

    if (hasActiveSection) {
      return activeSection;
    }

    return filteredTabItems[0]?.key ?? "overview";
  }, [activeSection, filteredTabItems]);

  const updateIndicator = (section: SectionKey) => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const activeTab = tabRefs.current[section];

    if (!nav || !indicator || !activeTab) {
      return;
    }

    gsap.to(indicator, {
      x: activeTab.offsetLeft,
      width: activeTab.offsetWidth,
      duration: 0.38,
      ease: "power3.out",
    });
  };

  useLayoutEffect(() => {
    updateIndicator(resolvedActiveSection);

    const handleResize = () => updateIndicator(resolvedActiveSection);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [resolvedActiveSection]);

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio);

        if (visible.length === 0) {
          return;
        }

        const nextActive = visible[0].target.getAttribute("data-section-key") as SectionKey | null;

        if (nextActive) {
          setActiveSection(nextActive);
        }
      },
      {
        rootMargin: "-160px 0px -52% 0px",
        threshold: [0.2, 0.35, 0.55, 0.75],
      },
    );

    filteredTabItems.forEach(({ key }) => {
      const section = sectionRefs.current[key];

      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredTabItems]);

  useEffect(() => {
    const updateStickyState = () => {
      const shell = shellRef.current;
      const nav = navRef.current;

      if (!shell || !nav) {
        return;
      }

      if (window.innerWidth <= 767) {
        setStickyMode("static");
        setNavMetrics((previous) => ({
          ...previous,
          width: shell.offsetWidth,
          height: nav.offsetHeight,
        }));
        return;
      }

      const shellRect = shell.getBoundingClientRect();
      const topOffset = 12;
      const navHeight = nav.offsetHeight;

      setNavMetrics({
        left: shellRect.left,
        width: shellRect.width,
        height: navHeight,
      });

      if (shellRect.top <= topOffset && shellRect.bottom > navHeight + topOffset) {
        setStickyMode("fixed");
        return;
      }

      if (shellRect.bottom <= navHeight + topOffset) {
        setStickyMode("bottom");
        return;
      }

      setStickyMode("static");
    };

    updateStickyState();

    window.addEventListener("scroll", updateStickyState, { passive: true });
    window.addEventListener("resize", updateStickyState);

    return () => {
      window.removeEventListener("scroll", updateStickyState);
      window.removeEventListener("resize", updateStickyState);
    };
  }, []);

  useEffect(() => {
    accordionContentRefs.current.forEach((content, index) => {
      const inner = accordionInnerRefs.current[index];
      const verticalBar = accordionVerticalBarRefs.current[index];
      const isOpen = openModuleIndex === index;

      if (!content || !inner) {
        return;
      }

      gsap.killTweensOf(content);
      gsap.killTweensOf(inner);

      if (verticalBar) {
        gsap.killTweensOf(verticalBar);
      }

      gsap.to(content, {
        height: isOpen ? inner.offsetHeight : 0,
        opacity: isOpen ? 1 : 0,
        duration: isOpen ? 0.42 : 0.28,
        ease: isOpen ? "power3.out" : "power2.inOut",
      });

      gsap.to(inner, {
        y: isOpen ? 0 : -10,
        duration: isOpen ? 0.42 : 0.24,
        ease: "power3.out",
      });

      if (verticalBar) {
        gsap.to(verticalBar, {
          scaleY: isOpen ? 0 : 1,
          duration: 0.28,
          ease: "power2.out",
          transformOrigin: "center center",
        });
      }
    });
  }, [openModuleIndex]);

  const scrollToSection = (key: SectionKey) => {
    const section = sectionRefs.current[key];

    if (!section) {
      return;
    }

    const topOffset = 158;
    const targetTop = section.getBoundingClientRect().top + window.scrollY - topOffset;

    setActiveSection(key);

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="course-detail-tabs-shell" ref={shellRef}>
      <div
        className="course-detail-tabs-nav-spacer"
        aria-hidden="true"
        style={{ height: stickyMode === "fixed" ? `${navMetrics.height}px` : 0 }}
      />
      <div
        className={`course-detail-tabs-nav ${
          stickyMode === "fixed"
            ? "course-detail-tabs-nav--fixed"
            : stickyMode === "bottom"
              ? "course-detail-tabs-nav--bottom"
              : ""
        }`.trim()}
        ref={navRef}
        style={
          stickyMode === "fixed"
            ? {
                left: `${navMetrics.left}px`,
                width: `${navMetrics.width}px`,
              }
            : undefined
        }
      >
        <span className="course-detail-tabs-nav__indicator" ref={indicatorRef} aria-hidden="true" />
        {filteredTabItems.map((item) => (
          <button
            key={item.key}
            ref={(node) => {
              tabRefs.current[item.key] = node;
            }}
            className={`course-detail-tabs-nav__item ${
              resolvedActiveSection === item.key ? "course-detail-tabs-nav__item--active" : ""
            }`.trim()}
            type="button"
            onClick={() => scrollToSection(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section
        className="course-detail-panel"
        id={sectionIds.overview}
        data-section-key="overview"
        ref={(node) => {
          sectionRefs.current.overview = node;
        }}
      >
        <div className="course-detail-panel__header">
          <p className="course-detail-panel__eyebrow">{course.tag}</p>
          <h2 className="course-detail-panel__title">{course.overviewTitle}</h2>
        </div>
        <div className="course-detail-panel__intro-rich">
          <PortableText value={overviewContent} components={overviewPortableTextComponents} />
        </div>
        <div className="course-detail-outcomes">
          {course.outcomes.map((item) => (
            <div className="course-detail-outcomes__item" key={item}>
              <img src={imgTick} alt="" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {hasModules && (
        <section
          className="course-detail-panel"
          id={sectionIds.modules}
          data-section-key="modules"
          ref={(node) => {
            sectionRefs.current.modules = node;
          }}
        >
          <div className="course-detail-panel__header">
            <p className="course-detail-panel__eyebrow">Course Content</p>
            <h2 className="course-detail-panel__title">Modules that build real skill</h2>
          </div>
          <div className="course-detail-accordion">
            {course.modules.map((module, index) => {
              const isOpen = openModuleIndex === index;
              return (
                <div className="course-detail-accordion__item" key={module.title}>
                  <button
                    className={`course-detail-accordion__trigger ${
                      isOpen ? "course-detail-accordion__trigger--active" : ""
                    }`.trim()}
                    type="button"
                    onClick={() => setOpenModuleIndex(isOpen ? -1 : index)}
                  >
                    <span>{module.title}</span>
                    <span className="course-detail-accordion__icon" aria-hidden="true">
                      <span className="course-detail-accordion__icon-bar course-detail-accordion__icon-bar--horizontal" />
                      <span
                        className="course-detail-accordion__icon-bar course-detail-accordion__icon-bar--vertical"
                        ref={(node) => {
                          accordionVerticalBarRefs.current[index] = node;
                        }}
                      />
                    </span>
                  </button>
                  <div
                    className="course-detail-accordion__content"
                    ref={(node) => {
                      accordionContentRefs.current[index] = node;
                    }}
                  >
                    <div
                      className="course-detail-accordion__content-inner"
                      ref={(node) => {
                        accordionInnerRefs.current[index] = node;
                      }}
                    >
                      <p>{module.summary}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {hasFeatureColumns && (
        <section
          className="course-detail-panel"
          id={sectionIds.features}
          data-section-key="features"
          ref={(node) => {
            sectionRefs.current.features = node;
          }}
        >
          <div className="course-detail-panel__header">
            <p className="course-detail-panel__eyebrow">Why this program works</p>
            <h2 className="course-detail-panel__title">Built for practice, clarity, and confidence</h2>
          </div>
          <div className="course-detail-feature-columns">
            {course.featureColumns.map((column) => (
              <div className="course-detail-feature-column" key={column.title}>
                <h3>{column.title}</h3>
                <div className="course-detail-feature-column__divider" />
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>
                      <img src={imgTick} alt="" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {hasTrainers && (
        <section
          className="course-detail-panel"
          id={sectionIds.trainers}
          data-section-key="trainers"
          ref={(node) => {
            sectionRefs.current.trainers = node;
          }}
        >
          <div className="course-detail-panel__header">
            <p className="course-detail-panel__eyebrow">Meet the mentors</p>
            <h2 className="course-detail-panel__title">Learn from people who build and review work every day</h2>
          </div>
          <div className="course-detail-trainers">
            {course.trainers?.map((trainer) => (
              <article className="course-detail-trainer-card" key={trainer.name}>
                <div className="course-detail-trainer-card__media">
                  <div className="course-detail-trainer-card__shape" />
                  {trainer.image ? (
                    <img
                      src={urlForImage(trainer.image).width(500).height(500).fit("crop").url()}
                      alt={trainer.image.alt || trainer.name}
                    />
                  ) : (
                    <div className="course-detail-trainer-card__fallback" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.314 0-6 2.239-6 5v1h12v-1c0-2.761-2.686-5-6-5Z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="course-detail-trainer-card__content">
                  <h3>{trainer.name}</h3>
                  <p className="course-detail-trainer-card__role">{trainer.role}</p>
                  <p className="course-detail-trainer-card__bio">{trainer.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="course-detail-panel course-detail-panel--form">
        <div className="course-detail-panel__header">
          <p className="course-detail-panel__eyebrow">Let’s talk</p>
          <h2 className="course-detail-panel__title">Have questions about this course?</h2>
        </div>
        <form className="course-detail-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="tel" placeholder="Phone Number" />
          <textarea placeholder="Tell us what you want to know" rows={4} />
          <button className="primary-button primary-button--primary course-detail-form__submit" type="button">
            Send Enquiry
          </button>
        </form>
      </section>
    </div>
  );
};

export default CourseDetailTabs;
