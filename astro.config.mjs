import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// Deploy als GitHub-Projektseite: https://lugaambrosi.github.io/katzenschutz-vorschau/
export default defineConfig({
  site: "https://lugaambrosi.github.io",
  base: "/katzenschutz-vorschau/",
  integrations: [react(), tailwind({ applyBaseStyles: false })],
});
