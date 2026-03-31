"use client";

import { useEffect, useRef, useState } from "react";
import type { CourseDetail } from "@/sanity/types";

const imgCallIcon = "/images/icons/call.png";
const imgArrowIcon = "/images/icons/right-arrow.svg";

type CourseDetailSidebarProps = {
  course: CourseDetail;
};

const CourseDetailSidebar = ({ course }: CourseDetailSidebarProps) => {
  const [stickyMode, setStickyMode] = useState<"static" | "fixed" | "bottom">("static");
  const [metrics, setMetrics] = useState({ left: 0, width: 0, height: 0 });
  const shellRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateStickyState = () => {
      const shell = shellRef.current;
      const card = cardRef.current;

      if (!shell || !card) {
        return;
      }

      const layout = shell.closest(".course-detail-body-layout") as HTMLElement | null;

      if (!layout || window.innerWidth <= 1279) {
        setStickyMode("static");
        setMetrics({
          left: 0,
          width: shell.offsetWidth,
          height: card.offsetHeight,
        });
        return;
      }

      const shellRect = shell.getBoundingClientRect();
      const layoutRect = layout.getBoundingClientRect();
      const topOffset = 112;
      const cardHeight = card.offsetHeight;

      setMetrics({
        left: shellRect.left,
        width: shellRect.width,
        height: cardHeight,
      });

      if (shellRect.top <= topOffset && layoutRect.bottom > cardHeight + topOffset) {
        setStickyMode("fixed");
        return;
      }

      if (layoutRect.bottom <= cardHeight + topOffset) {
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

  const brochureHref = course.brochureFileUrl || course.brochureUrl;
  const hasApplyUrl = Boolean(course.applyUrl);

  return (
    <aside className="course-detail-sidebar-shell" ref={shellRef}>
      <div
        className="course-detail-sidebar-spacer"
        aria-hidden="true"
        style={{ height: stickyMode === "fixed" ? `${metrics.height}px` : 0 }}
      />
      <div
        className={`course-detail-sidebar ${
          stickyMode === "fixed"
            ? "course-detail-sidebar--fixed"
            : stickyMode === "bottom"
              ? "course-detail-sidebar--bottom"
              : ""
        }`.trim()}
        ref={cardRef}
        style={
          stickyMode === "fixed"
            ? {
                left: `${metrics.left}px`,
                width: `${metrics.width}px`,
              }
            : undefined
        }
      >
        {hasApplyUrl ? (
          <a className="primary-button primary-button--primary course-detail-sidebar__cta" href={course.applyUrl}>
            <span className="course-detail-sidebar__button-icon course-detail-sidebar__button-icon--solid">
              <img src={imgArrowIcon} alt="" aria-hidden="true" />
            </span>
            <span className="course-detail-sidebar__button-text">Apply Now</span>
          </a>
        ) : (
          <button
            className="primary-button primary-button--primary course-detail-sidebar__cta"
            type="button"
            disabled
          >
            <span className="course-detail-sidebar__button-icon course-detail-sidebar__button-icon--solid">
              <img src={imgArrowIcon} alt="" aria-hidden="true" />
            </span>
            <span className="course-detail-sidebar__button-text">Apply Now</span>
          </button>
        )}
        <p className="course-detail-sidebar__placement">{course.placementCopy}</p>

        <div className="course-detail-sidebar__rows">
          <div className="course-detail-sidebar__row">
            <span className="course-detail-sidebar__row-label">Duration</span>
            <span className="course-detail-sidebar__row-value">{course.duration}</span>
          </div>
          <div className="course-detail-sidebar__row">
            <span className="course-detail-sidebar__row-label">Session Duration</span>
            <span className="course-detail-sidebar__row-value">{course.sessionDuration}</span>
          </div>
          <div className="course-detail-sidebar__row">
            <span className="course-detail-sidebar__row-label">Class Schedule</span>
            <span className="course-detail-sidebar__row-value">{course.classSchedule}</span>
          </div>
          <div className="course-detail-sidebar__row">
            <span className="course-detail-sidebar__row-label">Mode</span>
            <span className="course-detail-sidebar__row-value">{course.mode}</span>
          </div>
          <div className="course-detail-sidebar__row">
            <span className="course-detail-sidebar__row-label">Enrolled</span>
            <span className="course-detail-sidebar__row-value">{course.enrolled}</span>
          </div>
        </div>

        <div className="course-detail-sidebar__support">
          <p className="course-detail-sidebar__support-copy">{course.supportCopy}</p>
          <a className="course-detail-sidebar__phone" href={`tel:${course.callNumber.replace(/\s+/g, "")}`}>
            <span className="course-detail-sidebar__button-icon">
              <img src={imgCallIcon} alt="" aria-hidden="true" />
            </span>
            <span className="course-detail-sidebar__button-text">Call Us: {course.callNumber}</span>
          </a>
          {brochureHref ? (
            <a
              className="primary-button primary-button--primary course-detail-sidebar__brochure"
              href={brochureHref}
              target="_blank"
              rel="noreferrer"
            >
              <span className="course-detail-sidebar__button-icon course-detail-sidebar__button-icon--solid course-detail-sidebar__button-icon--download">
                <img src={imgArrowIcon} alt="" aria-hidden="true" />
              </span>
              <span className="course-detail-sidebar__button-text">Download Brochure</span>
            </a>
          ) : (
            <button
              className="primary-button primary-button--primary course-detail-sidebar__brochure"
              type="button"
              disabled
            >
              <span className="course-detail-sidebar__button-icon course-detail-sidebar__button-icon--solid course-detail-sidebar__button-icon--download">
                <img src={imgArrowIcon} alt="" aria-hidden="true" />
              </span>
              <span className="course-detail-sidebar__button-text">Download Brochure</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default CourseDetailSidebar;
