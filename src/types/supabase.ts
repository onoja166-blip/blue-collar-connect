export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          client_id: string
          commission_amount: number | null
          created_at: string | null
          description: string | null
          escrow_amount: number | null
          escrow_status: Database["public"]["Enums"]["escrow_status"] | null
          id: string
          job_date: string
          job_time: string
          status: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number | null
          updated_at: string | null
          worker_id: string
        }
        Insert: {
          client_id: string
          commission_amount?: number | null
          created_at?: string | null
          description?: string | null
          escrow_amount?: number | null
          escrow_status?: Database["public"]["Enums"]["escrow_status"] | null
          id?: string
          job_date: string
          job_time: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount?: number | null
          updated_at?: string | null
          worker_id: string
        }
        Update: {
          client_id?: string
          commission_amount?: number | null
          created_at?: string | null
          description?: string | null
          escrow_amount?: number | null
          escrow_status?: Database["public"]["Enums"]["escrow_status"] | null
          id?: string
          job_date?: string
          job_time?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount?: number | null
          updated_at?: string | null
          worker_id?: string
        }
      }
      categories: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
      }
      conversations: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          worker_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          worker_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          worker_id?: string
        }
      }
      disputes: {
        Row: {
          booking_id: string
          created_at: string | null
          description: string | null
          id: string
          reason: string
          reporter_id: string
          resolution_details: string | null
          status: Database["public"]["Enums"]["dispute_status"] | null
          updated_at: string | null
        }
        Insert: {
          booking_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          reason: string
          reporter_id: string
          resolution_details?: string | null
          status?: Database["public"]["Enums"]["dispute_status"] | null
          updated_at?: string | null
        }
        Update: {
          booking_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          reason?: string
          reporter_id?: string
          resolution_details?: string | null
          status?: Database["public"]["Enums"]["dispute_status"] | null
          updated_at?: string | null
        }
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          is_read: boolean | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id?: string
        }
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          id: string
          metadata: Json | null
          payment_type: string
          reference: string
          status: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          id?: string
          metadata?: Json | null
          payment_type: string
          reference: string
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          metadata?: Json | null
          payment_type?: string
          reference?: string
          status?: string
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          average_rating: number | null
          bio: string | null
          category_id: string | null
          city: string | null
          created_at: string | null
          full_name: string | null
          id: string
          id_type: string | null
          id_url: string | null
          is_boosted: boolean | null
          is_featured: boolean | null
          location: string | null
          phone_verified: boolean | null
          profile_image: string | null
          registration_paid: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          state: string | null
          subscription_tier: string | null
          updated_at: string | null
          verification_fee_paid: boolean | null
          verification_level: Database["public"]["Enums"]["verification_level"] | null
          video_url: string | null
          years_experience: number | null
        }
        Insert: {
          average_rating?: number | null
          bio?: string | null
          category_id?: string | null
          city?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          id_type?: string | null
          id_url?: string | null
          is_boosted?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          phone_verified?: boolean | null
          profile_image?: string | null
          registration_paid?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          state?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          verification_fee_paid?: boolean | null
          verification_level?: Database["public"]["Enums"]["verification_level"] | null
          video_url?: string | null
          years_experience?: number | null
        }
        Update: {
          average_rating?: number | null
          bio?: string | null
          category_id?: string | null
          city?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          id_type?: string | null
          id_url?: string | null
          is_boosted?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          phone_verified?: boolean | null
          profile_image?: string | null
          registration_paid?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          state?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          verification_fee_paid?: boolean | null
          verification_level?: Database["public"]["Enums"]["verification_level"] | null
          video_url?: string | null
          years_experience?: number | null
        }
      }
      reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          reason: string
          reported_user_id: string
          reporter_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          reason: string
          reported_user_id: string
          reporter_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          reason?: string
          reported_user_id?: string
          reporter_id?: string
        }
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          reviewee_id?: string
          reviewer_id?: string
        }
      }
      unlocked_contacts: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          worker_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          worker_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          worker_id?: string
        }
      }
      worker_contact_details: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          phone: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          phone: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      profile_display: {
        Row: {
          average_rating: number | null
          bio: string | null
          category_id: string | null
          city: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string | null
          is_boosted: boolean | null
          is_featured: boolean | null
          location: string | null
          phone: string | null
          profile_image: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          state: string | null
          subscription_tier: string | null
          verification_level: Database["public"]["Enums"]["verification_level"] | null
          years_experience: number | null
        }
      }
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "completed" | "cancelled" | "disputed"
      dispute_status: "open" | "under_review" | "resolved"
      escrow_status: "none" | "held" | "released" | "refunded"
      user_role: "applicant" | "client" | "admin"
      verification_level: "pending" | "basic_verified" | "background_checked" | "premium_verified" | "rejected"
    }
  }
}