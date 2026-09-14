"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { normalizePath } from "@/lib/navigation";
/** Adds active-route semantics; transition interception is owned centrally by TransitionProvider. */
export function SiteLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      aria-current={
        typeof props.href === "string" &&
        normalizePath(pathname) === normalizePath(props.href)
          ? "page"
          : undefined
      }
      {...props}
    />
  );
}
