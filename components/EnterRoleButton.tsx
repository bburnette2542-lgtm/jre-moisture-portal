"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Role } from "@/lib/types";

export function EnterRoleButton({
  role,
  href,
  children,
  className,
}: {
  role: Role;
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      className={className}
      onClick={async () => {
        setPending(true);
        await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        });
        router.push(href);
      }}
    >
      {pending ? "Opening…" : children}
    </button>
  );
}
