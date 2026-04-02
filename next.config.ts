import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["googleapis", "google-auth-library"],
  /**
   * Pin Turbopack root so builds don’t pick a parent folder when another lockfile
   * exists above this app (common cause of failed or inconsistent Vercel builds).
   */
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
