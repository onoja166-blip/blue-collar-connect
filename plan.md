# HireConnect Project Plan

## 1. Project Overview
Establish a secure, scalable, mobile-first service marketplace for the Nigerian market called "HireConnect". The platform will connect clients with verified blue-collar professionals.

## 2. Core Features
- **User Roles:** Client, Worker, Admin with Supabase RLS.
- **Worker Registration:** Comprehensive portal with OTP, ID upload, verification fee (₦2,000), multi-level verification (Basic, Background Checked, Premium), and badges.
- **Payment System:** Strict payment gates for clients, client subscription plans (₦2,000, ₦5,000, ₦15,000), worker listing plans (Free, ₦3,000, ₦7,000), escrow with 10-15% commission.
- **Booking & Escrow:** Full booking workflow and optional escrow service.
- **Rating & Review System:** Client-to-worker and worker-to-client ratings, public display, badges.
- **In-App Chat:** Secure messaging between clients and workers.
- **Admin Dashboard:** User/revenue management, verification approvals, dispute handling, pricing control.
- **Safety & Dispute Center:** Reporting, complaint forms, dispute resolution.
- **Smart Matching:** Based on location, rating, availability, history, response time.
- **Notifications:** In-app, SMS, WhatsApp alerts.
- **UI/UX:** Clean, modern, premium, mobile-first, fast-loading, Nigerian imagery, trust-focused.
- **PWA Enabled:** Installable on home screen.
- **Localization:** Naira currency (₦), Nigerian professional imagery, location filters (Lagos, Abuja, Port Harcourt, Ibadan, Kano, Enugu, "Near me"), low-data optimization.

## 3. Supabase Schema Design (for Supabase Engineer)

### 3.1. `users` Table
- `id` (UUID, PK)
- `email` (VARCHAR, UNIQUE, NULLABLE)
- `phone_number` (VARCHAR, UNIQUE, NOT NULL)
- `password_hash` (VARCHAR, NOT NULL)
- `role` (VARCHAR, NOT NULL) - 'client', 'worker', 'admin'
- `created_at` (TIMESTAMPZ)
- `updated_at` (TIMESTAMPZ)

### 3.2. `profiles` Table (for clients and workers)
- `id` (UUID, PK)
- `user_id` (UUID, FK to `users.id`, UNIQUE)
- `full_name` (VARCHAR)
- `profile_photo_url` (VARCHAR)
- `bio` (TEXT)
- `years_of_experience` (INTEGER)
- `skill_category` (VARCHAR)
- `state` (VARCHAR)
- `city` (VARCHAR)
- `video_intro_url` (VARCHAR, NULLABLE)
- `verification_level` (VARCHAR, DEFAULT 'basic') - 'basic', 'background_checked', 'premium_verified'
- `is_verified` (BOOLEAN, DEFAULT FALSE)
- `is_active` (BOOLEAN, DEFAULT TRUE)
- `created_at` (TIMESTAMPZ)
- `updated_at` (TIMESTAMPZ)

### 3.3. `worker_skills` Table (Many-to-many for skills)
- `worker_id` (UUID, FK to `profiles.id`)
- `skill` (VARCHAR)

### 3.4. `verification_documents` Table
- `id` (UUID, PK)
- `profile_id` (UUID, FK to `profiles.id`)
- `document_type` (VARCHAR) - 'NIN', 'Voter's Card', 'Driver's License'
- `document_url` (VARCHAR)
- `uploaded_at` (TIMESTAMPZ)
- `status` (VARCHAR, DEFAULT 'pending') - 'pending', 'approved', 'rejected'

### 3.5. `payments` Table
- `id` (UUID, PK)
- `user_id` (UUID, FK to `users.id`)
- `amount` (DECIMAL(10, 2))
- `currency` (VARCHAR, DEFAULT 'NGN')
- `payment_method` (VARCHAR)
- `transaction_id` (VARCHAR, UNIQUE)
- `status` (VARCHAR, DEFAULT 'pending') - 'pending', 'completed', 'failed', 'refunded'
- `payment_type` (VARCHAR) - 'verification_fee', 'client_subscription', 'worker_listing_fee', 'escrow_deposit', 'commission'
- `created_at` (TIMESTAMPZ)
- `completed_at` (TIMESTAMPZ)

### 3.6. `client_subscriptions` Table
- `id` (UUID, PK)
- `client_id` (UUID, FK to `users.id`)
- `plan` (VARCHAR) - 'view_5_contacts', 'unlimited_access_30_days', 'corporate_plan'
- `start_date` (TIMESTAMPZ)
- `end_date` (TIMESTAMPZ)
- `status` (VARCHAR, DEFAULT 'active') - 'active', 'expired', 'cancelled'
- `payment_id` (UUID, FK to `payments.id`)

### 3.7. `worker_listings` Table
- `id` (UUID, PK)
- `worker_id` (UUID, FK to `profiles.id`)
- `plan` (VARCHAR) - 'free_listing', 'featured_listing', 'boost_profile'
- `start_date` (TIMESTAMPZ)
- `end_date` (TIMESTAMPZ)
- `status` (VARCHAR, DEFAULT 'active')
- `payment_id` (UUID, FK to `payments.id`)

