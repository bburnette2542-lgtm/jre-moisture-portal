import { cookies } from "next/headers";
import type { Role } from "@/lib/types";

export const ROLE_COOKIE = "jre_role";

export async function readRole(): Promise<Role | null> {
  const jar = await cookies();
  const value = jar.get(ROLE_COOKIE)?.value;
  if (value === "owner" || value === "ops") return value;
  return null;
}

export function isRole(value: unknown): value is Role {
  return value === "owner" || value === "ops";
}
