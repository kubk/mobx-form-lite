import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "mobx-form-lite",
  base: "/mobx-form-lite",
  description: "mobx-form-lite documentation",
  lastUpdated: true,
  sitemap: {
    hostname: 'https://kubk.github.io/mobx-form-lite/',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      {
        text: "Introduction",
        items: [{ text: "Quick start", link: "/quick-start" }],
      },
      {
        text: "Tutorials",
        items: [
          { text: "Login form + Antd and API", link: "/example-antd-api" },
          { text: "Next.js", link: "/example-nextjs" },
        ],
      },
      {
        text: "API",
        items: [
          { text: "Fields", link: "/api-fields" },
          { text: "Functions", link: "/api-functions" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/kubk/mobx-form-lite" },
    ],
  },
});
