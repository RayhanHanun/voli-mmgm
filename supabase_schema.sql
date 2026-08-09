-- ============================================
-- GLOW Volleyball Tournament - Supabase Schema
-- ============================================

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_score INT NOT NULL CHECK (home_score >= 0 AND home_score <= 2),
  away_score INT NOT NULL CHECK (away_score >= 0 AND away_score <= 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Ensure valid score combinations: 2-0, 0-2, 2-1, 1-2
  CONSTRAINT valid_score CHECK (
    (home_score = 2 AND away_score = 0) OR
    (home_score = 0 AND away_score = 2) OR
    (home_score = 2 AND away_score = 1) OR
    (home_score = 1 AND away_score = 2)
  ),

  -- Prevent same team playing itself
  CONSTRAINT different_teams CHECK (home_team != away_team),

  -- Valid team names only
  CONSTRAINT valid_home_team CHECK (home_team IN (
    'Malam Senin', 'Malam Selasa', 'Malam Rabu', 'Malam Kamis',
    'Malam Jumat', 'Malam Sabtu', 'Malam Minggu'
  )),
  CONSTRAINT valid_away_team CHECK (away_team IN (
    'Malam Senin', 'Malam Selasa', 'Malam Rabu', 'Malam Kamis',
    'Malam Jumat', 'Malam Sabtu', 'Malam Minggu'
  ))
);

-- Enable Row Level Security
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Allow public (anon) read access
CREATE POLICY "Allow public read" ON matches
  FOR SELECT USING (true);

-- Allow anon insert (admin PIN checked client-side)
CREATE POLICY "Allow anon insert" ON matches
  FOR INSERT WITH CHECK (true);

-- Allow anon delete (admin PIN checked client-side)
CREATE POLICY "Allow anon delete" ON matches
  FOR DELETE USING (true);
