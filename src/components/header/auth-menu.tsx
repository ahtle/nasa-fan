"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/auth";
import ButtonBase from "@/components/buttons/button-base";
import LoginModal from "./login-modal";

export function AuthMenu() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data, { email }) => {
      console.log(data);
      setUserEmail(email);
      setLoginOpen(false);
    },
  });

  const handleLogout = () => {
    setUserEmail(null);
    setMenuOpen(false);
  };

  const handleSubmit = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  const handleCloseModal = () => {
    loginMutation.reset();
    setLoginOpen(false);
  };

  if (userEmail) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          className="max-w-[12rem] truncate font-semibold text-nasa-blue cursor-pointer
            hover:underline hover:decoration-2 hover:decoration-nasa-light-blue
            focus-visible:text-nasa-blue focus-visible:outline-2 focus-visible:outline-nasa-light-blue focus-visible:outline-offset-2"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {userEmail}
        </button>

        {menuOpen ? (
          <div
            role="menu"
            className="absolute right-0 z-20 mt-2 min-w-[10rem] rounded-lg border border-zinc-200 bg-white py-1 shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              className="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-200 cursor-pointer"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <ButtonBase onClick={() => setLoginOpen(true)}>Log in</ButtonBase>
      {loginOpen && (
        <LoginModal
          open
          errorMessage={loginMutation.error?.message}
          isLoading={loginMutation.isPending}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
