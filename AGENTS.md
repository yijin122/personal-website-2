<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- The site is a single Next.js app. `npm run dev` listens on port 4317 (`http://127.0.0.1:4317`).
- `LayoutProps` and the other route helpers are generated. Run `npx next typegen` before `npm run lint` or `tsc` on a fresh checkout. `next dev` and `next build` generate the same files. `next-env.d.ts` is gitignored.
