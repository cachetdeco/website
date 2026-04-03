# Cloudflare Workers + Astro v6 Deployment Notes

## Stack
- Astro v6 + `@astrojs/cloudflare` adapter (v13+)
- Deployed as **Cloudflare Worker** (not Pages)
- Build: `npm run build` → Deploy: `npx wrangler deploy`

---

## Issue 1 — `wrangler.json` with `pages_build_output_dir` breaks deploy

**Error:**
```
The name 'ASSETS' is reserved in Pages projects. Please use a different name for your Assets binding.
```

**Cause:** Having `pages_build_output_dir` in `wrangler.json` makes Wrangler treat the project as a Pages project. The adapter generates `dist/server/wrangler.json` with an `ASSETS` binding for static assets, which is reserved in Pages context.

**Fix:** Remove `pages_build_output_dir` from `wrangler.json`, or delete the file entirely. The adapter generates a complete `dist/server/wrangler.json` — Wrangler picks it up automatically via config redirect.

---

## Issue 2 — `locals.runtime.env` removed in Astro v6

**Error:**
```
Astro.locals.runtime.env has been removed in Astro v6.
Use 'import { env } from "cloudflare:workers"' instead.
```

**Cause:** Astro v6 dropped the `locals.runtime.env` pattern for accessing Cloudflare env vars/bindings.

**Fix:**

```ts
// ❌ Astro v5 (broken in v6)
const runtime = (locals as any).runtime;
const apiKey = runtime?.env?.RESEND_API_KEY;

// ✅ Astro v6
import { env } from 'cloudflare:workers';
const apiKey = (env as unknown as Record<string, string>).RESEND_API_KEY;
```

Install types and add to `tsconfig.json`:
```bash
npm install --save-dev @cloudflare/workers-types
```
```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@cloudflare/workers-types"]
  }
}
```

---

## Env vars in Cloudflare Workers dashboard

- Set vars under **Worker → Settings → Variables and Secrets**
- They are accessible via `env` from `cloudflare:workers` at runtime
- Do **not** rely on `process.env` or `import.meta.env` for server-side secrets in Workers

---

## Wrangler config redirect (how it works)

When `astro build` runs, `@astrojs/cloudflare` generates `dist/server/wrangler.json`. Wrangler detects this and logs:
```
Using redirected Wrangler configuration.
- Configuration being used: "dist/server/wrangler.json"
- Original user's configuration: "wrangler.json"
```
The generated config includes the worker `main` entry, `assets` binding, `compatibility_date`, and any adapter-detected bindings (e.g. `IMAGES`, `SESSION`).
