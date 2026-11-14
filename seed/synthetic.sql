-- SYNTHETIC DEVELOPMENT DATA ONLY — never real students.
-- Emails use the reserved example.com domain; phone numbers are fictitious.
INSERT OR REPLACE INTO app_meta (key, value) VALUES ('dataset', 'synthetic');

INSERT OR IGNORE INTO students (id, research_code, full_name, email, phone, phone_shared, consent_at, created_at, last_active_at) VALUES
  ('00000000-0000-4000-8000-000000000001', 'S-0001', 'طالب تجريبي أول', 'synthetic.student1@example.com', '01000000001', 0, '2026-11-01T08:00:00Z', '2026-11-01T08:00:00Z', '2026-11-01T08:30:00Z'),
  ('00000000-0000-4000-8000-000000000002', 'S-0002', 'طالبة تجريبية ثانية', 'synthetic.student2@example.com', '01100000002', 1, '2026-11-01T08:05:00Z', '2026-11-01T08:05:00Z', '2026-11-02T09:00:00Z'),
  ('00000000-0000-4000-8000-000000000003', 'S-0003', 'Synthetic Student Three', 'synthetic.student3@example.com', '01100000002', 1, '2026-11-01T08:10:00Z', '2026-11-01T08:10:00Z', '2026-11-03T10:00:00Z');
