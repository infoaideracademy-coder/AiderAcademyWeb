"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { useTransitionNavigation } from "./GlobalExperienceLayer";

type TransitionLinkProps = ComponentProps<typeof Link>;

const TransitionLink = ({ href, onClick, target, ...props }: TransitionLinkProps) => {
  const transition = useTransitionNavigation();
  const hrefString = typeof href === "string" ? href : href.toString();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const isModified =
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0;

    const isExternal =
      hrefString.startsWith("http") ||
      hrefString.startsWith("mailto:") ||
      hrefString.startsWith("tel:") ||
      hrefString.startsWith("#");

    if (isModified || target === "_blank" || isExternal || !transition) {
      return;
    }

    event.preventDefault();
    transition.navigateWithTransition(hrefString);
  };

  return <Link href={href} onClick={handleClick} target={target} {...props} />;
};

export default TransitionLink;
