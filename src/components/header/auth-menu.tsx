"use client";

// lib
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearAccessToken, setAccessToken } from "@/lib/api";
import { authMeQueryKey, login } from "@/lib/auth";
import { useMe } from "@/hooks/use-me";

// store
import { useAppDispatch } from "@/stores/hooks";
import { setLoading } from "@/stores/main-slice";

// components
import ButtonBase from "@/components/buttons/button-base";
import LoginModal from "./login-modal";
import styles from "./nav.module.css";

export function AuthMenu() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { data: user, isAuthLoading } = useMe();
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
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      queryClient.setQueryData(authMeQueryKey, data.user);
      setLoginOpen(false);
    },
  });

  useEffect(() => {
    dispatch(setLoading(loginMutation.isPending));
  }, [dispatch, loginMutation.isPending]);

  const handleLogout = () => {
    clearAccessToken();
    queryClient.removeQueries({ queryKey: authMeQueryKey });
    setMenuOpen(false);
  };

  const handleSubmit = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  const handleCloseModal = () => {
    loginMutation.reset();
    setLoginOpen(false);
  };

  if (isAuthLoading) {
    return null;
  }

  if (user) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          className={styles["auth-menu-trigger"]}
          title={user.email}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles["auth-menu-label"]}>{user.email}</span>
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
