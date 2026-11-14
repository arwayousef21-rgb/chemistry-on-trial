/** Bindings available to the Worker (see wrangler.jsonc). */
export interface Env {
  /** Static site (the approved Stage 2 build in dist/). */
  ASSETS: Fetcher;
  /** D1 database (local SQLite in development and CI). */
  DB: D1Database;
  /** "development" locally; "production" only at go-live. */
  APP_ENV: string;
  /**
   * Teacher password — a server-side SECRET. Never in frontend code or GitHub.
   * Local development: `.dev.vars` (git-ignored). Go-live: `wrangler secret put TEACHER_PASSWORD`.
   */
  TEACHER_PASSWORD?: string;
}
