/** Bindings available to the Worker (see wrangler.jsonc). */
export interface Env {
  /** Static site (the approved Stage 2 build in dist/). */
  ASSETS: Fetcher;
  /** D1 database (local SQLite in development and CI). */
  DB: D1Database;
  /** "development" locally; set to "production" only at go-live. */
  APP_ENV: string;
}
