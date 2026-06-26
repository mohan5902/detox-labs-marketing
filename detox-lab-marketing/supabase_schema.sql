-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company_name TEXT,
    business_type TEXT,
    service_required TEXT NOT NULL,
    budget TEXT,
    description TEXT,
    preferred_contact TEXT NOT NULL,
    ip_address TEXT,
    status TEXT NOT NULL DEFAULT 'New' CONSTRAINT check_status CHECK (status IN ('New', 'Contacted', 'Closed')),
    source TEXT NOT NULL,
    recommended_package TEXT,
    preferred_date TEXT,
    preferred_time TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
-- Since our Next.js backend routes will interact with Supabase using the service_role key,
-- they will automatically bypass RLS. This keeps the database secure from direct public access.
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Enable public write access (insert-only) for anonymous and authenticated users.
-- This acts as a robust backup policy in case the server uses/falls back to the anon key.
DROP POLICY IF EXISTS "Allow public insert" ON leads;
CREATE POLICY "Allow public insert" ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);
