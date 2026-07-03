import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// Zwei Deploy-Ziele aus einer Quelle:
//   Standard           -> Vorschau  https://lugaambrosi.github.io/katzenschutz-vorschau/
//   DEPLOY_TARGET=live -> Live      https://katzenschutz-miez.de/
// Live-Build: DEPLOY_TARGET=live npm run build
const isLive = process.env.DEPLOY_TARGET === "live";

export default defineConfig({
  site: isLive ? "https://katzenschutz-miez.de" : "https://lugaambrosi.github.io",
  base: isLive ? "/" : "/katzenschutz-vorschau/",
  // .html-Endungen wie auf der Live-Seite (impressum.html, datenschutz.html, danke.html)
  build: { format: "file" },
  integrations: [react(), tailwind({ applyBaseStyles: false })],
});
