"use client";

import { SubmitEvent, useState } from "react";
import ButtonBase from "@/components/buttons/button-base";
import InputEmail from "@/components/inputs/input-email";
import InputPassword from "@/components/inputs/input-password";
import BaseModal from "@/components/modal/base-modal";
import { isValidEmail } from "@/utils/validation-utils";

interface LoginModalProps {
  errorMessage?: string;
  open: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string) => void;
}

export default function LoginModal({
  open,
  errorMessage = "",
  isLoading = false,
  onClose,
  onSubmit,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = isValidEmail(email) && password.length >= 3;

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleClose = () => {
    if (isLoading) {
      return;
    }

    clearForm();
    onClose();
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <BaseModal open={open} onClose={handleClose} title="Log in">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {errorMessage ? (
          <p className="text-sm text-red-600">{errorMessage}</p>
        ) : null}
        <InputEmail
          id="login-email"
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />
        <InputPassword
          id="login-password"
          label="Password"
          value={password}
          onChange={setPassword}
        />
        <ButtonBase type="submit" className="w-full" disabled={!canSubmit}>
          Log in
        </ButtonBase>
      </form>
    </BaseModal>
  );
}
