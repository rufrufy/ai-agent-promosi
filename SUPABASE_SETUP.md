# Panduan Setup Supabase untuk AI Agent Promosi BKPP

## 1. Setup Supabase Project

### Langkah-langkah:
1. **Buat Project Supabase**
   - Kunjungi https://supabase.com
   - Buat account baru atau login
   - Klik "New Project"
   - Pilih organization atau buat baru
   - Isi nama project: `ai-agent-promosi-bkpp`
   - Pilih password untuk database
   - Pilih region terdekat (Singapore/Southeast Asia)
   - Klik "Create new project"

2. **Setup Environment Variables**
   Buat file `.env.local` di root project:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_N8N_WEBHOOK=your_n8n_webhook_url
   ```

3. **Dapatkan Keys dari Supabase Dashboard**
   - Masuk ke project Supabase Anda
   - Klik "Settings" di sidebar kiri
   - Klik "API"
   - Copy `Project URL` dan `anon public key`
   - Paste ke file `.env.local`

## 2. Database Schema

### Table: profiles
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'pegawai')) DEFAULT 'pegawai',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### Table: jobs
```sql
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  location TEXT NOT NULL,
  salary TEXT,
  education TEXT,
  experience TEXT,
  description TEXT,
  deadline DATE NOT NULL,
  status TEXT CHECK (status IN ('active', 'hot', 'closing', 'closed')) DEFAULT 'active',
  applicants INTEGER DEFAULT 0,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view jobs
CREATE POLICY "Anyone can view jobs" ON jobs
  FOR SELECT USING (true);

-- Policy: Only admin can insert/update/delete jobs
CREATE POLICY "Only admin can manage jobs" ON jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

### Table: job_applications
```sql
CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own applications
CREATE POLICY "Users can view own applications" ON job_applications
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own applications
CREATE POLICY "Users can insert own applications" ON job_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Admin can view all applications
CREATE POLICY "Admin can view all applications" ON job_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

## 3. Authentication Setup

### Enable Email Authentication
1. Di Supabase Dashboard, masuk ke "Authentication" → "Settings"
2. Pastikan "Enable email confirmations" diaktifkan
3. Set "Site URL" ke `http://localhost:3000` untuk development
4. Set "Redirect URLs" untuk production nanti

### Auth Hooks (Trigger)
Buat function untuk auto-create profile saat user register:

```sql
-- Function to handle new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'pegawai');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 4. Sample Data

### Insert Sample Jobs
```sql
INSERT INTO jobs (title, institution, location, salary, education, experience, description, deadline, status, applicants) VALUES
('Data Analyst', 'BKPP Provinsi DKI Jakarta', 'Jakarta Pusat', 'Rp 8.000.000 - 12.000.000', 'S1 Statistik/Matematika', '2-3 tahun', 'Melakukan analisis data pegawai dan membuat laporan untuk mendukung pengambilan keputusan promosi.', '2024-02-15', 'hot', 24),
('HR Specialist', 'BKPP Kota Surabaya', 'Surabaya', 'Rp 7.000.000 - 10.000.000', 'S1 Psikologi/Manajemen', '1-2 tahun', 'Mengelola proses rekrutmen dan pengembangan SDM di lingkungan pemerintah daerah.', '2024-02-20', 'active', 18),
('System Administrator', 'BKPP Provinsi Jawa Barat', 'Bandung', 'Rp 9.000.000 - 13.000.000', 'S1 Teknik Informatika', '3-5 tahun', 'Mengelola infrastruktur IT dan sistem informasi kepegawaian.', '2024-02-10', 'closing', 31),
('Training Coordinator', 'BKPP Kota Yogyakarta', 'Yogyakarta', 'Rp 6.500.000 - 9.000.000', 'S1 Pendidikan/Manajemen', '1-3 tahun', 'Mengkoordinasikan program pelatihan dan pengembangan kompetensi pegawai.', '2024-02-25', 'active', 15);
```

## 5. Testing Authentication

### Test dengan JavaScript Console
```javascript
// Test Sign Up
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123',
  options: {
    data: {
      full_name: 'Test User'
    }
  }
})

// Test Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'password123'
})

// Test Get User
const { data: { user } } = await supabase.auth.getUser()

// Test Get Profile
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single()
```

## 6. Role Management

### Cara membuat user Admin:
1. Setelah user register, masuk ke Supabase Dashboard
2. Ke "Table Editor" → "profiles"
3. Cari user yang ingin dijadikan admin
4. Edit kolom `role` dari `pegawai` menjadi `admin`
5. Save changes

### Atau via SQL:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'user_uuid_here';
```

## 7. Production Setup

### Environment Variables untuk Production
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXT_PUBLIC_N8N_WEBHOOK=https://your-n8n-webhook-url
```

### Security Checklist
- [ ] RLS (Row Level Security) enabled pada semua tables
- [ ] Policies sudah dibuat untuk mengatur akses data
- [ ] Environment variables tidak di-commit ke git
- [ ] Email confirmation enabled
- [ ] Redirect URLs configured untuk production domain

## 8. Troubleshooting

### Common Issues:
1. **"Invalid JWT"** - Check environment variables
2. **"Row Level Security policy violation"** - Check RLS policies
3. **"User not found"** - Check if profile was created via trigger
4. **Cannot access admin features** - Check user role in profiles table

### Debug Commands:
```sql
-- Check if user exists in profiles
SELECT * FROM profiles WHERE id = 'user_uuid';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Check auth users
SELECT * FROM auth.users;
```

## 9. Backup & Maintenance

### Regular Backups
- Supabase automatically backs up your database
- For additional safety, export data regularly via Dashboard

### Monitoring
- Monitor usage in Supabase Dashboard
- Set up alerts for API limits
- Review auth logs regularly

---

**Note**: Pastikan untuk mengganti semua placeholder (your_project_id, user_uuid_here, dll.) dengan nilai yang sesuai untuk project Anda.