### 3.8. `bookings` Table
- `id` (UUID, PK)
- `client_id` (UUID, FK to `users.id`)
- `worker_id` (UUID, FK to `profiles.id`)
- `job_description` (TEXT)
- `booking_date` (DATE)
- `booking_time` (TIME)
- `status` (VARCHAR, DEFAULT 'pending') - 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'disputed'
- `job_fee` (DECIMAL(10, 2))
- `escrow_payment_id` (UUID, FK to `payments.id`, NULLABLE)
- `created_at` (TIMESTAMPZ)
- `completed_at` (TIMESTAMPZ)

### 3.9. `ratings` Table
- `id` (UUID, PK)
- `booking_id` (UUID, FK to `bookings.id`)
- `rater_id` (UUID, FK to `users.id`)
- `rated_user_id` (UUID, FK to `users.id`)
- `rating` (INTEGER, 1-5)
- `comment` (TEXT, NULLABLE)
- `created_at` (TIMESTAMPZ)

### 3.10. `messages` Table
- `id` (UUID, PK)
- `sender_id` (UUID, FK to `users.id`)
- `receiver_id` (UUID, FK to `users.id`)
- `booking_id` (UUID, FK to `bookings.id`, NULLABLE)
- `content` (TEXT)
- `read_at` (TIMESTAMPZ, NULLABLE)
- `created_at` (TIMESTAMPZ)

### 3.11. `admin_logs` Table
- `id` (UUID, PK)
- `admin_id` (UUID, FK to `users.id`)
- `action` (VARCHAR) - e.g., 'approve_worker', 'suspend_user', 'manage_dispute', 'edit_pricing'
- `details` (JSONB, NULLABLE)
- `timestamp` (TIMESTAMPZ)

### 3.12. `disputes` Table
- `id` (UUID, PK)
- `booking_id` (UUID, FK to `bookings.id`)
- `reported_by_id` (UUID, FK to `users.id`)
- `reason` (TEXT)
- `status` (VARCHAR, DEFAULT 'open') - 'open', 'in_progress', 'resolved', 'closed'
- `resolution` (TEXT, NULLABLE)
- `resolved_at` (TIMESTAMPZ, NULLABLE)
- `admin_id` (UUID, FK to `users.id`, NULLABLE)

## 4. Authentication & Authorization
- Implement Supabase Auth for user signup/login.
- Implement Row Level Security (RLS) on all tables to enforce role-based access.
- Workers: Verify phone, upload ID, pay verification fee before profile activation and access.
- Clients: Must have active subscription or confirmed booking to access worker contact details and profiles.
- Admin: Full access to admin dashboard and management functions.

## 5. Backend Logic & Edge Functions (for Supabase Engineer)
- **OTP Verification:** Edge function for sending and verifying OTP via Twilio or similar service.
- **Payment Integration:** Serverless functions for processing payments with Paystack or Monnify, handling webhooks, and updating payment/subscription/listing status.
- **Escrow Logic:** Functions to handle fund release upon job completion confirmation.
- **Notification Service:** Edge functions for sending in-app, SMS, and optionally WhatsApp notifications.
- **Smart Matching Algorithm:** Potentially an edge function or database query optimization.

## 6. Frontend Development (for Frontend Engineer)
- Implement UI/UX based on requirements (mobile-first, clean, modern, premium, trust-focused).
- Develop reusable components for Header, Footer, Hero, Pricing, PaymentForm, WorkerProfile, BookingForm, Chat, AdminDashboard, etc.
- Integrate Supabase client for data fetching and mutations.
- Implement PWA manifest and service worker.
- Optimize for low-data networks.
- Use Nigerian professional imagery.
- Implement location filters.
- Ensure clear Call-to-Actions (CTAs).
- **Generate Images Bulk:** Use this tool early for all required imagery.

## 7. Phased Implementation Approach
1.  **Phase 1 (Backend Foundation):** Supabase schema, Authentication, RLS, Worker Registration flow, basic payment integration. (Supabase Engineer)
2.  **Phase 2 (Core Marketplace Features):** Booking, Escrow, Ratings, Chat, Payment gates, Client/Worker plans. (Supabase Engineer & Frontend Engineer)
3.  **Phase 3 (Admin & Advanced Features):** Admin dashboard, Safety/Dispute, Smart Matching, Notifications. (Supabase Engineer & Frontend Engineer)
4.  **Phase 4 (Optimization & Deployment):** PWA, Performance optimization, Localization, final testing. (Frontend Engineer)

## 8. Technologies
- Frontend: React 19.1.1, Vite, Tailwind CSS
- Backend: Supabase (PostgreSQL, Auth, Edge Functions)
- Payment Gateway: Paystack/Monnify
- SMS/WhatsApp: Twilio or similar

## 9. Deliverables
- Fully functional "HireConnect" marketplace.
- Production-ready codebase.
- Deployment to a staging/production environment.