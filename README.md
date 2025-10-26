# CobraGPT — Frontend (Tailwind + Next.js prototype)

This repository contains the frontend scaffold for CobraGPT: a cyber security chat assistant UI built with Next.js + TypeScript and TailwindCSS.

What I added in this change:

- Next.js + TypeScript scaffold (package.json, tsconfig)
- TailwindCSS configuration and PostCSS
- Global styles in `src/styles/globals.css`
- Core layout components: `Sidebar`, `Header`, `Layout`
- Chat page and `ChatWindow` component (mocked assistant reply)
- Basic routing pages under `src/pages`

How to run (Linux / zsh):

```bash
# install
pnpm install
# or npm install

# start dev server
pnpm dev
# or npm run dev
```

Notes:
- Authentication, payments, and backend integrations are stubbed/mocked for now. Next steps will implement settings, history, subscription UI, connectors, and API management pages.
