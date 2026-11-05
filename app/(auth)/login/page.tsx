import AuthClient from "@/components/login/authClient";
import { Suspense } from "react";

export const metadata = { title: "Daxil ol" };

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthClient initialMode="login" />
    </Suspense>
  );
}
