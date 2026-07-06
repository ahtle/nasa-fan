"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav.module.css";

export function Nav() {
  const navItems = [
    {
      label: "Gallery",
      href: "/gallery",
    },
  ];

  const currentPath = usePathname();

  return (
    <nav className="inline-flex items-center gap-2">
      {navItems.map((item) => {
        const isActive = currentPath && currentPath.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={styles["nav-item"]}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
