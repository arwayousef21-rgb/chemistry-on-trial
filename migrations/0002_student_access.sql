-- M1: student records, device sessions, teacher sessions and rate limiting (D15).
-- No passwords, no verification codes, no return codes for students.

CREATE TABLE IF NOT EXISTS students (
  id              TEXT PRIMARY KEY,            -- random UUID
  research_code   TEXT NOT NULL UNIQUE,        -- coded ID for research exports, e.g. S-0001
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL UNIQUE,        -- normalised (trimmed, lower-case)
  phone           TEXT NOT NULL,               -- normalised Egyptian mobile, 01XXXXXXXXX
  phone_shared    INTEGER NOT NULL DEFAULT 0,  -- 1 if another record uses the same phone (teacher review)
  consent_at      TEXT NOT NULL,
  created_at      TEXT NOT NULL,
  last_active_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_students_phone ON students (phone);

-- One row per signed-in browser. Only the SHA-256 hash of the session key is stored.
CREATE TABLE IF NOT EXISTS device_sessions (
  token_hash    TEXT PRIMARY KEY,
  student_id    TEXT NOT NULL REFERENCES students (id) ON DELETE CASCADE,
  created_at    TEXT NOT NULL,
  last_used_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_device_sessions_student ON device_sessions (student_id);

-- Teacher sign-in sessions (password is a server-side secret, never stored here).
CREATE TABLE IF NOT EXISTS teacher_sessions (
  token_hash  TEXT PRIMARY KEY,
  created_at  TEXT NOT NULL,
  expires_at  TEXT NOT NULL
);

-- Fixed-window rate limiting for resume and teacher sign-in attempts.
CREATE TABLE IF NOT EXISTS rate_limits (
  key           TEXT PRIMARY KEY,
  count         INTEGER NOT NULL,
  window_start  INTEGER NOT NULL   -- unix seconds
);

INSERT OR REPLACE INTO app_meta (key, value) VALUES ('schema_version', '2');
