import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "mobx-form-lite",
  base: "/mobx-form-lite",
  description: "mobx-form-lite | Mobx form library",

  lastUpdated: true,
  sitemap: {
    hostname: "https://kubk.github.io/mobx-form-lite/",
  },

  head: [
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-FFVNRL9XPJ",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FFVNRL9XPJ');`,
    ],
  ],

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
          { text: "Nested dynamic form", link: "/example-nested-dynamic-form" },
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
