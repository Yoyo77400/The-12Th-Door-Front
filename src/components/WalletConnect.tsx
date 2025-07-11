"use client";
import { useLogin } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

export default function WalletConnect() {
  const { login } = useLogin();
  return (
    <Button variant="default" onClick={login}>
      Log in
    </Button>
  );
}
