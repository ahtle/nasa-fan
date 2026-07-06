import Image from "next/image";
import Link from "next/link";
import { AuthMenu } from "./auth-menu";
import { Nav } from "./nav";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm py-2 md:py-4">
      <div className="page-w-container flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/nasa-logo.png"
              alt="NASA Logo"
              width={44}
              height={44}
            />
            <h1>{"{ NASA Fan }"}</h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Nav />
          <AuthMenu />
        </div>
      </div>
    </header>
  );
}
