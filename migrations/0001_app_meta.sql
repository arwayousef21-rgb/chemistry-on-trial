-- M0: infrastructure only. Records the schema version and which dataset is loaded.
-- Student, attempt and progress tables arrive in M1/M2 (see content/ARCHITECTURE_DECISIONS.md D15).
CREATE TABLE IF NOT EXISTS app_meta (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
INSERT OR REPLACE INTO app_meta (key, value) VALUES ('schema_version', '1');
