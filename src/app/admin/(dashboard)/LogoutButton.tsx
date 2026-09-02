"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-paper/30 px-4 py-1.5 text-xs text-paper/70 transition-colors hover:border-paper hover:text-paper"
    >
      Déconnexion
    </button>
  );
}
