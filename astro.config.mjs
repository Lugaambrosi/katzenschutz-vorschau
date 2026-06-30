import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// Deploy als GitHub-Projektseite: https://lugaambrosi.github.io/katzenschutz-vorschau/
export default defineConfig({
  site: "https://lugaambrosi.github.io",
  base: "/katzenschutz-vorschau/",
  // .html-Endungen wie auf der Live-Seite (impressum.html, datenschutz.html, danke.html)
  build: { format: "file" },
  integrations: [react(), tailwind({ applyBaseStyles: false })],
});
