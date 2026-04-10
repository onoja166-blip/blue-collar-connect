import { Database } from './supabase';

export type UserRole = 'client' | 'worker' | 'admin';
export type VerificationLevel = 'basic' | 'background_checked' | 'premium_verified';
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  profile_photo_url: string | null;
  bio: string | null;
  years_of_experience: number | null;
  skill_category: string | null;
  state: string | null;
  city: string | null;
  video_intro_url: string | null;
  verification_level: VerificationLevel;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  phone_number?: string;
}

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  image: string;
  description: string;
}

export const CATEGORIES: JobCategory[] = [
  { id: 'nannies', name: 'Nannies', icon: '👶', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/nanny-nigerian-professional-4d772e5f-1775821760626.webp', description: 'Caring and professional childcare providers' },
  { id: 'plumbers', name: 'Plumbers', icon: '🔧', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/plumber-nigerian-artisan-8c4c80a5-1775821761461.webp', description: 'Expert plumbing and leakage repairs' },
  { id: 'electricians', name: 'Electricians', icon: '⚡', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/electrician-nigerian-expert-a7d56dba-1775821764984.webp', description: 'Certified electrical installations and repairs' },
  { id: 'cleaners', name: 'Cleaners', icon: '🧹', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/cleaner-nigerian-professional-maintenance-b814f040-1775821765861.webp', description: 'Thorough cleaning for homes and offices' },
  { id: 'security', name: 'Security', icon: '🛡️', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/security-nigerian-professional-0120f70d-1775821760255.webp', description: 'Vigilant security for your peace of mind' },
  { id: 'carpenters', name: 'Carpenters', icon: '🪚', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/carpenter-391ae10f-1775822066287.webp', description: 'Expert woodwork and furniture repairs' },
  { id: 'construction', name: 'Construction', icon: '🏗️', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/construction-worker-bbe92c4b-1775822067730.webp', description: 'Reliable masonry and building services' },
  { id: 'drivers', name: 'Drivers', icon: '🚗', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/driver-ef0dfc9a-1775822067261.webp', description: 'Professional personal and commercial drivers' },
  { id: 'event_staff', name: 'Event Staff', icon: '🎤', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/event-staff-f6becd04-1775822066812.webp', description: 'Coordinated ushers and event personnel' },
  { id: 'artisans', name: 'Artisans', icon: '🎨', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/artisan-0b680b60-1775822067210.webp', description: 'Skilled traditional and modern craftsmanship' },
];