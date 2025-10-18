import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types
export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  job_title?: string
  department?: string
  role: 'admin' | 'pegawai'
  created_at: string
  updated_at: string
}

export interface JobListing {
  id: string
  title: string
  institution: string
  institution_type: string
  location: string
  education: string
  experience: string
  salary: string
  deadline: string
  applicants: number
  status: 'hot' | 'active' | 'closing'
  description: string
  requirements: string[]
  logo_url?: string
  created_at: string
  updated_at: string
}

// Types for better TypeScript support
export interface JobListing {
  id: string
  title: string
  institution: string
  institution_type: string
  location: string
  education: string
  experience: string
  salary: string
  deadline: string
  applicants: number
  status: 'hot' | 'active' | 'closing'
  description: string
  requirements: string[]
  logo_url?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  job_title?: string
  department?: string
  created_at: string
}